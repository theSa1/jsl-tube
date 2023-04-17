import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const channelsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const channels = await ctx.prisma.channel.findMany({
      take: 30,
      orderBy: {
        subscribers: "desc",
      },
      select: {
        _count: {
          select: {
            videos: true,
          },
        },
        channelID: true,
        name: true,
        subscribers: true,
        views: true,
        since: true,
        handle: true,
        profile: true,
      },
    });

    return channels;
  }),
});
