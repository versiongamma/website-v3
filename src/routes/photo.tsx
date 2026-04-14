import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import { PageContainer } from '~/components/PageContainer'
import { InfoModal } from '~/components/photo/InfoModal'
import { loadPhotos } from '~/functions/photos.function'
import { SiteRoute } from '~/utils/routes'

const SESSION_KEY = 'notFirstVisit'

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
})

const getDimensionsWithFixedHeight = (aspectRatio: number) => ({
  height: 360,
  width: 360 * aspectRatio,
})

export const Route = createFileRoute('/photo')({
  component: Photo,
  loader: () => loadPhotos(),
  head: () => ({
    meta: [
      {
        title: 'Photos - Version Gamma',
      },
    ],
  }),
})

function Photo() {
  const photos = Route.useLoaderData()
  const [open, setOpen] = useState<boolean>(false)

  return (
    <PageContainer path={SiteRoute.PHOTO}>
      <div className="px-8 pb-4">
        <div className="flex w-full justify-center p-6"></div>

        <InfoModal open={open} onClose={() => setOpen(false)} />

        {photos.length && (
          <RowsPhotoAlbum
            componentsProps={{
              image: {
                loading: 'eager',
                className: 'rounded-lg',
              },
            }}
            photos={photos.map((photo) => ({
              src: `${photo.url}=s640`,
              ...getDimensions(photo.aspectRatio),
            }))}
          />
        )}
      </div>
    </PageContainer>
  )
}
