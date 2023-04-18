import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { abbreviateNumber } from "~/utils/abbreviateNumber";

export const ChannelCard: React.FC<{
  channelId: string;
  name: string;
  profile: string;
  subscribers: number;
  views: number;
  videos: number;
  since: Date;
}> = ({ channelId, name, profile, subscribers, videos, views, since }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-[#252525] p-5">
      <Link href={`https://www.youtube.com/channel/${channelId}`}>
        <div className="grid grid-cols-[2.25rem,auto] gap-3">
          <Image
            height={36}
            width={36}
            className="aspect-square w-full rounded-full"
            src={profile}
            alt={name}
          />
          <div>
            <h2 className="font-bold leading-tight text-white line-clamp-1">
              {name}
            </h2>
            <p className="text-xs leading-tight text-[#aaaaaa]">
              {abbreviateNumber(subscribers)} subscribers •{" "}
              {abbreviateNumber(views)} collective views
            </p>
          </div>
        </div>
      </Link>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div>
          <h2 className="leading-tight text-[#aaaaaa]">Total Videos</h2>
          <p className="font-bold leading-tight text-white">
            {videos.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="leading-tight text-[#aaaaaa]">Total Views</h2>
          <p className="font-bold leading-tight text-white">
            {views.toLocaleString()}
          </p>
        </div>
        <div>
          <h2 className="leading-tight text-[#aaaaaa]">Average Views</h2>
          <p className="font-bold leading-tight text-white">
            {Math.round(views / videos).toLocaleString()}
          </p>
        </div>
        <div className="col-span-3">
          <h2 className="leading-tight text-[#aaaaaa]">Channel created on</h2>
          <p className="font-bold leading-tight text-white">
            {moment(since).format("MMMM Do, YYYY")}, {moment(since).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ChannelCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-[#252525] p-5">
      <div className="grid grid-cols-[2.25rem,auto] gap-3">
        <div className="aspect-square w-full rounded-full bg-[#333]"></div>
        <div>
          <div className="h-4 bg-[#333]"></div>
          <div className="mt-1 h-2 bg-[#333]"></div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div>
          <div className="h-2 bg-[#333]"></div>
          <div className="mt-1 h-4 bg-[#333]"></div>
        </div>
        <div>
          <div className="h-2 bg-[#333]"></div>
          <div className="mt-1 h-4 bg-[#333]"></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
