import { createTRPCRouter } from "~/server/api/trpc";
import { videosRouter } from "~/server/api/routers/videos";
import { channelsRouter } from "./routers/channels";
import { statisticsRouter } from "./routers/statistics";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  videos: videosRouter,
  channels: channelsRouter,
  statistics: statisticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
