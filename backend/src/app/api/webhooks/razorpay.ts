import crypto from "crypto";
import { prisma } from "../../db/client";

export async function POST(req, res) {
  const signature = req.headers["x-razorpay-signature"];
  const body = JSON.stringify(req.body);

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (signature !== expected) {
    return res.status(400).send("Invalid signature");
  }

  if (req.body.event === "payment.captured") {
    const hospitalId = req.body.payload.payment.entity.notes.hospitalId;

    await prisma.hospital.update({
      where: { id: hospitalId },
      data: {
        subscriptionStatus: "ACTIVE",
        paymentProvider: "RAZORPAY",
        trialEndsAt: null,
      },
    });
  }

  res.json({ success: true });
}
