import { createServerOnlyFn } from '@tanstack/react-start'

export const getEnv = createServerOnlyFn(() => {
  const {
    GOOGLE_DRIVE_API_KEY = '',
    PHOTO_DRIVE_FOLDER_ID = '',
    YOUTUBE_API_KEY = '',
    YOUTUBE_ANALYSIS_PLAYLIST_ID = '',
    YOUTUBE_REVIEWS_PLAYLIST_ID = '',
  } = process.env
  return {
    GOOGLE_DRIVE_API_KEY,
    PHOTO_DRIVE_FOLDER_ID,
    YOUTUBE_API_KEY,
    YOUTUBE_ANALYSIS_PLAYLIST_ID,
    YOUTUBE_REVIEWS_PLAYLIST_ID,
  }
})
