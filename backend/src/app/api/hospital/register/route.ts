import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { assignHospitalSubscription } from "@/services/subscription.service";

// POST /api/hospital/register
export async function POST(req: NextRequest) {
  try {
    const { name, address, country, state } = await req.json();

    // TODO: Replace this with your real auth/session logic
    const userId = "some-user-id"; 
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1️⃣ Create hospital with temporary placeholders
    const hospital = await prisma.hospital.create({
      data: {
        name,
        address,
        country,
        state,
        createdByUser: userId,
        region: "INTERNATIONAL",      // placeholder
        subscriptionStatus: "TRIAL",  // placeholder
      },
    });

    // 2️⃣ Run subscription hook
    await assignHospitalSubscription(hospital.id, country, state);

    // 3️⃣ Return hospital
    return NextResponse.json(hospital, { status: 201 });
  } catch (error: any) {
    console.error("Error registering hospital:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
