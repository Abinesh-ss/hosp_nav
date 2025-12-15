import prisma from "@/lib/db";
import { z } from "zod";

// 1️⃣ Define country/state validation schema
const regionSchema = z.object({
  country: z.string().min(2, "Country is required"),
  state: z.string().optional(),
});

// 2️⃣ Define region type
export type Region = "TAMIL_NADU" | "INDIA_OTHER" | "INTERNATIONAL";

/**
 * Assign subscription to a hospital
 */
export async function assignHospitalSubscription(
  hospitalId: string,
  country: string,
  state?: string
) {
  // Validate inputs
  const parsed = regionSchema.safeParse({ country, state });
  if (!parsed.success) {
    const errors = parsed.error.errors.map((e) => e.message).join(", ");
    throw new Error(`Invalid country/state: ${errors}`);
  }

  const validCountry = parsed.data.country;
  const validState = parsed.data.state;

  // Determine region
  let region: Region = "INTERNATIONAL";
  if (validCountry.toLowerCase() === "india") {
    region =
      validState?.toLowerCase() === "tamil nadu" ? "TAMIL_NADU" : "INDIA_OTHER";
  }

  // TN hospitals → FREE
  if (region === "TAMIL_NADU") {
    return prisma.hospital.update({
      where: { id: hospitalId },
      data: {
        country: validCountry,
        state: validState,
        region,
        subscriptionStatus: "FREE",
        trialEndsAt: null,
        paymentProvider: null,
      },
    });
  }

  // Other hospitals → 30-day TRIAL
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 30);

  return prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      country: validCountry,
      state: validState,
      region,
      subscriptionStatus: "TRIAL",
      trialEndsAt,
      paymentProvider: "RAZORPAY",
    },
  });
}

/**
 * Check if hospital subscription is valid
 */
export function isHospitalSubscriptionValid(hospital: {
  subscriptionStatus: string;
  trialEndsAt?: Date | null;
}): boolean {
  if (hospital.subscriptionStatus === "FREE") return true;
  if (hospital.subscriptionStatus === "ACTIVE") return true;
  if (hospital.subscriptionStatus === "TRIAL") {
    return !!hospital.trialEndsAt && hospital.trialEndsAt > new Date();
  }
  return false;
}
