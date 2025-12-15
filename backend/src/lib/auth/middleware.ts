import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { isHospitalSubscriptionValid } from "@/services/subscription.service";

export async function auth(req: NextRequest): Promise<string | null> {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) return null;

    const decoded = verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      hospitalId?: string;
    };

    if (decoded.hospitalId) {
      const hospital = await prisma.hospital.findUnique({
        where: { id: decoded.hospitalId },
        select: {
          subscriptionStatus: true,
          trialEndsAt: true,
        },
      });

      if (!hospital || !isHospitalSubscriptionValid(hospital)) {
        return null;
      }
    }

    return decoded.userId;
  } catch {
    return null;
  }
}
