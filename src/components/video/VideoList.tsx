import type { YoutubeApiPlaylistResponse } from 'src/types'
import { VideoThumbnail } from './VideoThumbnail'

type Props = {
  videos: YoutubeApiPlaylistResponse['items']
}

export const VideoList = ({ videos }: Props) => {
  return (
    <div className="flex overflow-x-scroll no-scrollbar">
      <div className="flex gap-6 mx-4">
        {videos.map(
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
