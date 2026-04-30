import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useOnComponentMount } from "../useOnComponentMount";

describe("useOnComponentMount", () => {
  it("calls the callback once on mount", () => {
    const callback = vi.fn();
    renderHook(() => useOnComponentMount(callback));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call the callback again on rerender", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useOnComponentMount(callback));
    rerender();
    rerender();
    rerender();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not call a new callback when the callback reference changes", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = renderHook(({ cb }) => useOnComponentMount(cb), {
      initialProps: { cb: first },
    });
    rerender({ cb: second });
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
  });

  it("calls each component's callback independently", () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    renderHook(() => useOnComponentMount(cb1));
    renderHook(() => useOnComponentMount(cb2));
    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(1);
  });

  it("does not call the callback after unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useOnComponentMount(callback));
    callback.mockClear();
    unmount();
    expect(callback).not.toHaveBeenCalled();
  });
});
