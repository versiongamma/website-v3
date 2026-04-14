import { FiX } from 'react-icons/fi'
import { en } from '~/en'
import { classNames } from '~/utils/styles'

type Props = {
  open: boolean
  onClose: () => void
}

export const InfoModal = ({ open, onClose }: Props) => {
  return (
    <div
      className={classNames(
        'flex top-1/2 left-1/2 z-10 items-center justify-center translate-[-50%]',
        open ? 'fixed' : 'hidden',
      )}
    >
      <div className="bg-[#171717]/60 max-w-3xl max-h-80 w-full p-4 rounded-2xl drop-shadow-2xl backdrop-blur-2xl">
        <div className="flex flex-col gap-3 text-sm lg:text-base">
          <div className="flex w-full justify-between">
            <h2 className="text-lg font-semibold">{en.photos.heading}</h2>
            <button
              onClick={onClose}
              className="hover:bg-black/40 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            >
              <FiX className="text-lg" />
            </button>
          </div>
          <p>{en.photos.description.part1}</p>
          <span>
            <p>{en.photos.description.part2}</p>
            <p>{en.photos.description.part3}</p>
          </span>
        </div>
      </div>
    </div>
  )
}
