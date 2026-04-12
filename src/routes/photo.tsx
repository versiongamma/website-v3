import { createFileRoute } from '@tanstack/react-router'
import { SiteRoute } from '~utils/routes'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import { NavBarDesktop } from 'src/components/NavBarDesktop'
import { getPhotos } from 'src/functions/photos.function'
import { createServerFn } from '@tanstack/react-start'

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
})

const loadPhotos = createServerFn().handler(async () => {
  const files = await getPhotos()
  return files.map((file) => ({
    url: `https://lh3.googleusercontent.com/d/${file.id}`,
    thumbnailUrl: file.thumbnailLink,
    aspectRatio: file.imageMediaMetadata.width / file.imageMediaMetadata.height,
  }))
})

export const Route = createFileRoute('/photo')({
  component: RouteComponent,
  loader: () => loadPhotos(),
})

function RouteComponent() {
  const photos = Route.useLoaderData()

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
