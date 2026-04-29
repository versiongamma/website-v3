import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { act, render } from "@testing-library/react";
import { createRef } from "react";
import InputCaret from "../landing/InputCaret";

// Mock useOnComponentMount hook
vi.mock("~/hooks/useOnComponentMount", () => ({
  useOnComponentMount: (callback: () => void) => {
    callback();
  },
}));

describe("InputCaret", () => {
  let mockInputElement: HTMLInputElement;
  let mockInputRef: React.RefObject<HTMLInputElement>;

  beforeEach(() => {
    // Create a mock input element
    mockInputElement = document.createElement("input");
    mockInputElement.id = "input";
    mockInputRef = createRef<HTMLInputElement>();
    mockInputRef.current = mockInputElement;

    // Mock document.getElementById
    vi.spyOn(document, "getElementById").mockReturnValue(
      mockInputElement as any,
    );

    // jsdom does not implement getAnimations; define it so it can be spied on
    if (typeof document.getAnimations !== "function") {
      (document as any).getAnimations = () => [];
    }
    vi.spyOn(document, "getAnimations").mockReturnValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the caret element", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild;
    expect(caret).toBeInTheDocument();
    expect(caret?.tagName).toBe("DIV");
  });

  it("applies default styling classes to caret", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret).toHaveClass("w-2.5");
    expect(caret).toHaveClass("h-6");
    expect(caret).toHaveClass("mt-0.5");
    expect(caret).toHaveClass("bg-white");
    expect(caret).toHaveClass("absolute");
    expect(caret).toHaveClass("top-0");
    expect(caret).toHaveClass("caret-blink");
    expect(caret).toHaveClass("mix-blend-difference");
  });

  it("shows caret when show prop is true", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret.style.display).toBe("block");
  });

  it("hides caret when show prop is false", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={false} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret.style.display).toBe("none");
  });

  it("positions caret at left 0 initially", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret.style.left).toBe("0px");
  });

  it("calculates caret position based on selection end", () => {
    const CARET_SPACING = 10.84444444444444;
    mockInputElement.value = "abcdefghij";
    mockInputElement.selectionEnd = 5;

    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );

    // Trigger selectionchange event
    act(() => {
      mockInputElement.dispatchEvent(new Event("selectionchange"));
    });

    const caret = container.firstChild as HTMLElement;
    const expectedPosition = 5 * CARET_SPACING;
    expect(parseInt(caret.style.left)).toBeCloseTo(expectedPosition, 0);
  });

  it("caps caret position at MAX_CARET_DISTANCE", () => {
    const MAX_CARET_DISTANCE = 488;
    mockInputElement.selectionEnd = 100;

    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );

    // Trigger selectionchange event
    const selectionChangeEvent = new Event("selectionchange");
    mockInputElement.dispatchEvent(selectionChangeEvent);

    const caret = container.firstChild as HTMLElement;
    expect(parseInt(caret.style.left)).toBeLessThanOrEqual(MAX_CARET_DISTANCE);
  });

  it("listens to selectionchange event on mount", () => {
    const addEventListenerSpy = vi.spyOn(mockInputElement, "addEventListener");

    render(<InputCaret inputRef={mockInputRef} show={true} />);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "selectionchange",
      expect.any(Function),
    );
  });

  it("cancels and replays caret-blink animation on selection change", () => {
    const mockAnimation = {
      animationName: "caret-blink",
      cancel: vi.fn(),
      play: vi.fn(),
    };

    vi.mocked(document.getAnimations).mockReturnValue([mockAnimation as any]);

    render(<InputCaret inputRef={mockInputRef} show={true} />);

    // Trigger selectionchange
    const selectionChangeEvent = new Event("selectionchange");
    mockInputElement.dispatchEvent(selectionChangeEvent);

    expect(mockAnimation.cancel).toHaveBeenCalled();
    expect(mockAnimation.play).toHaveBeenCalled();
  });

  it("only affects caret-blink animations", () => {
    const mockOtherAnimation = {
      animationName: "other-animation",
      cancel: vi.fn(),
      play: vi.fn(),
    };

    vi.mocked(document.getAnimations).mockReturnValue([
      mockOtherAnimation as any,
    ]);

    render(<InputCaret inputRef={mockInputRef} show={true} />);

    const selectionChangeEvent = new Event("selectionchange");
    mockInputElement.dispatchEvent(selectionChangeEvent);

    expect(mockOtherAnimation.cancel).not.toHaveBeenCalled();
    expect(mockOtherAnimation.play).not.toHaveBeenCalled();
  });

  it("handles multiple caret-blink animations", () => {
    const mockAnimation1 = {
      animationName: "caret-blink",
      cancel: vi.fn(),
      play: vi.fn(),
    };
    const mockAnimation2 = {
      animationName: "caret-blink",
      cancel: vi.fn(),
      play: vi.fn(),
    };

    vi.mocked(document.getAnimations).mockReturnValue([
      mockAnimation1 as any,
      mockAnimation2 as any,
    ]);

    render(<InputCaret inputRef={mockInputRef} show={true} />);

    const selectionChangeEvent = new Event("selectionchange");
    mockInputElement.dispatchEvent(selectionChangeEvent);

    expect(mockAnimation1.cancel).toHaveBeenCalled();
    expect(mockAnimation1.play).toHaveBeenCalled();
    expect(mockAnimation2.cancel).toHaveBeenCalled();
    expect(mockAnimation2.play).toHaveBeenCalled();
  });

  it("handles null selectionEnd gracefully", () => {
    mockInputElement.selectionEnd = null;

    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );

    const selectionChangeEvent = new Event("selectionchange");
    mockInputElement.dispatchEvent(selectionChangeEvent);

    const caret = container.firstChild as HTMLElement;
    expect(caret.style.left).toBe("0px");
  });

  it("toggles display when show prop changes", () => {
    const { container, rerender } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    let caret = container.firstChild as HTMLElement;
    expect(caret.style.display).toBe("block");

    rerender(<InputCaret inputRef={mockInputRef} show={false} />);
    caret = container.firstChild as HTMLElement;
    expect(caret.style.display).toBe("none");

    rerender(<InputCaret inputRef={mockInputRef} show={true} />);
    caret = container.firstChild as HTMLElement;
    expect(caret.style.display).toBe("block");
  });

  it("uses correct input element by id", () => {
    const getElementByIdSpy = vi.spyOn(document, "getElementById");

    render(<InputCaret inputRef={mockInputRef} show={true} />);

    const selectionChangeEvent = new Event("selectionchange");
    mockInputElement.dispatchEvent(selectionChangeEvent);

    expect(getElementByIdSpy).toHaveBeenCalledWith("input");
  });

  it("positions caret absolutely at top", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret).toHaveClass("absolute");
    expect(caret).toHaveClass("top-0");
  });

  it("applies white background color", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret).toHaveClass("bg-white");
  });

  it("applies mix-blend-difference for blend mode", () => {
    const { container } = render(
      <InputCaret inputRef={mockInputRef} show={true} />,
    );
    const caret = container.firstChild as HTMLElement;
    expect(caret).toHaveClass("mix-blend-difference");
  });
});
