import { createFileRoute } from '@tanstack/react-router'
import { SiteRoute } from '~utils/routes'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import { NavBarDesktop } from 'src/components/NavBarDesktop'

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
})

export const Route = createFileRoute('/photo')({
  component: RouteComponent,
})

function RouteComponent() {
  const photos: any[] = []

  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBarDesktop path={SiteRoute.PHOTO} />
      <div className="p-10 h-full overflow-y-scroll">
        {photos && (
          <RowsPhotoAlbum
            componentsProps={{
              image: {
                loading: 'eager',
              },
            }}
            photos={photos.map((photo) => ({
              src: photo.url,
              ...getDimensions(photo.aspectRatio),
            }))}
          />
        )}
      </div>
    </div>
  )
}
