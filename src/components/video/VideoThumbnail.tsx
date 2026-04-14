import { BiVideoRecording } from 'react-icons/bi'

import useWaitForImgLoad from '~/hooks/useWaitForImgLoad'
import Skeleton from '../Skeleton'

type Props = {
  id: string
  title: string
  img: string
  publishedDate: Date
}

export const VideoThumbnail = ({ id, title, img, publishedDate }: Props) => {
  const url = `https://youtu.be/${id}`
  const thumbnailLoaded = useWaitForImgLoad(img)

  if (!thumbnailLoaded) {
    return <ThumbnailSkeleton />
  }

  return (
    <a
      className="flex flex-col p-4 rounded-xl hover:opacity-80 w-[320px] xl:w-120 shrink-0 transition-opacity bg-[#171717]/60 md:bg-transparent"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <img src={img} className="rounded-xl" />
      <h1 className="font-heading font-semibold text-sm xl:text-lg mt-1 text-white">
        {title}
      </h1>
      <div className="flex items-end grow justify-end md:justify-start md:grow-0">
        <p className="text-white text-xs md:text-sm xl:text-md">
          {publishedDate.toLocaleDateString()}
        </p>
      </div>
    </a>
  )
}

// https://github.com/themesberg/flowbite/blob/main/content/components/skeleton.md
export const ThumbnailSkeleton = () => (
  <div className="w-[320px] h-63.5 md:h-64.5 xl:w-120 xl:h-91 p-0 md:p-4">
    <Skeleton className="w-full h-full">
      <BiVideoRecording className="w-12 h-12" />
    </Skeleton>
  </div>
)
