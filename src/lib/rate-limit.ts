import { prisma } from "@/lib/db/prisma";

export async function checkRateLimit(userId: string): Promise<{ allowed: boolean; waitTimeMinutes?: number }> {
  // Free plan logic: 5 reviews per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  const reviewsInLastHour = await prisma.review.findMany({
    where: {
      userId,
      createdAt: {
        gte: oneHourAgo,
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // TEMPORARILY set to 1 for testing (normally 5)
  if (reviewsInLastHour.length >= 1) {
    // The user has hit the limit. Wait time is based on the oldest review in the current window.
    const oldestReview = reviewsInLastHour[0];
    const nextAvailableTime = new Date(oldestReview.createdAt.getTime() + 60 * 60 * 1000);
    const waitTimeMs = nextAvailableTime.getTime() - Date.now();
    const waitTimeMinutes = Math.max(1, Math.ceil(waitTimeMs / (60 * 1000)));
    
    return { allowed: false, waitTimeMinutes };
  }

  return { allowed: true };
}
