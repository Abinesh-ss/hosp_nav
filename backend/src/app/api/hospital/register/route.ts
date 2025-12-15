import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { assignHospitalSubscription } from "@/services/subscription.service";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";

const hospitalSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  country: z.string().min(2),
  state: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const userId = await authMiddleware(req);

    const parsed = hospitalSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const hospital = await prisma.hospital.create({
      data: {
        ...parsed.data,
        createdByUser: userId,
        region: "INTERNATIONAL",
        subscriptionStatus: "TRIAL",
      },
    });

    await assignHospitalSubscription(
      hospital.id,
      parsed.data.country,
      parsed.data.state
    );

    return NextResponse.json(hospital, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
