import { describe, expect, it } from "vitest";
import { roundToNearestMultiple } from "../math";

describe("roundToNearestMultiple", () => {
  it("rounds down when value is below the midpoint", () => {
    expect(roundToNearestMultiple(11, 10)).toBe(10);
  });

  it("rounds up when value is above the midpoint", () => {
    expect(roundToNearestMultiple(16, 10)).toBe(20);
  });

  it("rounds up at the midpoint (banker rounds to nearest, ties to even or up depending on JS)", () => {
    expect(roundToNearestMultiple(15, 10)).toBe(20);
  });

  it("returns the value unchanged when it is already a multiple", () => {
    expect(roundToNearestMultiple(30, 10)).toBe(30);
  });

  it("returns 0 when value is 0", () => {
    expect(roundToNearestMultiple(0, 10)).toBe(0);
  });

  it("handles negative values", () => {
    expect(roundToNearestMultiple(-11, 10)).toBe(-10);
    expect(roundToNearestMultiple(-16, 10)).toBe(-20);
  });

  it("works with non-integer multiples", () => {
    expect(roundToNearestMultiple(2.6, 0.5)).toBe(2.5);
    expect(roundToNearestMultiple(2.8, 0.5)).toBe(3);
  });

  it("works with a multiple of 1 (acts like Math.round)", () => {
    expect(roundToNearestMultiple(1.4, 1)).toBe(1);
    expect(roundToNearestMultiple(1.6, 1)).toBe(2);
  });

  it("works with large multiples", () => {
    expect(roundToNearestMultiple(1234, 100)).toBe(1200);
    expect(roundToNearestMultiple(1256, 100)).toBe(1300);
  });

  it("works with the values used by VirtualVideoList (item + padding alignment)", () => {
    const itemSize = 360;
    const padding = 24;
    const stride = itemSize + padding;
    expect(roundToNearestMultiple(0, stride)).toBe(0);
    expect(roundToNearestMultiple(stride, stride)).toBe(stride);
    expect(roundToNearestMultiple(stride * 2 - 1, stride)).toBe(stride * 2);
  });
});
