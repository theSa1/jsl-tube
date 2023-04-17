import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { VideoCard } from "~/components/VideoCard";
import { abbreviateNumber } from "~/utils/abbreviateNumber";
import { api } from "~/utils/api";
import { convertSecondsToTime } from "~/utils/convertSecondsToTime";

const VideosPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const videos = api.videos.getPaginated.useQuery({
    page: page ? parseInt(page as string) : 1,
  });

  return (
    <>
      <h1 className="mb-2 text-xl font-bold text-white">All Videos</h1>

      <div className="grid grid-cols-3 gap-5">
        {videos.data?.videos.map((video) => (
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

      {/* create pagination */}
      <div className="mt-5 flex justify-center gap-5">
        {videos.data?.isPrevPage && (
          <Link
            href={`/videos?page=${videos.data.page - 1}`}
            className="rounded-md bg-[#252525] px-3 py-1 text-white"
          >
            Previous Page
          </Link>
        )}
        {videos.data?.isNextPage && (
          <Link
            href={`/videos?page=${videos.data.page + 1}`}
            className="rounded-md bg-[#252525] px-3 py-1 text-white"
          >
            Next Page
          </Link>
        )}
      </div>
    </>
  );
};

export default VideosPage;
