import useViewport from '~hooks/useViewport'
import DesktopLanding from './DesktopLanding'
import MobileLanding from './MobileLanding'

const Landing = () => {
  const { width } = useViewport()

  if (width < 830) {
    return <MobileLanding />
  }

  return <DesktopLanding />
}

export default Landing
