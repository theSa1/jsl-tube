import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const videosRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.prisma.video.findMany({
      take: 30,
      orderBy: {
        published: "desc",
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        duration: true,
        views: true,
        videoID: true,
        published: true,
        channel: {
          select: {
            profile: true,
            name: true,
            handle: true,
            channelID: true,
          },
        },
      },
    });

    return videos;
  }),
});
