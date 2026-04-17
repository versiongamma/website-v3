import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "~/components/PageContainer";
import { JobEntry } from "~/components/software/JobEntry";
import { ProjectEntry } from "~/components/software/ProjectEntry";
import { getSoftwarePageData } from "~/functions/software.function";

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
  const { jobs, projects } = Route.useLoaderData();
  return (
    <PageContainer path="/software">
      <div className="w-full h-full mt-0 md:mt-8 px-0 md:px-6">
        <div className="flex justify-center w-full">
          <div className="flex flex-col items-center max-w-3xl w-full gap-6">
            {projects.map((entry) => (
              <ProjectEntry key={entry.title} entry={entry} />
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-0 md:gap-10 mt-10">
          {jobs.map((entry) => (
            <JobEntry key={entry.title} entry={entry} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
