import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { createRef } from "react";

import InputField from "~/components/landing/InputField";
import Links from "~/components/landing/Links";
import { Socials } from "~/components/landing/Socials";
import { PageContainer } from "~/components/PageContainer";
import { TerminalContainer } from "~/components/TerminalContainer";
import { en } from "~/en";
import useClock from "~/hooks/useClock";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => ({ serverDate: new Date() }),
});

function Index() {
  const { serverDate } = Route.useLoaderData();
  const time = useClock(serverDate);
  const inputRef = createRef<HTMLInputElement>();

  return (
    <PageContainer
      className="justify-center"
      bg="bg-[url(/assets/background/index.jpg)]"
    >
      <TerminalContainer
        onClick={() => inputRef.current?.focus()}
        classes={{
          container: "w-full h-full relative md:max-w-250 md:h-200",
          header: "h-12 md:h-16",
          content: "h-[calc(100%-64px)]",
        }}
        header={
          <span className="flex w-full h-full items-center justify-center">
            <p className="text-black text-xl md:text-2xl font-mono">
              {en.landing.header}
            </p>
          </span>
        }
        content={
          <>
            <img
              src="/assets/face_400px.webp"
              aria-label="profile photo"
              className="absolute w-50 bottom-4 right-4 rounded-full max-md:hidden"
            />
            <div className="flex flex-col justify-between h-full font-text">
              <div className="flex flex-col mx-4 mt-4 md:mx-8 md:mt-8 space-y-4 h-full">
                {/* Clock */}
                <p className="font-mono md:text-lg mb-4">
                  current time:{" "}
                  <ClientOnly>{time.toLocaleTimeString()}</ClientOnly>
                </p>
                {/* Welcome / Intro */}
                <div className="space-y-3">
                  <h1 className="font-heading text-4xl font-bold">
                    {en.landing.welcome}
                  </h1>
                  <h2 className="font-heading text-2xl font-semibold">
                    {en.landing.intro}
                  </h2>
                </div>
                {/* Copy */}
                <div className="flex flex-col h-full">
                  <div className="flex flex-col h-full text-sm md:text-lg gap-6">
                    <p>{en.landing.message}</p>
                    {/* Page Links */}
                    <div className="flex flex-col h-full gap-2 justify-center md:justify-start max-md:-translate-y-[10%]">
                      <p className="text-lg md:text-xl text-center md:text-left ">
                        {en.landing.links}
                      </p>
                      <Links />
                    </div>
                  </div>
                  {/* Social Links */}
                  <div className="space-y-4 pb-4 md:pb-0">
                    <p className="text-lg md:text-xl text-center hidden md:block md:text-left">
                      {en.landing.socials}
                    </p>
                    <Socials />
                  </div>
                </div>
              </div>
            </div>
            <InputField inputRef={inputRef} />
          </>
        }
      />
    </PageContainer>
  );
}
