import Image from "next/image";
import Link from "next/link";

export const VideoCard: React.FC<{
  title: string;
  thumbnail: string;
  videoId: string;
  channel: string;
  views: string;
  duration: string;
  timestamp: string;
  channelImage: string;
  channelId: string;
}> = ({
  channel,
  channelImage,
  duration,
  thumbnail,
  timestamp,
  title,
  views,
  videoId,
  channelId,
}) => {
  return (
    <div>
      <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            height={720}
            width={1280}
            className="absolute inset-0 h-full w-full object-cover"
            src={thumbnail}
            alt={title}
          />
          <div className="absolute bottom-2 right-2 rounded bg-[#0f0f0f] bg-opacity-95 px-1 py-0.5">
            <p className="text-xs text-white">{duration}</p>
          </div>
        </div>
      </Link>
      <div className="mt-3 grid grid-cols-[2.25rem,auto] gap-3">
        <Link href={`https://www.youtube.com/channel/${channelId}`}>
          <Image
            height={36}
            width={36}
            className="aspect-square w-full rounded-full"
            src={channelImage}
            alt={title}
          />
        </Link>
        <div>
          <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
            <h2 className="font-bold leading-tight text-white">{title}</h2>
          </Link>
          <Link
            className="text-xs leading-tight text-[#aaaaaa]"
            href={`https://www.youtube.com/channel/${channelId}`}
          >
            {channel}
          </Link>
          <p className="text-xs leading-tight text-[#aaaaaa]">
            {views} • {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};
