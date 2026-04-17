import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageContainer } from "~/components/PageContainer";
import { TerminalContainer } from "~/components/TerminalContainer";
import { en } from "~/en";
import {
  clearHidePhotoModal,
  isPhotoInfoModalDefaultHidden,
  setHidePhotoModal,
} from "~/functions/photos.function";
import { SiteRoute } from "~/utils/routes";

export const Route = createFileRoute("/dev")({
  component: Dev,
});

function Dev() {
  const [hideModal, setHideModal] = useState(isPhotoInfoModalDefaultHidden());

  return (
    <PageContainer path={SiteRoute.INDEX}>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="text-xl font-semibold">{en.dev.welcome}</h1>
        <p>{en.dev.description[0]}</p>
        <p>{en.dev.description[1]}</p>

        <TerminalContainer
          classes={{ container: "my-8" }}
          header={
            <div className="flex h-10 items-center justify-center">
              <h2 className="text-center text-black text-xl font-bold font-heading ">
                TOOLS
              </h2>
            </div>
          }
          content={
            <div className="flex flex-col py-2 m-4 min-w-xl gap-4">
              <div className="flex">
                <h2 className="text-lg">
                  <i>/photo</i>
                </h2>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="bg-black/40 p-4 rounded-2xl hover:bg-black/60 hover:cursor-pointer"
                  onClick={() => {
                    hideModal ? clearHidePhotoModal() : setHidePhotoModal();
                    setHideModal(!hideModal);
                  }}
                >
                  {hideModal ? "Clear" : "Set"} Auto Hide
                </button>
                <p>
                  Info Auto-Hide:{" "}
                  <span className="font-semibold">
                    {hideModal ? "TRUE" : "FALSE"}
                  </span>
                </p>
              </div>
              <div className="flex mt-8">
                <h2 className="text-lg">
                  <i>/software</i>
                </h2>
              </div>
              <div className="flex">
                <a
                  href="/software/edit"
                  className="bg-black/40 p-4 rounded-2xl hover:bg-black/60 hover:cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit Software Page
                </a>
              </div>
            </div>
          }
        />
        <p>
          <i>{en.dev.secret.hint}</i>
        </p>
        <p className="text-sm">
          <i>{en.dev.secret.note}</i>
        </p>
      </div>
      <p className="mb-2 opacity-50 text-xs">
        {import.meta.env.VITE_COMMIT_SHA}
      </p>
    </PageContainer>
  );
}
