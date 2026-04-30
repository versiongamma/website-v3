import { describe, expect, it } from "vitest";
import { classNames, selectiveStyle } from "../style";

describe("selectiveStyle", () => {
  it("returns the style when apply is true", () => {
    expect(selectiveStyle("font-bold", true)).toBe("font-bold");
  });

  it("returns empty string when apply is false and no secondary style", () => {
    expect(selectiveStyle("font-bold", false)).toBe("");
  });

  it("returns secondary style when apply is false and secondary is provided", () => {
    expect(selectiveStyle("font-bold", false, "font-normal")).toBe(
      "font-normal",
    );
  });

  it("returns the style when apply is true even with secondary provided", () => {
    expect(selectiveStyle("font-bold", true, "font-normal")).toBe("font-bold");
  });
});

describe("classNames", () => {
  it("joins multiple class names with spaces", () => {
    expect(classNames("flex", "items-center", "gap-2")).toBe(
      "flex items-center gap-2",
    );
  });

  it("returns a single class name as-is", () => {
    expect(classNames("flex")).toBe("flex");
  });

  it("returns empty string when called with no arguments", () => {
    expect(classNames()).toBe("");
  });
});
