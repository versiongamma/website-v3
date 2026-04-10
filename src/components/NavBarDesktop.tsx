import { Link } from '@tanstack/react-router'
import { selectiveStyle } from '~utils'
import { SiteRoute } from '~utils/routes'

type Props = {
  path: SiteRoute
}

export const NavBarDesktop = ({ path }: Props) => {
  const getLinkStyle = (linkPath: string) =>
    selectiveStyle(
      'text-orange-500 cursor-default',
      linkPath === path,
      'hover:text-orange-400 transition-colors',
    )

  return (
    <div className="bg-black/40 h-20 w-full flex items-center justify-center">
      <div className="font-mono text-xl flex gap-4">
        <Link className={getLinkStyle('/')} to="/">
          home
        </Link>
        <p>/</p>
        <a className={getLinkStyle('/video')} href="/video">
          video
        </a>
        <p>/</p>
        <Link className={getLinkStyle('/photo')} to="/photo">
          photo
        </Link>
        <p>/</p>
        <a className={getLinkStyle('/software')} href="/software">
          software
        </a>
        <p>/</p>
        <a className={getLinkStyle('/contact')} href="contact">
          contact
        </a>
      </div>
    </div>
  )
}
