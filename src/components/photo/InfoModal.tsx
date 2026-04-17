import { useState } from "react";
import { FiInfo, FiX } from "react-icons/fi";
import { en } from "~/en";
import { setHidePhotoModal } from "~/functions/photos.function";
import { classNames } from "~/utils/style";

type Props = {
  initialState?: boolean;
};

export const InfoModal = ({ initialState = false }: Props) => {
  const [open, setOpen] = useState(initialState);
  const handleClose = () => {
    setOpen(false);
    setHidePhotoModal();
  };

  return (
    <>
      {/* Floating action button, always visible */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-2 right-2 bg-black/40 hover:bg-black/60 w-10 h-10 flex items-center justify-center rounded-full transition-colors z-1 backdrop-blur-2xl"
      >
        <FiInfo className="text-2xl drop-shadow-2xl" />
      </button>

      {/* Modal content */}
      <div
        className={classNames(
          "fixed flex top-1/2 left-1/2 z-10 items-center justify-center translate-[-50%] transition-opacity",
          open ? "visible" : "invisible",
        )}
      >
        <div className="bg-[#171717]/60 max-w-3xl w-[90vw] p-4 rounded-2xl drop-shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col gap-3 text-xs md:text-sm lg:text-base">
            <div className="flex w-full justify-between items-center">
              <h2 className="text-base md:text-lg font-semibold">
                {en.photos.heading}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="hover:bg-black/40 w-8 shrink-0 h-8 flex items-center justify-center rounded-full transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            </div>
            <p>{en.photos.description[0]}</p>
            <span>
              <p>{en.photos.description[1]}</p>
              <p>{en.photos.description[2]}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
