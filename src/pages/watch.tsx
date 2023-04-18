import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { abbreviateNumber } from "~/utils/abbreviateNumber";
import { api } from "~/utils/api";
import { NextSeo } from "next-seo";

const SkeletonPage = () => {
  return (
    <>
      <div className="aspect-video w-full animate-pulse rounded-lg bg-[#252525] shadow-lg"></div>
      <div className="mt-5 h-8 w-1/2 animate-pulse rounded-lg bg-[#252525]"></div>
      <div className="mt-3 flex gap-3">
        <div className="h-4 w-12 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-16 animate-pulse rounded-lg bg-[#252525]"></div>
      </div>
      <div className="mt-5 h-20 animate-pulse rounded-lg bg-[#252525]"></div>
      <div className="mt-3 flex gap-3">
        <div className="h-4 w-20 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-24 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-20 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-12 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-20 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-24 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-10 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-28 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-20 animate-pulse rounded-lg bg-[#252525]"></div>
        <div className="h-4 w-24 animate-pulse rounded-lg bg-[#252525]"></div>
      </div>
    </>
  );
};

const WatchPage = () => {
  const router = useRouter();
  const { v: videoId } = router.query;

  if (typeof videoId !== "string") return null;

  const video = api.videos.watch.useQuery(videoId);

  if (!video.data) {
    return <SkeletonPage />;
  }

  return (
    <>
      <NextSeo title={`${video.data.title} | JSL Tube`} />
      <div className="overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${video.data.videoID}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <h1 className="mt-5 text-xl font-bold text-white">{video.data.title}</h1>

      <div className="mt-3 flex gap-3">
        <div className="rounded-full bg-[#252525] px-3 py-1 font-bold text-white">
          {abbreviateNumber(video.data.likes)} Likes
        </div>
        <div className="rounded-full bg-[#252525] px-3 py-1 font-bold text-white">
          {abbreviateNumber(video.data.comments)} Comments
        </div>
      </div>

      <Link
        href={`https://www.youtube.com/channel/${video.data.channel.channelID}`}
        className="mt-3 block"
      >
        <div className="flex items-center gap-3">
          <Image
            height={32}
            width={32}
            className="h-8 w-8 rounded-full"
            src={video.data.channel.profile}
            alt={video.data.channel.name}
          />
          <div>
            <h2 className="font-bold text-white">{video.data.channel.name}</h2>
            <p className="text-sm text-gray-400">
              {abbreviateNumber(video.data.channel.subscribers)} subscribers
            </p>
          </div>
        </div>
      </Link>

      {/* Description */}
      <div className="mt-5 rounded-lg bg-[#252525] p-5 shadow-lg">
        <h2 className="text-xl font-bold text-white">Description</h2>
        <p className="mt-3 overflow-hidden whitespace-pre-wrap text-white">
          {video.data.description}
        </p>
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">Tags</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {(JSON.parse(video.data.tags || "[]") as string[]).map((tag) => (
          <Link
            key={tag}
            href={`https://www.youtube.com/results?search_query=${tag}`}
            className="rounded-lg bg-[#252525] px-3 py-1 text-white"
          >
            {tag}
          </Link>
        ))}
      </div>
    </>
  );
};

export default WatchPage;
