import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageContainer } from "~/components/PageContainer";
import { TerminalContainer } from "~/components/TerminalContainer";
import { TextButton } from "~/components/TextButton";
import en from "~/en.json";
import {
  clearHidePhotoModal,
  isPhotoInfoModalDefaultHidden,
  setHidePhotoModal,
} from "~/functions/photos.function";

export const Route = createFileRoute("/dev")({
  component: Dev,
  head: () => ({
    meta: [
      {
        title: "Dev Tools - Version Gamma",
      },
    ],
  }),
});

function Dev() {
  const [hideModal, setHideModal] = useState(isPhotoInfoModalDefaultHidden());

  return (
    <PageContainer>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <h1 className="text-xl font-semibold">{en.dev.welcome}</h1>
        <p>{en.dev.description[0]}</p>
        <p>{en.dev.description[1]}</p>
        <p className="mt-3 text-xs">{en.dev.description[2]}</p>
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
                <TextButton
                  onClick={() => {
                    hideModal ? clearHidePhotoModal() : setHidePhotoModal();
                    setHideModal(!hideModal);
                  }}
                >
                  Toggle Info Modal
                </TextButton>
                <p>
                  Info Modal:{" "}
                  <span className="font-semibold">
                    {hideModal ? "Hidden" : "Shown"}
                  </span>
                </p>
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
