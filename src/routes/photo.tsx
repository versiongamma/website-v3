import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import { setCookie, getCookie } from '@tanstack/react-start/server'
import 'react-photo-album/rows.css'

import { PageContainer } from '~/components/PageContainer'
import { GalleryPhoto } from '~/components/photo/GalleryPhoto'
import { InfoModal } from '~/components/photo/InfoModal'
import { loadPhotos } from '~/functions/photos.function'
import { SiteRoute } from '~/utils/routes'

const SESSION_KEY = 'notFirstVisit'

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
})

export const Route = createFileRoute('/photo')({
  component: Photo,
  loader: async () => {
    const photos = await loadPhotos()
    const firstVisit = getCookie(SESSION_KEY) !== 'true'

    setCookie(SESSION_KEY, 'true')

    return {
      photos,
      firstVisit,
    }
  },
  head: () => ({
    meta: [
      {
        title: 'Photos - Version Gamma',
      },
    ],
  }),
})

function Photo() {
  const { photos, firstVisit } = Route.useLoaderData()

  return (
    <PageContainer path={SiteRoute.PHOTO}>
      <div className="w-full h-full px-8 pb-4">
        <InfoModal initialState={firstVisit} />
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
