import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";

import { IconButton } from "../IconButton";
import { TerminalContainer } from "../TerminalContainer";
import { GalleryPhoto } from "./GalleryPhoto";

type Props = {
  src: string;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export const PhotoViewerModal = ({
  src,
  index,
  total,
  onClose,
  onPrevious,
  onNext,
}: Props) => {
  const canNavigate = total > 1;

  return (
    <>
      <TerminalContainer
        classes={{
          container: "fixed top-1/2 left-1/2 z-10 translate-[-50%]",
          content: "h-[80vh] w-[80vw] p-4 md:rounded-b-3xl drop-shadow-2xl backdrop-blur-2xl",
        }}
        header={
          <div className="flex w-full justify-between items-center px-4 min-h-12">
            <span className="text-base md:text-lg font-semibold text-black py-2 font-text">
              {index + 1} / {total}
            </span>
            <IconButton
              icon={FiX}
              onClick={onClose}
              aria-label="close photo viewer"
              className="w-8 h-8"
              iconClassName="text-lg text-black"
            />
          </div>
        }
        content={
          <div className="flex items-center justify-between gap-4 p-4 w-full h-full">
            <IconButton
              icon={FiArrowLeft}
              onClick={onPrevious}
              disabled={!canNavigate}
              aria-label="previous photo"
              className="w-10 h-10 shrink-0"
              iconClassName="text-xl text-white"
              background="filled"
            />
            <div className="relative flex justify-center min-w-0 max-h-[70vh]">
              <GalleryPhoto
                key={src}
                src={src}
                loading="eager"
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-xl"
              />
            </div>
            <IconButton
              icon={FiArrowRight}
              onClick={onNext}
              disabled={!canNavigate}
              aria-label="next photo"
              className="w-10 h-10 shrink-0"
              iconClassName="text-xl text-white"
              background="filled"
            />
          </div>
        }
      />

      {/* Overlay */}
      <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 md:bg-black/20 backdrop-blur-xs z-1" />
    </>
  );
};
