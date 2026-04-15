import { createFileRoute } from '@tanstack/react-router'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import { PageContainer } from '~/components/PageContainer'
import { GalleryPhoto } from '~/components/photo/GalleryPhoto'
import { InfoModal } from '~/components/photo/InfoModal'
import { loadPhotos } from '~/functions/photos.function'
import { isPhotoInfoModalDefaultHidden } from '~/functions/session.function'
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
  const showInfoModal = !isPhotoInfoModalDefaultHidden()

  return (
    <PageContainer path={SiteRoute.PHOTO}>
      <InfoModal initialState={showInfoModal} />
      <div className="w-full h-full px-8 pb-4">
        <RowsPhotoAlbum
          componentsProps={{
            image: {
              loading: 'eager',
              className: 'rounded-lg',
            },
            container: {
              className: 'no-scrollbar',
            },
          }}
          photos={photos.map((photo) => ({
            src: `${photo.url}=s640`,
            ...getDimensions(photo.aspectRatio),
          }))}
          render={{
            image: (props) => <GalleryPhoto {...props} />,
          }}
        />
      </div>
    </PageContainer>
  )
}
