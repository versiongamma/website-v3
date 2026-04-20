import type { IconType } from "react-icons/lib";

import type { YoutubeApiPlaylistResponse } from "~/types";
import { TerminalContainer } from "../TerminalContainer";
import { VirtualVideoList } from "./VirtualVideoList";
import { SpacerHeader } from "../software/SpacerHeader";

type Props = {
  title: string;
  description: string;
  icon: IconType;
  videos: YoutubeApiPlaylistResponse["items"];
};

export const VideoCategory = ({
  title,
  description,
  icon: Icon,
  videos,
}: Props) => {
  return (
    <TerminalContainer
      classes={{
        container: "w-screen md:max-w-4xl xl:max-w-6xl",
        header: "h-10 md:h-12 xl:h-16 max-md:bg-transparent",
      }}
      header={
        <SpacerHeader
          className="h-full px-4 md:px-5 xl:px-6"
          linesClassName="md:hidden"
        >
          <span className="flex gap-2.5 md:text-black items-center">
            <Icon className="text-3xl xl:text-5xl" />
            <h2 className="h-6 xl:h-7 text-2xl xl:text-4xl font-heading font-bold">
              {title}
            </h2>
          </span>
        </SpacerHeader>
      }
      content={
        <div className="mb-6">
          <div className="m-4">
            <p className="text-sm xl:text-base">{description}</p>
          </div>
          <div className="w-full">
            <VirtualVideoList videos={videos} />
          </div>
        </div>
      }
    />
  );
};
