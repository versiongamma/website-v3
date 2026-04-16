import { Link } from '@tanstack/react-router'
import { FiCamera, FiGitPullRequest, FiVideo } from 'react-icons/fi'
import { tw } from '~/utils/style'

const linkStyle = tw`link-color font-mono text-2xl/loose flex items-center gap-4 w-fit`
const iconSize = 40

const Links = () => (
  <div className="flex flex-col items-center md:items-start">
    <Link to="/video" className={linkStyle}>
      <FiVideo size={iconSize} />
      /video
    </Link>
    <Link to="/photo" className={linkStyle}>
      <FiCamera size={iconSize} />
      /photo
    </Link>
    <Link to="/software" className={linkStyle}>
      <FiGitPullRequest size={iconSize} />
      /software
    </Link>
  </div>
)

export default Links
