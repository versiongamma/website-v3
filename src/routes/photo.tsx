import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import { PageContainer } from "~/components/PageContainer";
import { GalleryPhoto } from "~/components/photo/GalleryPhoto";
import { InfoModal } from "~/components/photo/InfoModal";
import { PhotoViewerModal } from "~/components/photo/PhotoViewerModal";
import {
  isPhotoInfoModalDefaultHidden,
  loadPhotos,
} from "~/functions/photos.function";
import { shuffle } from "~/utils/math";

const PHOTO_GALLERY_SEED = 83000000004.7;

const getDimensions = (aspectRatio: number) => ({
  width: aspectRatio > 1 ? 640 : 640 * aspectRatio,
  height: aspectRatio < 1 ? 640 : 640 / aspectRatio,
});

export const Route = createFileRoute("/photo")({
  component: Photo,
  loader: () => loadPhotos(),
  head: () => ({
    meta: [
      {
        title: "Photos - Version Gamma",
      },
    ],
  }),
});

function Photo() {
  const photos = Route.useLoaderData();
  const showInfoModal = !isPhotoInfoModalDefaultHidden();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const galleryPhotos = shuffle(
    photos.map((photo) => ({
      src: `${photo.url}=s640`,
      ...getDimensions(photo.aspectRatio),
    })),
    PHOTO_GALLERY_SEED,
  );

  const selectedSrc =
    selectedIndex !== null
      ? `${galleryPhotos[selectedIndex]?.src.replace("=s640", "")}=s1600`
      : undefined;

  const total = galleryPhotos.length;

  const handleClose = () => setSelectedIndex(null);
  const handlePrevious = () =>
    setSelectedIndex((prev) =>
      prev === null ? prev : (prev - 1 + total) % total,
    );
  const handleNext = () =>
    setSelectedIndex((prev) => (prev === null ? prev : (prev + 1) % total));

  return (
    <PageContainer path="/photo" bg="bg-[url(/assets/background/photo.jpg)]">
      <InfoModal initialState={showInfoModal} />
      <div className="w-full h-full px-8 my-4 ">
        <RowsPhotoAlbum
          componentsProps={{
            image: {
              loading: "eager",
              className: "rounded-lg",
            },
            container: {
              className: "no-scrollbar pb-4",
            },
          }}
          photos={galleryPhotos}
          onClick={({ index }) => setSelectedIndex(index)}
          render={{
            image: (props) => <GalleryPhoto {...props} />,
          }}
        />
      </div>
      {selectedIndex !== null && selectedSrc && (
        <PhotoViewerModal
          src={selectedSrc}
          index={selectedIndex}
          total={total}
          onClose={handleClose}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      )}
    </PageContainer>
  );
}
