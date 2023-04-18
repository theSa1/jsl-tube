import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const statisticsRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const totalVideos = await prisma.video.count();
    const totalChannels = await prisma.channel.count();

    const channelStats = await prisma.channel.aggregate({
      _sum: {
        subscribers: true,
        views: true,
      },
    });

    const videosStats = await prisma.video.aggregate({
      _sum: {
        duration: true,
        comments: true,
        likes: true,
      },
    });

    return {
      totalVideos,
      totalChannels,
      totalSubscribers: channelStats._sum.subscribers,
      totalViews: channelStats._sum.views,
      totalDuration: videosStats._sum.duration,
      totalComments: videosStats._sum.comments,
      totalLikes: videosStats._sum.likes,
    };
  }),
});
