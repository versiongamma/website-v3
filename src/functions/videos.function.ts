import { createServerFn } from '@tanstack/react-start'
import { fetchVideographyVideos, fetchYoutubeVideos } from './videos.server'

export const loadVideos = createServerFn({ method: 'GET' }).handler(
  async () => {
    const [ytVideos, videographyVideos] = await Promise.all([
      fetchYoutubeVideos(),
      fetchVideographyVideos(),
    ])
    return {
      ytVideos,
      videographyVideos,
    }
  },
)
