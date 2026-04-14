import { createFileRoute } from '@tanstack/react-router'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import { PageContainer } from '~/components/PageContainer'
import { en } from '~/en'
import { loadPhotos } from '~/functions/photos.function'
import { SiteRoute } from '~/utils/routes'

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
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

  return (
    <PageContainer path={SiteRoute.PHOTO}>
      <div className="px-8 pb-4">
        <div className="flex w-full justify-center p-6">
          <div className="flex flex-col gap-3 text-xs lg:text-sm">
            <p>{en.photos.description.part1}</p>
            <span>
              <p>{en.photos.description.part2}</p>
              <p>{en.photos.description.part3}</p>
            </span>
          </div>
        </div>

        {photos.length && (
          <RowsPhotoAlbum
            componentsProps={{
              image: {
                loading: 'eager',
                className: 'rounded-lg',
              },
            }}
            photos={photos.map((photo) => ({
              src: photo.url,
              ...getDimensions(photo.aspectRatio),
            }))}
          />
        )}
      </div>
    </PageContainer>
  )
}
