import { type NextPage } from "next";
import { api } from "~/utils/api";
import moment from "moment";
import Link from "next/link";
import { VideoCard } from "~/components/VideoCard";
import Image from "next/image";

const Home: NextPage = () => {
  const videos = api.videos.getAll.useQuery();
  const channels = api.channels.getAll.useQuery();

  const abbreviateNumber = (number: number) => {
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;
    if (tier == 0) return number.toString();
    const suffix = SI_SYMBOL[tier] || "";
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    return scaled.toFixed(1).toString() + suffix;
  };

  const convertSecondsToTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <div className="container mx-auto px-5 py-10">
        <h1 className="mb-10 text-center text-2xl font-bold text-white">
          JSL Tube
        </h1>

        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-xl font-bold text-white">Latest Videos</h1>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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

          <h1 className="mb-2 mt-8 text-xl font-bold text-white">
            All Channels
          </h1>

          <div className="grid gap-3 lg:grid-cols-2">
            {channels.data?.map((channel) => (
              <div
                key={channel.channelID}
                className="overflow-hidden rounded-lg bg-[#252525] p-5"
              >
                <Link
                  href={`https://www.youtube.com/channel/${channel.channelID}`}
                >
                  <div className="grid grid-cols-[2.25rem,auto] gap-3">
                    <Image
                      height={36}
                      width={36}
                      className="aspect-square w-full rounded-full"
                      src={channel.profile}
                      alt={channel.name}
                    />
                    <div>
                      <h2 className="font-bold leading-tight text-white line-clamp-1">
                        {channel.name}
                      </h2>
                      <p className="text-xs leading-tight text-[#aaaaaa]">
                        {abbreviateNumber(channel.subscribers)} subscribers •{" "}
                        {abbreviateNumber(channel.views)} collective views
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mt-3 grid grid-cols-3">
                  <div>
                    <h2 className="leading-tight text-[#aaaaaa]">
                      Total Videos
                    </h2>
                    <p className="font-bold leading-tight text-white">
                      {channel._count?.videos.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h2 className="leading-tight text-[#aaaaaa]">
                      Total Views
                    </h2>
                    <p className="font-bold leading-tight text-white">
                      {channel.views.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h2 className="leading-tight text-[#aaaaaa]">
                      Average Views
                    </h2>
                    <p className="font-bold leading-tight text-white">
                      {Math.round(
                        channel.views / channel._count.videos
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
