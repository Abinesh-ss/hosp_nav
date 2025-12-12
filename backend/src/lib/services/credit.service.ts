import prisma from '@/lib/db';

export async function getUsage(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      creditsRemaining: true,
      planStatus: true
    }
  });

  if (!user) throw new Error('User not found');

  return {
    credits: user.creditsRemaining,
    plan: user.planStatus
  };
}

export async function incrementUsage(userId: string, amount: number = -1) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      creditsRemaining: {
        increment: amount
      }
    }
  });
}

export async function checkCredits(userId: string): Promise<boolean> {
  const usage = await getUsage(userId);
  return usage.credits > 0 || usage.plan !== 'FREE';
}
