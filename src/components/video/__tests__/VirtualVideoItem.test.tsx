import { render, screen } from "@testing-library/react";
import type { VirtualItem } from "@tanstack/react-virtual";
import { describe, expect, it, vi } from "vitest";

import type { YoutubeApiVideo } from "~/types";
import { VirtualVideoItem } from "../VirtualVideoItem";

vi.mock("../VideoThumbnail", () => ({
  VideoThumbnail: (props: {
    id: string;
    title: string;
    img: string;
    publishedDate: Date;
    style?: React.CSSProperties;
  }) => (
    <div
      data-testid="video-thumbnail"
      data-id={props.id}
      data-title={props.title}
      data-img={props.img}
      data-published={props.publishedDate.toISOString()}
      style={props.style}
    />
  ),
}));

const makeVideo = (overrides: Partial<YoutubeApiVideo["snippet"]> = {}) =>
  ({
    id: "playlist-item-id",
    snippet: {
      publishedAt: "2024-01-15T00:00:00Z",
      channelId: "channel",
      title: "A great video",
      description: "",
      channelTitle: "channel-title",
      playlistId: "playlist",
      position: 0,
      thumbnails: {
        default: { url: "d", width: 0, height: 0 },
        medium: { url: "m", width: 0, height: 0 },
        high: { url: "h", width: 0, height: 0 },
        standard: { url: "s", width: 0, height: 0 },
        maxres: {
          url: "https://i.ytimg.com/vi/abc/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      resourceId: { videoId: "abc" },
      ...overrides,
    },
  }) as YoutubeApiVideo;

const makeVirtualItem = (overrides: Partial<VirtualItem> = {}): VirtualItem =>
  ({
    key: 0,
    index: 0,
    start: 100,
    end: 460,
    size: 360,
    lane: 0,
    ...overrides,
  }) as VirtualItem;

describe("VirtualVideoItem", () => {
  it("renders a VideoThumbnail", () => {
    render(
      <VirtualVideoItem video={makeVideo()} virtualItem={makeVirtualItem()} />,
    );
    expect(screen.getByTestId("video-thumbnail")).toBeInTheDocument();
  });

  it("forwards the videoId from snippet.resourceId", () => {
    render(
      <VirtualVideoItem video={makeVideo()} virtualItem={makeVirtualItem()} />,
    );
    expect(screen.getByTestId("video-thumbnail")).toHaveAttribute(
      "data-id",
      "abc",
    );
  });

  it("forwards the title", () => {
    render(
      <VirtualVideoItem video={makeVideo()} virtualItem={makeVirtualItem()} />,
    );
    expect(screen.getByTestId("video-thumbnail")).toHaveAttribute(
      "data-title",
      "A great video",
    );
  });

  it("forwards the maxres thumbnail url as the image", () => {
    render(
      <VirtualVideoItem video={makeVideo()} virtualItem={makeVirtualItem()} />,
    );
    expect(screen.getByTestId("video-thumbnail")).toHaveAttribute(
      "data-img",
      "https://i.ytimg.com/vi/abc/maxresdefault.jpg",
    );
  });

  it("converts publishedAt into a Date", () => {
    render(
      <VirtualVideoItem video={makeVideo()} virtualItem={makeVirtualItem()} />,
    );
    expect(screen.getByTestId("video-thumbnail")).toHaveAttribute(
      "data-published",
      "2024-01-15T00:00:00.000Z",
    );
  });

  it("applies absolute positioning with size and translateX from virtualItem", () => {
    render(
      <VirtualVideoItem
        video={makeVideo()}
        virtualItem={makeVirtualItem({ start: 240, size: 360 })}
      />,
    );
    const thumb = screen.getByTestId("video-thumbnail");
    expect(thumb).toHaveStyle({
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "360px",
      transform: "translateX(240px)",
    });
  });

  it("uses the virtualItem.size for width", () => {
    render(
      <VirtualVideoItem
        video={makeVideo()}
        virtualItem={makeVirtualItem({ size: 448, start: 0 })}
      />,
    );
    expect(screen.getByTestId("video-thumbnail")).toHaveStyle({
      width: "448px",
      transform: "translateX(0px)",
    });
  });

  it("renders different videos independently", () => {
    const v1 = makeVideo({
      title: "First",
      resourceId: { videoId: "id1" },
    });
    const v2 = makeVideo({
      title: "Second",
      resourceId: { videoId: "id2" },
    });

    const { rerender } = render(
      <VirtualVideoItem video={v1} virtualItem={makeVirtualItem()} />,
    );
    expect(screen.getByTestId("video-thumbnail")).toHaveAttribute(
      "data-id",
      "id1",
    );

    rerender(<VirtualVideoItem video={v2} virtualItem={makeVirtualItem()} />);
    expect(screen.getByTestId("video-thumbnail")).toHaveAttribute(
      "data-id",
      "id2",
    );
  });
});
