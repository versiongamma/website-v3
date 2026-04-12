import { createServerFn } from '@tanstack/react-start'
import { getEnv } from './env.server'
import type { GoogleDriveFilesApiFields } from 'src/types'

export const getPhotos = createServerFn({ method: 'GET' }).handler(
  async (): Promise<
    Pick<
      GoogleDriveFilesApiFields,
      'id' | 'imageMediaMetadata' | 'thumbnailLink'
    >[]
  > => {
    const { GOOGLE_DRIVE_API_KEY, PHOTO_DRIVE_FOLDER_ID } = getEnv()
    const params = new URLSearchParams({
      q: `'${PHOTO_DRIVE_FOLDER_ID}' in parents`,
      key: GOOGLE_DRIVE_API_KEY,
      fields: 'files/id,files/imageMediaMetadata,files/thumbnailLink',
    })
    const result = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
    ).then((res) => res.json())

    console.log(result)

    return result.files ?? []
  },
)
