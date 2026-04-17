import { useState } from "react";
import { FiInfo, FiX } from "react-icons/fi";

import { en } from "~/en";
import {
  clearHidePhotoModal,
  setHidePhotoModal,
} from "~/functions/photos.function";
import { classNames } from "~/utils/style";
import { TerminalContainer } from "../TerminalContainer";

type Props = {
  initialState?: boolean;
};

export const InfoModal = ({ initialState = false }: Props) => {
  const [open, setOpen] = useState(initialState);
  const handleClose = () => {
    setOpen(false);
    setHidePhotoModal();
  };

  const handleOpen = () => {
    setOpen(true);
    clearHidePhotoModal();
  };

  return (
    <>
      {/* Floating action button, always visible */}
      <button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-2 right-2 bg-black/40 hover:bg-black/60 w-10 h-10 flex items-center justify-center rounded-full transition-colors z-1 backdrop-blur-2xl"
      >
        <FiInfo className="text-2xl drop-shadow-2xl" />
      </button>

      {/* Modal content */}
      <TerminalContainer
        classes={{
          container: classNames(
            "fixed top-1/2 left-1/2 z-10 translate-[-50%] transition-opacity",
            open ? "visible" : "invisible",
          ),
          content:
            "bg-[#171717]/60 max-w-3xl p-4 rounded-2xl drop-shadow-2xl backdrop-blur-2xl max-w-3xl w-screen",
        }}
        header={
          <div className="flex w-full justify-between items-center px-4 min-h-12">
            <h2 className="text-base md:text-lg font-semibold text-black py-2">
              {en.photos.heading}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="hover:bg-black/20 w-8 shrink-0 h-8 flex items-center justify-center rounded-full transition-colors"
            >
              <FiX className="text-lg" color="black" />
            </button>
          </div>
        }
        content={
          <div className="flex flex-col gap-2">
            <p>{en.photos.description[0]}</p>
            <span>
              <p>{en.photos.description[1]}</p>
              <p>{en.photos.description[2]}</p>
            </span>
          </div>
        }
      />

      {/* Overlay */}
      {open && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 md:bg-black/20 backdrop-blur-xs z-1"></div>
      )}
    </>
  );
};
