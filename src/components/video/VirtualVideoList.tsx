import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import type { YoutubeApiPlaylistResponse } from "~/types";
import { roundToNearestMultiple } from "~/utils/math";
import { IconButton } from "../IconButton";
import { VirtualVideoItem } from "./VirtualVideoItem";
import { useVideoItemSize } from "./useVideoItemSize";

const ITEM_PADDING = 24;
const OVERSCAN = 2;
/** How many items to scroll at a time using the forward/back buttons */
const SCROLL_AMOUNT = 2;

type Props = {
  videos: YoutubeApiPlaylistResponse["items"];
};

export const VirtualVideoList = ({ videos }: Props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemSize = useVideoItemSize();

  const virtualiser = useVirtualizer({
    count: videos.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => itemSize,
    overscan: OVERSCAN,
    horizontal: true,
    paddingStart: ITEM_PADDING,
    paddingEnd: ITEM_PADDING,
    gap: ITEM_PADDING,
  });

  /** Reset the scroll on component mount  */
  useEffect(() => {
    virtualiser.scrollToOffset(0, { behavior: "instant" });
  }, [virtualiser.scrollToOffset]);

  /** When the item size changes, re-measure the virtual list  */
  // biome-ignore lint/correctness/useExhaustiveDependencies: This callback should be a side effect of the item size changing
  useEffect(() => {
    virtualiser.measure();
  }, [itemSize, virtualiser.measure]);

  /**
   * Scrolls the virtual list by a given number of items. Negative values scroll
   * backwards by that number of items.
   *
   * Will scroll to a new offset that is a multiple of the item size + padding,
   * ensuring the scroll position stays aligned with the start of the item.
   */
  const scroll = (items: number) => {
    const currentScrollOffset = virtualiser.scrollOffset ?? 0;

    const distance = itemSize * items;
    const newOffset = roundToNearestMultiple(
      currentScrollOffset + distance,
      itemSize + ITEM_PADDING,
    );
    virtualiser.scrollToOffset(newOffset, { behavior: "smooth" });
  };

  const handleForward = () => scroll(SCROLL_AMOUNT);
  const handleBack = () => scroll(-SCROLL_AMOUNT);

  const backDisabled = (virtualiser.scrollOffset ?? 0) <= 0;
  const forwardDisabled =
    (virtualiser.scrollOffset ?? 0) +
      (virtualiser.scrollRect?.width ?? 0) +
      ITEM_PADDING >=
    virtualiser.getTotalSize();

  return (
    <>
      {/* Virtualised List */}
      <div
        ref={listRef}
        className="flex overflow-x-scroll overflow-y-hidden h-70 md:h-62 xl:h-84 no-scrollbar"
      >
        <div
          // shrink-0 is required to allow the paddingEnd of the virtualizer to work.
          className="relative shrink-0"
          style={{
            width: `${virtualiser.getTotalSize()}px`,
            height: "100%",
          }}
        >
          {virtualiser.getVirtualItems().map((item) => (
            <VirtualVideoItem
              key={item.key}
              video={videos[item.index]}
              virtualItem={item}
            />
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="hidden md:flex w-full justify-end px-4 gap-1">
        <IconButton
          icon={FiChevronLeft}
          onClick={handleBack}
          className="w-10 h-10"
          iconClassName="text-2xl"
          data-direction="back"
          disabled={backDisabled}
        />

        <IconButton
          icon={FiChevronRight}
          onClick={handleForward}
          className=" w-10 h-10 "
          iconClassName="text-2xl"
          data-direction="forward"
          disabled={forwardDisabled}
        />
      </div>
    </>
  );
};
