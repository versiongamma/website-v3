import { createFileRoute } from "@tanstack/react-router";
import { FiVideo, FiYoutube } from "react-icons/fi";

import { PageContainer } from "~/components/PageContainer";
import { VideoCategory } from "~/components/video/VideoCategory";
import en from "~/en.json";
import { loadVideos } from "~/functions/videos.function";

export const Route = createFileRoute("/video")({
  component: Video,
  loader: () => loadVideos(),
  head: () => ({
    meta: [
      {
        title: "Videos - Version Gamma",
      },
    ],
  }),
});

function Video() {
  const { ytVideos, videographyVideos } = Route.useLoaderData();
  return (
    <PageContainer
      path="/video"
      bg="bg-[url(/assets/background/video.jpg)]"
      className="justify-center-safe"
    >
      <div className="md:space-y-10 my-6 md:items-center">
        <VideoCategory
          title={en.videos.youtube.title}
          description={en.videos.youtube.description}
          icon={FiYoutube}
          videos={ytVideos}
        />
        <VideoCategory
          title={en.videos.videography.title}
          description={en.videos.videography.description}
          icon={FiVideo}
          videos={videographyVideos}
        />
      </div>
    </PageContainer>
  );
}
