import { createFileRoute } from '@tanstack/react-router'
import { FiVideo, FiYoutube } from 'react-icons/fi'
import { PageContainer } from 'src/components/PageContainer'
import { VideoCategory } from 'src/components/video/VideoCategory'
import { en } from 'src/en'
import { loadVideos } from 'src/functions/videos.function'
import { SiteRoute } from '~utils/routes'

export const Route = createFileRoute('/video')({
  component: Video,
  loader: () => loadVideos(),
  head: () => ({
    meta: [
      {
        title: 'Videos - Version Gamma',
      },
    ],
  }),
})

function Video() {
  const { ytVideos, videographyVideos } = Route.useLoaderData()
  return (
    <PageContainer path={SiteRoute.VIDEO}>
      <div className="flex flex-col md:gap-10 md:my-6">
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
  )
}
