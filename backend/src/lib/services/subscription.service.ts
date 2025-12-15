import { prisma } from "../db/client";

export async function assignHospitalSubscription(
  hospitalId: string,
  country: string,
  state?: string
) {
  let region: "TAMIL_NADU" | "INDIA_OTHER" | "INTERNATIONAL" = "INTERNATIONAL";

  if (country === "India") {
    region = state === "Tamil Nadu" ? "TAMIL_NADU" : "INDIA_OTHER";
  }

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

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + 21);

  return prisma.hospital.update({
    where: { id: hospitalId },
    data: {
      country,
      state,
      region,
      subscriptionStatus: "TRIAL",
      trialEndsAt,
    },
  });
}

export function isHospitalSubscriptionValid(hospital: {
  subscriptionStatus: string;
  trialEndsAt?: Date | null;
}) {
  if (hospital.subscriptionStatus === "FREE") return true;
  if (hospital.subscriptionStatus === "ACTIVE") return true;
  if (hospital.subscriptionStatus === "TRIAL") {
    return !!hospital.trialEndsAt && hospital.trialEndsAt > new Date();
  }
  return false;
}
