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

  return (
    <a
      className="flex flex-col p-4 rounded-xl hover:opacity-80 w-[320px] xl:w-120 shrink-0 transition-opacity bg-[#171717]/60 md:bg-transparent"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      {thumbnailLoaded ? (
        <img src={img} className="rounded-xl" />
      ) : (
        <Skeleton className="w-[288px] h-40.5 xl:w-md xl:h-63">
          <BiVideoRecording className="w-10 h-10 xl:w-12 xl:h-12" />
        </Skeleton>
      )}
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
