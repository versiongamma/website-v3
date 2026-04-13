import { createFileRoute } from '@tanstack/react-router'
import { SiteRoute } from '~utils/routes'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'
import { NavBar } from 'src/components/NavBar'
import { getPhotos } from 'src/functions/photos.server'
import { createServerFn } from '@tanstack/react-start'
import { en } from 'src/en'

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
  head: () => ({
    meta: [
      {
        title: 'Photos - Version Gamma',
      },
    ],
  }),
})

function RouteComponent() {
  const photos = Route.useLoaderData()

  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBar path={SiteRoute.PHOTO} />
      <span className="flex w-full justify-center">
        <h2 className="text-xl text-center m-6 max-w-4xl">
          {en.photos.header}
        </h2>
      </span>
      <div className="px-8 pb-4 h-full overflow-y-scroll">
        {photos && (
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
    </div>
  )
}
