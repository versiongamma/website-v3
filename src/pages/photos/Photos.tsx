import { NavBarDesktop } from "@components";
import { SiteRoute } from "@utils/routes";
import { usePhotosQuery } from "../../queries/usePhotosQuery";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
});

const Photos = () => {
  const { photos } = usePhotosQuery();
  console.log(photos);

  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBarDesktop path={SiteRoute.PHOTO} />
      <div className="p-10 h-full overflow-y-scroll">
        {photos && (
          <RowsPhotoAlbum
            componentsProps={{
              image: {
                loading: "eager",
              },
            }}
            photos={photos.map((photo) => ({
              src: photo.url,
              ...getDimensions(photo.aspectRatio),
            }))}
          />
        )}
      </div>
    </div>
  );
};

export default Photos;
