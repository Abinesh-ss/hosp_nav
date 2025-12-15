import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/db";
import { isHospitalSubscriptionValid } from "@/services/subscription.service";

interface JwtPayload {
  userId: string;
  hospitalId?: string;
}

export async function authMiddleware(req: NextRequest): Promise<string> {
  const token = req.cookies.get("auth-token")?.value;
  if (!token) {
    throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let decoded: JwtPayload;
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch {
    throw NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (decoded.hospitalId) {
    const hospital = await prisma.hospital.findUnique({
      where: { id: decoded.hospitalId },
      select: { subscriptionStatus: true, trialEndsAt: true },
    });

    if (!hospital || !isHospitalSubscriptionValid(hospital)) {
      throw NextResponse.json(
        { error: "Subscription expired" },
        { status: 403 }
      );
    }
  }

  return decoded.userId;
}

export function protectRoute(
  handler: (req: NextRequest, userId: string) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const userId = await authMiddleware(req);
      return await handler(req, userId);
    } catch (err: any) {
      return err;
    }
  };
}
