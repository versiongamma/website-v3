import { useEffect, useState } from "react";

const useWaitForImgLoad = (src: string, callback?: () => void) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const preloadedImage = new Image();
    preloadedImage.onload = () => {
      setLoaded(true);
      if (callback) {
        callback();
      }
    };
    preloadedImage.src = src;
  }, [src, callback]);

  return loaded;
};

export default useWaitForImgLoad;
