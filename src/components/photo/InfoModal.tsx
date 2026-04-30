import { useEffect, useState } from "react";
import { FiInfo, FiX } from "react-icons/fi";

import en from "~/en.json";
import {
  clearHidePhotoModal,
  setHidePhotoModal,
} from "~/functions/photos.function";
import { classNames } from "~/utils/style";
import { IconButton } from "../IconButton";
import { TerminalContainer } from "../TerminalContainer";

type Props = {
  initialState?: boolean;
};

export const InfoModal = ({ initialState = false }: Props) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    if (initialState) {
      clearHidePhotoModal();
    }
  }, [initialState]);

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
      <IconButton
        icon={FiInfo}
        onClick={handleOpen}
        aria-label="info"
        className="fixed bottom-2 right-2 w-10 h-10 z-1 backdrop-blur-md"
        background="filled"
        iconClassName="text-2xl"
      />

      {/* Modal content */}
      <TerminalContainer
        classes={{
          container: classNames(
            "fixed top-1/2 left-1/2 z-10 translate-[-50%] transition-opacity",
            open ? "visible" : "invisible",
          ),
          content:
            "max-w-3xl p-4 md:rounded-b-3xl drop-shadow-2xl backdrop-blur-2xl max-w-3xl w-screen",
        }}
        header={
          <div className="flex w-full justify-between items-center px-4 min-h-12">
            <h2 className="text-base md:text-lg font-semibold text-black py-2 font-text">
              {en.photos.heading}
            </h2>
            <IconButton
              icon={FiX}
              onClick={handleClose}
              className="w-8 h-8"
              iconClassName="text-lg text-black"
            />
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
