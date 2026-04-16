import { useState } from "react";

import { classNames } from "~/utils/style";
import Skeleton from "../Skeleton";

type Props = React.ComponentPropsWithoutRef<"img"> & {
  src: string;
};

export const GalleryPhoto = ({ className, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        {...rest}
        aria-label="gallery photo"
        className={classNames(
          className,
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
