import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { calculateAStarPath } from "@/services/a-star.service";
import { checkCredits, incrementUsage } from "@/services/credit.service";
import { isHospitalSubscriptionValid } from "@/services/subscription.service";
import { authMiddleware } from "@/lib/auth/middleware";

export async function POST(req: NextRequest) {
  try {
    const userId = await authMiddleware(req);
    const { floorId, startNodeId, endNodeId } = await req.json();

    const floor = await prisma.floor.findUnique({
      where: { id: floorId },
      include: { hospital: true },
    });

    if (!floor) return new NextResponse("Floor not found", { status: 404 });
    if (!isHospitalSubscriptionValid(floor.hospital))
      return new NextResponse("Subscription expired", { status: 402 });

    if (!(await checkCredits(userId)))
      return new NextResponse("Credits exhausted", { status: 402 });

    const result = calculateAStarPath(
      floor.graphData as any,
      startNodeId,
      endNodeId
    );

    await incrementUsage(userId);

    await prisma.navigationLog.create({
      data: {
        userId,
        hospitalId: floor.hospitalId,
        startNode: startNodeId,
        endNode: endNodeId,
        destination: endNodeId,
        pathTaken: result.path,
      },
    });

    return NextResponse.json(result);
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
