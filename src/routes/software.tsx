import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "~/components/PageContainer";
import { getSoftwarePageData } from "~/functions/software.function";
import { SiteRoute } from "~/utils/routes";

export const Route = createFileRoute("/software")({
  component: Software,
  loader: () => getSoftwarePageData(),
  head: () => ({
    meta: [
      {
        title: "Software - Version Gamma",
      },
    ],
  }),
});

function Software() {
  return (
    <PageContainer path={SiteRoute.SOFTWARE}>
      <div className="flex flex-col w-full h-full items-center justify-center">
        <p>Coming soon...</p>
      </div>
    </PageContainer>
  );
}
