import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const userId = await auth(req);
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const hospital = await prisma.hospital.findFirst({
    where: { createdByUser: userId },
    select: {
      region: true,
      subscriptionStatus: true,
      trialEndsAt: true,
      paymentProvider: true,
    },
  });

  return NextResponse.json(hospital);
}
