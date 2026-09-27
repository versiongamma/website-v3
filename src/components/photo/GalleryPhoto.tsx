import { useState } from "react";

import { classNames } from "~/utils/style";
import Skeleton from "../Skeleton";

type Props = React.ComponentPropsWithoutRef<"img"> & {
  src: string;
  clickable?: boolean;
};

export const GalleryPhoto = ({ className, clickable, ...rest }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        {...rest}
        aria-label="gallery photo"
        className={classNames(
          className,
          clickable ? "hover:scale-102 transition-transform duration-100" : "",
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
