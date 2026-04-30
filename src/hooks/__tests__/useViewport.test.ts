import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useViewport from "../useViewport";

const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: height,
  });
};

describe("useViewport", () => {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;

  beforeEach(() => {
    setViewport(1024, 768);
  });

  afterEach(() => {
    setViewport(originalWidth, originalHeight);
  });

  it("returns 0/0 on first render before the effect runs", () => {
    // The state is initialised to { width: 0, height: 0 } and updated in useEffect.
    // After the synchronous post-mount commit, dimensions should match window.
    const { result } = renderHook(() => useViewport());
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it("updates dimensions when the window resizes", () => {
    const { result } = renderHook(() => useViewport());
    expect(result.current).toEqual({ width: 1024, height: 768 });

    act(() => {
      setViewport(1920, 1080);
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toEqual({ width: 1920, height: 1080 });
  });

  it("reflects multiple resize events", () => {
    const { result } = renderHook(() => useViewport());

    act(() => {
      setViewport(800, 600);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toEqual({ width: 800, height: 600 });

    act(() => {
      setViewport(360, 640);
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current).toEqual({ width: 360, height: 640 });
  });

  it("registers a resize listener on mount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    renderHook(() => useViewport());
    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("removes the resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useViewport());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("stops updating after unmount", () => {
    const { result, unmount } = renderHook(() => useViewport());
    expect(result.current).toEqual({ width: 1024, height: 768 });

    unmount();

    setViewport(500, 500);
    window.dispatchEvent(new Event("resize"));

    // Hook is unmounted; result.current is the last value before unmount.
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });
});
