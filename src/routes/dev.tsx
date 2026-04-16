import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageContainer } from "~/components/PageContainer";
import { TerminalContainer } from "~/components/TerminalContainer";
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
        <h1 className="text-xl font-semibold">
          Congratulations! You've found the dev tools of my site.
        </h1>
        <p>
          As you can probably tell by it being accessible to the open internet,
          there's nothing here that is dangerous.
        </p>
        <p>Nothing for you to exploit today!</p>

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
            <div className="p-4 min-w-xl">
              <div className="flex items-center justify-between">
                <p>
                  Photo Info Modal Auto-Hide:{" "}
                  <span className="font-semibold">
                    {hideModal ? "TRUE" : "FALSE"}
                  </span>
                </p>
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
              </div>
            </div>
          }
        />
        <p>
          <i>
            Tip: There's a secret route you can find on this site. The only clue
            I'll give you is the number 418.
          </i>
        </p>
        <p className="text-sm">
          <i>
            Yes, you probably could find a index of all the routes this site
            exposes, but what's the fun in that?
          </i>
        </p>
      </div>
      <p className="mb-2 opacity-50 text-xs">
        {import.meta.env.VITE_COMMIT_SHA}
      </p>
    </PageContainer>
  );
}
