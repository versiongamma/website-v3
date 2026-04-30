import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useWaitForImgLoad from "../useWaitForImgLoad";

class FakeImage {
  static instances: FakeImage[] = [];
  onload: (() => void) | null = null;
  private _src = "";
  constructor() {
    FakeImage.instances.push(this);
  }
  set src(value: string) {
    this._src = value;
  }
  get src() {
    return this._src;
  }
  triggerLoad() {
    this.onload?.();
  }
}

describe("useWaitForImgLoad", () => {
  const originalImage = globalThis.Image;

  beforeEach(() => {
    FakeImage.instances = [];
    (globalThis as { Image: typeof Image }).Image =
      FakeImage as unknown as typeof Image;
  });

  afterEach(() => {
    (globalThis as { Image: typeof Image }).Image = originalImage;
  });

  it("returns false before the image loads", () => {
    const { result } = renderHook(() => useWaitForImgLoad("a.jpg"));
    expect(result.current).toBe(false);
  });

  it("sets the image src to the provided url", () => {
    renderHook(() => useWaitForImgLoad("https://example.com/photo.jpg"));
    expect(FakeImage.instances).toHaveLength(1);
    expect(FakeImage.instances[0]?.src).toBe(
      "https://example.com/photo.jpg",
    );
  });

  it("returns true after the image's onload fires", () => {
    const { result } = renderHook(() => useWaitForImgLoad("a.jpg"));
    expect(result.current).toBe(false);

    act(() => {
      FakeImage.instances[0]?.triggerLoad();
    });

    expect(result.current).toBe(true);
  });

  it("calls the optional callback when onload fires", () => {
    const callback = vi.fn();
    renderHook(() => useWaitForImgLoad("a.jpg", callback));

    act(() => {
      FakeImage.instances[0]?.triggerLoad();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not throw when no callback is provided", () => {
    renderHook(() => useWaitForImgLoad("a.jpg"));

    expect(() => {
      act(() => {
        FakeImage.instances[0]?.triggerLoad();
      });
    }).not.toThrow();
  });

  it("creates a new image and resets loaded state when src changes", () => {
    const { result, rerender } = renderHook(
      ({ src }) => useWaitForImgLoad(src),
      { initialProps: { src: "first.jpg" } },
    );

    act(() => {
      FakeImage.instances[0]?.triggerLoad();
    });
    expect(result.current).toBe(true);

    rerender({ src: "second.jpg" });

    expect(FakeImage.instances).toHaveLength(2);
    expect(FakeImage.instances[1]?.src).toBe("second.jpg");
    expect(result.current).toBe(false);
  });

  it("calls the callback for each load when src changes", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ src }) => useWaitForImgLoad(src, callback),
      { initialProps: { src: "first.jpg" } },
    );

    act(() => {
      FakeImage.instances[0]?.triggerLoad();
    });

    rerender({ src: "second.jpg" });
    act(() => {
      FakeImage.instances[1]?.triggerLoad();
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
