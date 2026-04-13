import { BiVideoRecording } from 'react-icons/bi'
import useWaitForImgLoad from '~hooks/useWaitForImgLoad'
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
      className="flex flex-col p-4 rounded-xl bg-slate-600/40 hover-bg w-[320px] sm:w-105 md:w-[320px] xl:w-120 -md:m-4 shrink-0"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <img src={img} className="rounded-xl" />
      <h1 className="font-heading font-semibold text-lg mt-1 text-white">
        {title}
      </h1>
      <div className="flex items-end justify-end h-full">
        <p className="text-white">{publishedDate.toLocaleDateString()}</p>
      </div>
    </a>
  )
}

// https://github.com/themesberg/flowbite/blob/main/content/components/skeleton.md
export const ThumbnailSkeleton = () => (
  <Skeleton className="w-[320px] h-45 sm:w-105 sm:h-59 md:w-[320px] md:h-45 xl:w-120 xl:h-67.5 m-4">
    <BiVideoRecording className="w-12 h-12" />
  </Skeleton>
)
