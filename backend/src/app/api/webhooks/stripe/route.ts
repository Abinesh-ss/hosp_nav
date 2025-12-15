import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata?.userId) {
          await prisma.user.update({
            where: { id: session.metadata.userId },
            data: {
              stripeCustomerId: session.customer as string,
              planStatus: "BASIC",
              creditsRemaining: 100,
            },
          });
        }

        if (session.metadata?.hospitalId) {
          await prisma.hospital.update({
            where: { id: session.metadata.hospitalId },
            data: {
              subscriptionStatus: "ACTIVE",
              paymentProvider: "STRIPE",
              trialEndsAt: null,
            },
          });
        }

        if (session.subscription && session.metadata?.userId) {
          await prisma.subscription.upsert({
            where: { userId: session.metadata.userId },
            update: {
              stripeSubscriptionId: session.subscription as string,
              stripePriceId: session.metadata?.priceId,
              status: "active",
              currentPeriodEnd: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ),
            },
            create: {
              userId: session.metadata.userId,
              stripeSubscriptionId: session.subscription as string,
              stripePriceId: session.metadata?.priceId,
              status: "active",
              currentPeriodEnd: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ),
            },
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          },
        });

        if (subscription.status === "canceled") {
          await prisma.user.update({
            where: { stripeCustomerId: subscription.customer as string },
            data: { planStatus: "FREE" },
          });

          await prisma.hospital.updateMany({
            where: {
              paymentProvider: "STRIPE",
            },
            data: {
              subscriptionStatus: "EXPIRED",
            },
          });
        }
        break;
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
