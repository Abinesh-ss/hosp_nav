import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { assignHospitalSubscription } from "@/services/subscription.service";
import { z } from "zod";

// 1️⃣ Define request schema
const hospitalSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),
  state: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // 2️⃣ Validate request body
    const parsed = hospitalSchema.safeParse(json);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message);
      return NextResponse.json(
        { error: errors.join(", ") },
        { status: 400 }
      );
    }

    const { name, address, country, state } = parsed.data;

    // 3️⃣ Get userId from auth/session (replace with your auth logic)
    const userId = "some-user-id"; 
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 4️⃣ Create hospital with placeholder subscription
    const hospital = await prisma.hospital.create({
      data: {
        name,
        address,
        country,
        state,
        createdByUser: userId,
        region: "INTERNATIONAL",
        subscriptionStatus: "TRIAL",
      },
    });

    // 5️⃣ Assign subscription (validated inside service)
    try {
      await assignHospitalSubscription(hospital.id, country, state);
    } catch (err: any) {
      // Rollback hospital creation if subscription assignment fails
      await prisma.hospital.delete({ where: { id: hospital.id } });
      return NextResponse.json(
        { error: "Subscription assignment failed: " + err.message },
        { status: 400 }
      );
    }

    // 6️⃣ Return hospital
    return NextResponse.json(hospital, { status: 201 });
  } catch (error: any) {
    console.error("Error registering hospital:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
