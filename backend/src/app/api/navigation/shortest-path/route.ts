import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/middleware";
import { calculateAStarPath } from "@/lib/services/a-star.service";
import { checkCredits, incrementUsage } from "@/lib/services/credit.service";
import { isHospitalSubscriptionValid } from "@/services/subscription.service";
import prisma from "@/lib/db";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const userId = await auth(req);

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { floorId, startNodeId, endNodeId } = await req.json();

    const floor = await prisma.floor.findUnique({
      where: { id: floorId },
      select: {
        graphData: true,
        hospitalId: true,
        hospital: {
          select: {
            subscriptionStatus: true,
            trialEndsAt: true,
          },
        },
      },
    });

    if (!floor) {
      return new NextResponse("Floor not found", { status: 404 });
    }

    if (!isHospitalSubscriptionValid(floor.hospital)) {
      return new NextResponse("Subscription expired. Please upgrade.", {
        status: 402,
      });
    }

    const hasCredits = await checkCredits(userId);
    if (!hasCredits) {
      return new NextResponse("Credit limit reached. Please upgrade.", {
        status: 402,
      });
    }

    const graph = floor.graphData as any;
    const pathResult = calculateAStarPath(graph, startNodeId, endNodeId);

    await incrementUsage(userId);

    await prisma.navigationLog.create({
      data: {
        userId,
        hospitalId: floor.hospitalId,
        startNode: startNodeId,
        endNode: endNodeId,
        destination: endNodeId,
        pathTaken: pathResult.path,
      },
    });

    return NextResponse.json(pathResult);
  } catch (error) {
    console.error("Path calculation error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
