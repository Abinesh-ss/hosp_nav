import prisma from "@/lib/db";

export type Region = "TAMIL_NADU" | "INDIA_OTHER" | "INTERNATIONAL";

export async function assignHospitalSubscription(
  hospitalId: string,
  country: string,
  state?: string
) {
  // 1️⃣ Determine region
  let region: Region = "INTERNATIONAL";
  if (country.toLowerCase() === "india") {
    region = state?.toLowerCase() === "tamil nadu" ? "TAMIL_NADU" : "INDIA_OTHER";
  }

  // 2️⃣ Tamil Nadu hospitals → FREE
  if (region === "TAMIL_NADU") {
    return prisma.hospital.update({
      where: { id: hospitalId },
      data: {
        country,
        state,
        region,
        subscriptionStatus: "FREE",
        trialEndsAt: null,
        paymentProvider: null,
      },
    });
  }

  // 3️⃣ Other hospitals → TRIAL for 30 days
  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 30); // 30-day trial

  return prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      country,
      state,
      region,
      subscriptionStatus: "TRIAL",
      trialEndsAt,
      paymentProvider: "RAZORPAY", // default payment provider
    },
  });
}

// 4️⃣ Helper to check if subscription is valid
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
