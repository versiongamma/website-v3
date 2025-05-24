import useViewport from "../../components/useViewport";
import DesktopLanding from "./desktop/Landing";
import MobileLanding from './mobile/Landing';

const Landing = () => {
  const { width } = useViewport();

  if (width < 830) {
    return <MobileLanding />;
  }

  return <DesktopLanding />;
}

export default Landing;
