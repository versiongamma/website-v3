import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { YoutubeApiPlaylistResponse } from "~/types";
import { VideoCategory } from "../video/VideoCategory";

vi.mock("../TerminalContainer", () => ({
  TerminalContainer: ({
    header,
    content,
    classes,
  }: {
    header: React.ReactNode;
    content: React.ReactNode;
    classes?: { container?: string; header?: string; content?: string };
  }) => (
    <div data-testid="terminal-container" className={classes?.container}>
      <div data-testid="category-header" className={classes?.header}>
        {header}
      </div>
      <div data-testid="category-content">{content}</div>
    </div>
  ),
}));

vi.mock("../software/SpacerHeader", () => ({
  SpacerHeader: ({
    children,
    className,
    linesClassName,
  }: {
    children: React.ReactNode;
    className?: string;
    linesClassName?: string;
  }) => (
    <div
      data-testid="spacer-header"
      className={className}
      data-lines={linesClassName}
    >
      {children}
    </div>
  ),
}));

vi.mock("../video/VirtualVideoList", () => ({
  VirtualVideoList: ({
    videos,
  }: {
    videos: YoutubeApiPlaylistResponse["items"];
  }) => (
    <div data-testid="virtual-video-list" data-count={videos.length} />
  ),
}));

const FakeIcon = ({ className }: { className?: string }) => (
  <svg data-testid="category-icon" className={className} />
);

const makeVideos = (n: number): YoutubeApiPlaylistResponse["items"] =>
  Array.from({ length: n }, (_, i) => ({ id: `${i}` })) as unknown as YoutubeApiPlaylistResponse["items"];

const baseProps = {
  title: "Vlogs",
  description: "Casual videography from the road.",
  icon: FakeIcon,
  videos: makeVideos(3),
};

describe("VideoCategory", () => {
  it("renders inside TerminalContainer with SpacerHeader and VirtualVideoList", () => {
    render(<VideoCategory {...baseProps} />);
    expect(screen.getByTestId("terminal-container")).toBeInTheDocument();
    expect(screen.getByTestId("spacer-header")).toBeInTheDocument();
    expect(screen.getByTestId("virtual-video-list")).toBeInTheDocument();
  });

  it("renders the title in the header", () => {
    render(<VideoCategory {...baseProps} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Vlogs");
  });

  it("renders the description", () => {
    render(<VideoCategory {...baseProps} />);
    expect(screen.getByText(baseProps.description)).toBeInTheDocument();
  });

  it("renders the provided icon component in the header", () => {
    render(<VideoCategory {...baseProps} />);
    const icon = screen.getByTestId("category-icon");
    expect(icon).toBeInTheDocument();
  });

  it("passes the videos array to VirtualVideoList", () => {
    render(<VideoCategory {...baseProps} videos={makeVideos(7)} />);
    expect(screen.getByTestId("virtual-video-list")).toHaveAttribute(
      "data-count",
      "7",
    );
  });

  it("forwards width classes to TerminalContainer container", () => {
    render(<VideoCategory {...baseProps} />);
    const container = screen.getByTestId("terminal-container");
    expect(container).toHaveClass("w-screen");
    expect(container).toHaveClass("md:max-w-4xl");
    expect(container).toHaveClass("xl:max-w-6xl");
  });

  it("forwards header height classes to TerminalContainer header", () => {
    render(<VideoCategory {...baseProps} />);
    const header = screen.getByTestId("category-header");
    expect(header).toHaveClass("h-10");
    expect(header).toHaveClass("md:h-12");
    expect(header).toHaveClass("xl:h-16");
  });

  it("hides spacer lines on md+ via linesClassName", () => {
    render(<VideoCategory {...baseProps} />);
    expect(screen.getByTestId("spacer-header")).toHaveAttribute(
      "data-lines",
      "md:hidden",
    );
  });

  it("renders different titles when re-rendered", () => {
    const { rerender } = render(<VideoCategory {...baseProps} />);
    expect(
      screen.getByRole("heading", { level: 2 }),
    ).toHaveTextContent("Vlogs");

    rerender(<VideoCategory {...baseProps} title="Tutorials" />);
    expect(
      screen.getByRole("heading", { level: 2 }),
    ).toHaveTextContent("Tutorials");
  });

  it("renders with an empty videos array", () => {
    render(<VideoCategory {...baseProps} videos={[]} />);
    expect(screen.getByTestId("virtual-video-list")).toHaveAttribute(
      "data-count",
      "0",
    );
  });
});
