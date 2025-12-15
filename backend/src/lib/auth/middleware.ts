import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/db";
import { isHospitalSubscriptionValid } from "@/services/subscription.service";

interface JwtPayload {
  userId: string;
  hospitalId?: string;
}

/**
 * Auth + Hospital subscription check
 * Returns userId if valid, otherwise throws NextResponse error
 */
export async function authMiddleware(req: NextRequest): Promise<string> {
  try {
    const token = req.cookies.get("auth-token")?.value;
    if (!token) {
      throw NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (decoded.hospitalId) {
      const hospital = await prisma.hospital.findUnique({
        where: { id: decoded.hospitalId },
        select: { subscriptionStatus: true, trialEndsAt: true },
      });

      if (!hospital || !isHospitalSubscriptionValid(hospital)) {
        throw NextResponse.json(
          { error: "Forbidden: Hospital subscription invalid or expired" },
          { status: 403 }
        );
      }
    }

    return decoded.userId;
  } catch (err: any) {
    console.error("AuthMiddleware failed:", err);
    throw NextResponse.json(
      { error: "Unauthorized or invalid subscription" },
      { status: 401 }
    );
  }
}

/**
 * Wrapper helper to protect API routes
 * Usage:
 *   export const GET = protectRoute(async (req, userId) => { ... });
 */
export function protectRoute(handler: (req: NextRequest, userId: string) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const userId = await authMiddleware(req);
      return await handler(req, userId);
    } catch (err: any) {
      return err; // authMiddleware throws NextResponse
    }
  };
}
