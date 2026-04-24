import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders a div with status role", () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole("status");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.tagName).toBe("DIV");
  });

  it("applies default classes", () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("flex");
    expect(skeleton).toHaveClass("items-center");
    expect(skeleton).toHaveClass("justify-center");
    expect(skeleton).toHaveClass("bg-gray-300");
    expect(skeleton).toHaveClass("rounded-lg");
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("applies custom className", () => {
    render(<Skeleton className="custom-class" />);
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("custom-class");
  });

  it("applies both default and custom classes", () => {
    render(<Skeleton className="extra-class" />);
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("bg-gray-300");
    expect(skeleton).toHaveClass("extra-class");
  });

  it("applies size object as inline styles", () => {
    const size = { width: 200, height: 100 };
    render(<Skeleton size={size} />);
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveStyle("width: 200px");
    expect(skeleton).toHaveStyle("height: 100px");
  });

  it("renders without size when size prop is not provided", () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole("status");
    expect(skeleton.style.width).toBe("");
    expect(skeleton.style.height).toBe("");
  });

  it("renders children when provided", () => {
    render(
      <Skeleton>
        <div>Child Content</div>
      </Skeleton>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("does not render children element when not provided", () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole("status");
    expect(skeleton.children.length).toBe(1); // Only the sr-only span
  });

  it("renders screen reader only text", () => {
    render(<Skeleton />);
    const srOnly = screen.getByText("Loading...");
    expect(srOnly).toHaveClass("sr-only");
  });

  it("renders multiple children", () => {
    render(
      <Skeleton>
        <div>First</div>
        <div>Second</div>
      </Skeleton>
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("applies all props together", () => {
    const size = { width: 300, height: 150 };
    render(
      <Skeleton className="custom" size={size}>
        <span>Loading content</span>
      </Skeleton>
    );
    const skeleton = screen.getByRole("status");
    expect(skeleton).toHaveClass("custom");
    expect(skeleton).toHaveClass("bg-gray-300");
    expect(skeleton).toHaveStyle("width: 300px");
    expect(skeleton).toHaveStyle("height: 150px");
    expect(screen.getByText("Loading content")).toBeInTheDocument();
  });
});
