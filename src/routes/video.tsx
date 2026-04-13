import { createFileRoute } from '@tanstack/react-router'
import { NavBar } from 'src/components/NavBar'
import { VideoThumbnail } from 'src/components/video/VideoThumbnail'
import { getYoutubeVideos } from 'src/functions/videos.server'
import { SiteRoute } from '~utils/routes'

export const Route = createFileRoute('/video')({
  component: RouteComponent,
  loader: () => getYoutubeVideos(),
})

function RouteComponent() {
  const { items } = Route.useLoaderData()
  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBar path={SiteRoute.VIDEO} />
      <div className="flex overflow-x-scroll">
        {items.map(
          ({
            snippet: {
              title,
              thumbnails: {
                maxres: { url },
              },
              publishedAt,
              resourceId: { videoId },
            },
          }) => (
            <VideoThumbnail
              key={videoId}
              id={videoId}
              img={url}
              title={title}
              publishedDate={new Date(publishedAt)}
            />
          ),
        )}
      </div>
    </div>
  )
}
