import type { IconType } from 'react-icons/lib'
import type { YoutubeApiPlaylistResponse } from 'src/types'
import { VideoList } from './VideoList'
import { TerminalContainer } from '../TerminalContainer'
import { FiChevronRight } from 'react-icons/fi'

type Props = {
  title: string
  description: string
  icon: IconType
  videos: YoutubeApiPlaylistResponse['items']
}

export const VideoCategory = ({
  title,
  description,
  icon: Icon,
  videos,
}: Props) => {
  return (
    <TerminalContainer
      classes={{
        container: 'w-screen md:max-w-3xl xl:max-w-6xl',
        header: 'h-10 md:h-12 xl:h-16',
      }}
      header={
        <span className="flex gap-2.5 text-black h-full items-center justify-between mx-4 md:mx-5 xl:mx-6">
          <h2 className="h-6 xl:h-7 text-xl xl:text-3xl font-heading font-semibold">
            {title}
          </h2>
          <Icon className="text-3xl xl:text-5xl" />
        </span>
      }
      content={
        <div className="mb-6">
          <div className="m-4">
            <p className="text-sm xl:text-base">{description}</p>
          </div>
          <div className="w-full">
            <VideoList videos={videos} />
          </div>
          <div className="hidden md:flex w-full justify-end px-4">
            <FiChevronRight className="text-2xl" />
          </div>
        </div>
      }
    />
  )
}
