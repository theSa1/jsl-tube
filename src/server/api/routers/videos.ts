import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const videosRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.prisma.video.findMany({
      take: 9,
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
  getPaginated: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const videos = await ctx.prisma.video.findMany({
        take: 30,
        skip: (input.page - 1) * 30,
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

      const videoCount = await ctx.prisma.video.count();

      return {
        videos,
        page: input.page,
        isNextPage: !!videos.length && videoCount > input.page * 30,
        isPrevPage: !!videos.length && input.page > 1,
      };
    }),
  watch: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const video = await ctx.prisma.video.findUnique({
      where: {
        videoID: input,
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        duration: true,
        views: true,
        videoID: true,
        published: true,
        likes: true,
        description: true,
        comments: true,
        createdAt: true,
        tags: true,
        channel: {
          select: {
            subscribers: true,
            profile: true,
            name: true,
            handle: true,
            channelID: true,
          },
        },
      },
    });

    return video;
  }),
});
