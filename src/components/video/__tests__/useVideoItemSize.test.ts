import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `createIsomorphicFn` from @tanstack/react-start is normally rewritten at build time
// by the start vite plugin. In tests it falls back to a no-op stub, so we replace it
// with one that always returns the client branch (we run in jsdom).
vi.mock("@tanstack/react-start", () => ({
  createIsomorphicFn: () => {
    let clientFn: (...args: unknown[]) => unknown = () => undefined;
    const callable = ((...args: unknown[]) => clientFn(...args)) as ((
      ...a: unknown[]
    ) => unknown) & {
      server: (fn: unknown) => unknown;
      client: (fn: (...args: unknown[]) => unknown) => unknown;
    };
    callable.server = () => callable;
    callable.client = (fn) => {
      clientFn = fn;
      return callable;
    };
    return callable;
  },
}));

const useViewportMock = vi.fn();
vi.mock("~/hooks/useViewport", () => ({
  default: () => useViewportMock(),
}));

import { useVideoItemSize } from "../useVideoItemSize";

describe("useVideoItemSize", () => {
  beforeEach(() => {
    useViewportMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 448 when viewport width is >= 1280 (xl breakpoint)", () => {
    useViewportMock.mockReturnValue({ width: 1280, height: 800 });
    const { result } = renderHook(() => useVideoItemSize());
    expect(result.current).toBe(448);
  });

  it("returns 448 for widths well above the breakpoint", () => {
    useViewportMock.mockReturnValue({ width: 1920, height: 1080 });
    const { result } = renderHook(() => useVideoItemSize());
    expect(result.current).toBe(448);
  });

  it("returns 360 when viewport width is below the breakpoint", () => {
    useViewportMock.mockReturnValue({ width: 1279, height: 800 });
    const { result } = renderHook(() => useVideoItemSize());
    expect(result.current).toBe(360);
  });

  it("returns 360 for small mobile widths", () => {
    useViewportMock.mockReturnValue({ width: 320, height: 568 });
    const { result } = renderHook(() => useVideoItemSize());
    expect(result.current).toBe(360);
  });

  it("returns 360 when width is 0 (initial useViewport state)", () => {
    useViewportMock.mockReturnValue({ width: 0, height: 0 });
    const { result } = renderHook(() => useVideoItemSize());
    expect(result.current).toBe(360);
  });
});
