import type { IconType } from 'react-icons/lib'
import { classNames } from '~/utils/styles'

type Props = {
  icon: IconType
  className?: string
  iconClassName?: string
  onClick?: () => void
  disabled?: boolean
}

export const IconButton = ({
  icon: Icon,
  className,
  iconClassName,
  onClick,
  disabled,
}: Props) => {
  return (
    <button
      className={classNames(
        'flex items-center justify-center rounded-full cursor-pointer transition-colors hover:bg-black/40 disabled:opacity-50 disabled:hover:bg-transparent',
        className ?? '',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className={iconClassName} />
    </button>
  )
}
