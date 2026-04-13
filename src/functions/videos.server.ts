import { createServerFn } from '@tanstack/react-start'
import { getEnv } from './env.server'
import type { YoutubeApiPlaylistResponse } from 'src/types'

export const getYoutubeVideos = createServerFn({ method: 'GET' }).handler(
  async () => {
    const {
      YOUTUBE_API_KEY,
      YOUTUBE_REVIEWS_PLAYLIST_ID,
      YOUTUBE_ANALYSIS_PLAYLIST_ID,
    } = getEnv()
    const fetchVideosInAnalysisPlaylistUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${YOUTUBE_ANALYSIS_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
    const fetchVideosInReviewsPlaylistUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${YOUTUBE_REVIEWS_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`

    const [analysisData, reviewsData] = await Promise.all([
      fetch(fetchVideosInAnalysisPlaylistUrl)
        .then((res) => res.json())
        .then((videos) => videos),
      fetch(fetchVideosInReviewsPlaylistUrl)
        .then((res) => res.json())
        .then((videos) => videos),
    ])

    const unsortedItems: YoutubeApiPlaylistResponse['items'] = [
      ...analysisData.items,
      ...reviewsData.items,
    ]
    const data = {
      items: unsortedItems.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime(),
      ),
    }

    return data
  },
)
