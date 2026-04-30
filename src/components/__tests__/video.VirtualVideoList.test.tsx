import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";

import type { YoutubeApiPlaylistResponse } from "~/types";

const { virtualiser, useVideoItemSizeMock } = vi.hoisted(() => {
  const virtualiser = {
    scrollOffset: 0 as number | null,
    scrollRect: { width: 1000 } as { width: number } | null,
    measure: vi.fn(),
    scrollToOffset: vi.fn(),
    getTotalSize: vi.fn(() => 5000),
    getVirtualItems: vi.fn(() => [] as Array<unknown>),
  };
  return {
    virtualiser,
    useVideoItemSizeMock: vi.fn(() => 360),
  };
});

vi.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: vi.fn(() => virtualiser),
}));

vi.mock("../video/useVideoItemSize", () => ({
  useVideoItemSize: () => useVideoItemSizeMock(),
}));

vi.mock("../video/VirtualVideoItem", () => ({
  VirtualVideoItem: ({
    video,
    virtualItem,
  }: {
    video: { id: string };
    virtualItem: { index: number };
  }) => (
    <div
      data-testid="virtual-video-item"
      data-index={virtualItem.index}
      data-video-id={video.id}
    />
  ),
}));

vi.mock("../IconButton", () => ({
  IconButton: ({
    onClick,
    disabled,
    "data-direction": dir,
  }: {
    onClick?: () => void;
    disabled?: boolean;
    icon?: unknown;
    className?: string;
    iconClassName?: string;
    "data-direction"?: string;
  }) => (
    <button
      type="button"
      data-testid={`icon-${dir}`}
      data-direction={dir}
      disabled={disabled}
      onClick={onClick}
    />
  ),
}));

import { useVirtualizer } from "@tanstack/react-virtual";
import { VirtualVideoList } from "../video/VirtualVideoList";

const makeVideos = (n: number): YoutubeApiPlaylistResponse["items"] =>
  Array.from({ length: n }, (_, i) => ({ id: `video-${i}` })) as unknown as YoutubeApiPlaylistResponse["items"];

const setVirtualItems = (
  items: Array<{ key: string | number; index: number }>,
) => {
  virtualiser.getVirtualItems.mockReturnValue(items);
};

describe("VirtualVideoList", () => {
  beforeEach(() => {
    virtualiser.scrollOffset = 0;
    virtualiser.scrollRect = { width: 1000 };
    virtualiser.measure.mockClear();
    virtualiser.scrollToOffset.mockClear();
    virtualiser.getTotalSize.mockReset().mockReturnValue(5000);
    virtualiser.getVirtualItems.mockReset().mockReturnValue([]);
    useVideoItemSizeMock.mockReset().mockReturnValue(360);
    (useVirtualizer as unknown as Mock).mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders one VirtualVideoItem per virtual item from the virtualiser", () => {
    setVirtualItems([
      { key: 0, index: 0 },
      { key: 1, index: 1 },
      { key: 2, index: 2 },
    ]);

    render(<VirtualVideoList videos={makeVideos(10)} />);

    const items = screen.getAllByTestId("virtual-video-item");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveAttribute("data-index", "0");
    expect(items[2]).toHaveAttribute("data-index", "2");
  });

  it("passes the correct video to each VirtualVideoItem", () => {
    setVirtualItems([
      { key: 0, index: 0 },
      { key: 1, index: 5 },
    ]);

    render(<VirtualVideoList videos={makeVideos(10)} />);

    const items = screen.getAllByTestId("virtual-video-item");
    expect(items[0]).toHaveAttribute("data-video-id", "video-0");
    expect(items[1]).toHaveAttribute("data-video-id", "video-5");
  });

  it("configures useVirtualizer with horizontal layout, padding, gap and itemSize", () => {
    render(<VirtualVideoList videos={makeVideos(5)} />);

    const config = (useVirtualizer as unknown as Mock).mock.calls[0]![0]!;
    expect(config.count).toBe(5);
    expect(config.horizontal).toBe(true);
    expect(config.paddingStart).toBe(24);
    expect(config.paddingEnd).toBe(24);
    expect(config.gap).toBe(24);
    expect(config.overscan).toBe(2);
    expect(config.estimateSize()).toBe(360);
  });

  it("scrolls to offset 0 on mount", () => {
    render(<VirtualVideoList videos={makeVideos(5)} />);
    expect(virtualiser.scrollToOffset).toHaveBeenCalledWith(0, {
      behavior: "instant",
    });
  });

  it("calls measure() in an effect (item-size change reaction)", () => {
    render(<VirtualVideoList videos={makeVideos(5)} />);
    expect(virtualiser.measure).toHaveBeenCalled();
  });

  it("disables the back button when scrollOffset is at the start", () => {
    virtualiser.scrollOffset = 0;
    render(<VirtualVideoList videos={makeVideos(10)} />);
    expect(screen.getByTestId("icon-back")).toBeDisabled();
  });

  it("enables the back button when scrolled past the start", () => {
    virtualiser.scrollOffset = 200;
    render(<VirtualVideoList videos={makeVideos(10)} />);
    expect(screen.getByTestId("icon-back")).not.toBeDisabled();
  });

  it("disables the forward button when at the end", () => {
    virtualiser.scrollOffset = 4000;
    virtualiser.scrollRect = { width: 1000 };
    virtualiser.getTotalSize.mockReturnValue(5000);
    render(<VirtualVideoList videos={makeVideos(10)} />);
    // 4000 + 1000 + 24 (ITEM_PADDING) >= 5000 -> disabled
    expect(screen.getByTestId("icon-forward")).toBeDisabled();
  });

  it("enables the forward button when there is more content to the right", () => {
    virtualiser.scrollOffset = 0;
    virtualiser.scrollRect = { width: 1000 };
    virtualiser.getTotalSize.mockReturnValue(5000);
    render(<VirtualVideoList videos={makeVideos(10)} />);
    expect(screen.getByTestId("icon-forward")).not.toBeDisabled();
  });

  it("treats null scrollOffset as 0 for back-button state", () => {
    virtualiser.scrollOffset = null;
    render(<VirtualVideoList videos={makeVideos(10)} />);
    expect(screen.getByTestId("icon-back")).toBeDisabled();
  });

  it("scrolls forward by 2 items, aligned to itemSize+padding", async () => {
    virtualiser.scrollOffset = 0;
    render(<VirtualVideoList videos={makeVideos(10)} />);
    virtualiser.scrollToOffset.mockClear();

    await userEvent.click(screen.getByTestId("icon-forward"));

    // distance = 360 * 2 = 720; rounded to nearest multiple of (360 + 24) = 384
    // round(720 / 384) * 384 = 2 * 384 = 768
    expect(virtualiser.scrollToOffset).toHaveBeenCalledWith(768, {
      behavior: "smooth",
    });
  });

  it("scrolls back by 2 items, with rounding to the alignment stride", async () => {
    virtualiser.scrollOffset = 1000;
    render(<VirtualVideoList videos={makeVideos(10)} />);
    virtualiser.scrollToOffset.mockClear();

    await userEvent.click(screen.getByTestId("icon-back"));

    // 1000 + (-720) = 280; round(280 / 384) * 384 = round(0.729) * 384 = 1 * 384 = 384
    expect(virtualiser.scrollToOffset).toHaveBeenCalledWith(384, {
      behavior: "smooth",
    });
  });

  it("uses the larger 448 item size when useVideoItemSize returns it", () => {
    useVideoItemSizeMock.mockReturnValue(448);
    render(<VirtualVideoList videos={makeVideos(5)} />);

    const config = (useVirtualizer as unknown as Mock).mock.calls[0]![0]!;
    expect(config.estimateSize()).toBe(448);
  });

  it("renders no items when videos is empty and virtualiser returns nothing", () => {
    render(<VirtualVideoList videos={[]} />);
    expect(screen.queryAllByTestId("virtual-video-item")).toHaveLength(0);
  });
});
