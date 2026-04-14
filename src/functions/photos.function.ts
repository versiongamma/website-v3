import { createServerFn } from '@tanstack/react-start'
import { fetchPhotosFromDriveFolder } from './photos.server'

export const loadPhotos = createServerFn().handler(async () => {
  const files = await fetchPhotosFromDriveFolder()
  return files.map((file) => ({
    url: `https://lh3.googleusercontent.com/d/${file.id}`,
    thumbnailUrl: file.thumbnailLink,
    aspectRatio: file.imageMediaMetadata.width / file.imageMediaMetadata.height,
  }))
})
