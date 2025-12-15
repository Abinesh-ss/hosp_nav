import { Router } from "express";
import { prisma } from "../db/client";

const router = Router();

router.get("/status", async (req, res) => {
  const hospitalId = req.user?.hospitalId;

  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    select: {
      region: true,
      subscriptionStatus: true,
      trialEndsAt: true,
      paymentProvider: true,
    },
  });

  res.json(hospital);
});

export default router;
