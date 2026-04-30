import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useClock from "../useClock";

describe("useClock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the initial date on first render before effects run", () => {
    vi.setSystemTime(new Date("2024-01-01T00:00:00.500Z"));
    const initial = new Date("2020-01-01T00:00:00.000Z");

    const { result } = renderHook(() => useClock(initial));

    // After mount, the effect synchronously sets time to "now". The hook returns the latest state.
    expect(result.current.getTime()).toBe(
      new Date("2024-01-01T00:00:00.500Z").getTime(),
    );
  });

  it("aligns the first tick to the next whole second", () => {
    vi.setSystemTime(new Date("2024-01-01T00:00:00.300Z"));
    const initial = new Date("2024-01-01T00:00:00.300Z");

    const { result } = renderHook(() => useClock(initial));

    expect(result.current.getMilliseconds()).toBe(300);

    // 1001 - 300 = 701ms until first delayed tick.
    act(() => {
      vi.advanceTimersByTime(701);
    });

    // After alignment, the system clock advanced by 701ms — milliseconds wrap to 1.
    expect(result.current.getMilliseconds()).toBe(1);
  });

  it("ticks at 1000ms intervals after the initial alignment", () => {
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
    const initial = new Date("2024-01-01T00:00:00.000Z");

    const { result } = renderHook(() => useClock(initial));

    // Initial mount — currentTime.getMilliseconds() === 0, so delay = 1001ms.
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    const afterAlign = result.current.getTime();

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.getTime()).toBe(afterAlign + 1000);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.getTime()).toBe(afterAlign + 2000);
  });

  it("cleans up the interval on unmount", () => {
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));
    const clearSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = renderHook(() =>
      useClock(new Date("2024-01-01T00:00:00.000Z")),
    );

    // Advance past the initial delay so the recurring interval is created.
    act(() => {
      vi.advanceTimersByTime(1001);
    });

    unmount();
    expect(clearSpy).toHaveBeenCalled();
  });

  it("does not throw when unmounted before the alignment delay fires", () => {
    vi.setSystemTime(new Date("2024-01-01T00:00:00.000Z"));

    const { unmount } = renderHook(() =>
      useClock(new Date("2024-01-01T00:00:00.000Z")),
    );

    expect(() => unmount()).not.toThrow();
  });
});
