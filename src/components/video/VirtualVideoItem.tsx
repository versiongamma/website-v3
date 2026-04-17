import type { VirtualItem } from "@tanstack/react-virtual";
import type { YoutubeApiVideo } from "~/types";
import { VideoThumbnail } from "./VideoThumbnail";

type Props = {
  video: YoutubeApiVideo;
  virtualItem: VirtualItem;
};

export const VirtualVideoItem = ({
  video: {
    snippet: {
      title,
      thumbnails: {
        maxres: { url },
      },
      publishedAt,
      resourceId: { videoId },
    },
  },
  virtualItem,
}: Props) => {
  return (
    <VideoThumbnail
      key={videoId}
      id={videoId}
      img={url}
      title={title}
      publishedDate={new Date(publishedAt)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${virtualItem.size}px`,
        transform: `translateX(${virtualItem.start}px)`,
      }}
    />
  );
};
