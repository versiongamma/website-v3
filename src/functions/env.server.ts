import { createServerOnlyFn } from '@tanstack/react-start'

export const getEnv = createServerOnlyFn(() => {
  const { GOOGLE_DRIVE_API_KEY = '', PHOTO_DRIVE_FOLDER_ID = '' } = process.env
  return { GOOGLE_DRIVE_API_KEY, PHOTO_DRIVE_FOLDER_ID }
})
