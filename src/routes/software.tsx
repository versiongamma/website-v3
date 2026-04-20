import { createFileRoute } from "@tanstack/react-router";

import { PageContainer } from "~/components/PageContainer";
import { JobEntry } from "~/components/software/JobEntry";
import { ProjectEntry } from "~/components/software/ProjectEntry";
import { SpacerHeader } from "~/components/software/SpacerHeader";
import { TerminalContainer } from "~/components/TerminalContainer";
import { en } from "~/en";
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
    <PageContainer
      path="/software"
      className="3xl:justify-center"
      bg="bg-[url(/assets/background/software.jpg)]"
    >
      <div className="w-full mt-0 md:mt-8 px-0 md:px-6">
        <SpacerHeader className="md:hidden mt-6 mb-0">
          {en.software.projects.title}
        </SpacerHeader>
        <div className="flex justify-center w-full">
          <TerminalContainer
            classes={{
              container: "max-w-4xl",
              header: "max-md:bg-transparent",
            }}
            header={
              <div className="p-4 md:text-black">
                <h2 className="hidden md:block text-2xl font-heading font-bold">
                  {en.software.projects.title}
                </h2>
                <p className="text-sm md:text-base">
                  {en.software.projects.description}
                </p>
              </div>
            }
            content={
              <div className="m-4 mt-0 md:mt-6 space-y-6">
                {projects.map((entry, index) => (
                  <>
                    <ProjectEntry key={entry.title} entry={entry} />
                    {index !== projects.length - 1 && (
                      <span className="block h-px bg-neutral-200/20" />
                    )}
                  </>
                ))}
              </div>
            }
          />
        </div>
        <SpacerHeader className="my-8">{en.software.career}</SpacerHeader>
        <div className="flex flex-col justify-center md:flex-row w-full gap-0 md:gap-10">
          {jobs.map((entry) => (
            <JobEntry key={entry.title} entry={entry} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
