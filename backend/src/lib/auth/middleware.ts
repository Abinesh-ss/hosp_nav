import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/db";
import { isHospitalSubscriptionValid } from "@/services/subscription.service";

interface JwtPayload {
  userId: string;
  hospitalId?: string;
}

/**
 * Auth + Hospital subscription middleware
 * @param req NextRequest
 * @returns userId if valid
 * @throws NextResponse if unauthorized or subscription invalid
 */
export async function authMiddleware(req: NextRequest): Promise<string> {
  try {
    // 1️⃣ Extract JWT from cookies
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      throw NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }

    // 2️⃣ Verify token
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // 3️⃣ If hospitalId exists, validate subscription
    if (decoded.hospitalId) {
      const hospital = await prisma.hospital.findUnique({
        where: { id: decoded.hospitalId },
        select: {
          subscriptionStatus: true,
          trialEndsAt: true,
        },
      });

      if (!hospital || !isHospitalSubscriptionValid(hospital)) {
        throw NextResponse.json(
          { error: "Forbidden: Hospital subscription invalid or expired" },
          { status: 403 }
        );
      }
    }

    // 4️⃣ Return userId for valid requests
    return decoded.userId;
  } catch (err: any) {
    console.error("AuthMiddleware failed:", err);
    throw NextResponse.json(
      { error: "Unauthorized or invalid subscription" },
      { status: 401 }
    );
  }
}
