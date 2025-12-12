import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        await prisma.user.update({
          where: { id: session.metadata?.userId },
          data: {
            stripeCustomerId: session.customer as string,
            planStatus: 'BASIC',
            creditsRemaining: 100
          }
        });

        if (session.subscription) {
          await prisma.subscription.create({
            data: {
              userId: session.metadata?.userId!,
              stripeSubscriptionId: session.subscription as string,
              stripePriceId: session.metadata?.priceId!,
              status: 'active',
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          });
        }
        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
          }
        });

        if (subscription.status === 'canceled') {
          await prisma.user.update({
            where: { stripeCustomerId: subscription.customer as string },
            data: { planStatus: 'FREE' }
          });
        }
        break;
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}
