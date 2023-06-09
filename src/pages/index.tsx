import { type NextPage } from "next";
import { api } from "~/utils/api";
import moment from "moment";
import { VideoCard, VideoCardSkeleton } from "~/components/VideoCard";
import { abbreviateNumber } from "~/utils/abbreviateNumber";
import { ChannelCard, ChannelCardSkeleton } from "~/components/ChannelCard";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { convertSecondsToTime } from "~/utils/convertSecondsToTime";

const Home: NextPage = () => {
  const videos = api.videos.getAll.useQuery();
  const channels = api.channels.getAll.useQuery();
  const statistics = api.statistics.get.useQuery();

  return (
    <>
      <NextSeo
        title="JSL Tube | Watch all videos of Jack on one platform."
        description="Watch all videos of Jack on one platform."
      />

      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-xl font-bold text-text-primary">
          Latest Videos
        </h1>
        <Link href="/videos" className="text-text-primary underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {videos.isLoading && (
          <>
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
            <VideoCardSkeleton />
          </>
        )}
        {videos.data?.map((video) => (
          <VideoCard
            key={video.id}
            channel={video.channel.name}
            channelId={video.channel.channelID}
            channelImage={video.channel.profile}
            thumbnail={video.thumbnail}
            timestamp={moment(video.published).fromNow()}
            title={video.title}
            duration={convertSecondsToTime(video.duration)}
            views={abbreviateNumber(video.views)}
            videoId={video.videoID}
          />
        ))}
      </div>

      <h1 className="mb-2 mt-8 text-xl font-bold text-text-primary">
        All Channels
      </h1>

      <div className="grid gap-5 lg:grid-cols-2">
        {channels.isLoading && (
          <>
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
          </>
        )}
        {channels.data?.map((channel) => (
          <ChannelCard
            key={channel.channelID}
            channelId={channel.channelID}
            name={channel.name}
            profile={channel.profile}
            subscribers={channel.subscribers}
            videos={channel._count.videos}
            views={channel.views}
            since={channel.since}
          />
        ))}
      </div>

      <h1 className="mb-2 mt-8 text-xl font-bold text-text-primary">
        Statistics
      </h1>
      <div className="grid gap-5 lg:grid-cols-2">
        {statistics.isLoading ? (
          <>
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
            <ChannelCardSkeleton />
          </>
        ) : (
          <>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {statistics.data?.totalChannels}
              </h2>
              <p className="text-text-primary">Channels</p>
            </div>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {statistics.data?.totalVideos.toLocaleString()}
              </h2>
              <p className="text-text-primary">Videos</p>
            </div>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {statistics.data?.totalViews?.toLocaleString()}
              </h2>
              <p className="text-text-primary">Views</p>
            </div>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {statistics.data?.totalSubscribers?.toLocaleString()}
              </h2>
              <p className="text-text-primary">Subscribers</p>
            </div>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {statistics.data?.totalLikes?.toLocaleString()}
              </h2>
              <p className="text-text-primary">Likes</p>
            </div>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {statistics.data?.totalComments?.toLocaleString()}
              </h2>
              <p className="text-text-primary">Comments</p>
            </div>
            <div className="rounded-lg bg-bg-card p-5">
              <h2 className="text-2xl font-bold text-text-primary">
                {Math.round((statistics.data?.totalDuration || 0) / 60 / 60)}{" "}
                Hours
              </h2>
              <p className="text-text-primary">Total Video Duration</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
