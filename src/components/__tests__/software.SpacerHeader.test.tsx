import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SpacerHeader } from "../software/SpacerHeader";

describe("SpacerHeader", () => {
  it("renders a flex container", () => {
    const { container } = render(<SpacerHeader>Test</SpacerHeader>);
    const spacer = container.firstChild;
    expect(spacer).toHaveClass("flex");
    expect(spacer).toHaveClass("w-full");
    expect(spacer).toHaveClass("items-center");
    expect(spacer).toHaveClass("gap-4");
  });

  it("renders h1 with children text", () => {
    render(<SpacerHeader>Test Header</SpacerHeader>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Test Header");
  });

  it("renders two decorative lines", () => {
    const { container } = render(<SpacerHeader>Header</SpacerHeader>);
    const lines = container.querySelectorAll("span");
    expect(lines).toHaveLength(2);
  });

  it("applies default classes to lines", () => {
    const { container } = render(<SpacerHeader>Header</SpacerHeader>);
    const lines = container.querySelectorAll("span");
    lines.forEach((line) => {
      expect(line).toHaveClass("grow");
      expect(line).toHaveClass("block");
      expect(line).toHaveClass("h-px");
      expect(line).toHaveClass("bg-gray-200/20");
    });
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <SpacerHeader className="custom-class">Header</SpacerHeader>
    );
    const spacer = container.firstChild;
    expect(spacer).toHaveClass("custom-class");
  });

  it("combines default and custom className on container", () => {
    const { container } = render(
      <SpacerHeader className="extra-class">Header</SpacerHeader>
    );
    const spacer = container.firstChild;
    expect(spacer).toHaveClass("flex");
    expect(spacer).toHaveClass("w-full");
    expect(spacer).toHaveClass("extra-class");
  });

  it("applies custom linesClassName to lines", () => {
    const { container } = render(
      <SpacerHeader linesClassName="custom-line-class">Header</SpacerHeader>
    );
    const lines = container.querySelectorAll("span");
    lines.forEach((line) => {
      expect(line).toHaveClass("custom-line-class");
    });
  });

  it("combines default and custom linesClassName", () => {
    const { container } = render(
      <SpacerHeader linesClassName="extra-line-class">Header</SpacerHeader>
    );
    const lines = container.querySelectorAll("span");
    lines.forEach((line) => {
      expect(line).toHaveClass("bg-gray-200/20");
      expect(line).toHaveClass("extra-line-class");
    });
  });

  it("applies default classes to h1", () => {
    render(<SpacerHeader>Header</SpacerHeader>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("font-heading");
    expect(heading).toHaveClass("font-bold");
  });

  it("renders with empty children", () => {
    render(<SpacerHeader />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("renders with complex children", () => {
    render(
      <SpacerHeader>
        <span>Complex</span>
        <em>Children</em>
      </SpacerHeader>
    );
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Children")).toBeInTheDocument();
  });

  it("renders lines with proper grow and sizing", () => {
    const { container } = render(<SpacerHeader>Header</SpacerHeader>);
    const lines = container.querySelectorAll("span");
    lines.forEach((line) => {
      expect(line).toHaveClass("grow");
      expect(line).toHaveClass("h-px");
    });
  });

  it("renders with all props together", () => {
    const { container } = render(
      <SpacerHeader className="container-class" linesClassName="line-class">
        Combined Test
      </SpacerHeader>
    );
    const spacer = container.firstChild;
    const lines = container.querySelectorAll("span");
    const heading = screen.getByRole("heading", { level: 1 });

    expect(spacer).toHaveClass("flex");
    expect(spacer).toHaveClass("container-class");
    lines.forEach((line) => {
      expect(line).toHaveClass("bg-gray-200/20");
      expect(line).toHaveClass("line-class");
    });
    expect(heading).toHaveTextContent("Combined Test");
  });

  it("maintains flex layout with custom classes", () => {
    const { container } = render(
      <SpacerHeader className="mt-4 mb-2">Header</SpacerHeader>
    );
    const spacer = container.firstChild;
    expect(spacer).toHaveClass("flex");
    expect(spacer).toHaveClass("items-center");
    expect(spacer).toHaveClass("gap-4");
    expect(spacer).toHaveClass("mt-4");
    expect(spacer).toHaveClass("mb-2");
  });

  it("lines are positioned before and after heading", () => {
    const { container } = render(<SpacerHeader>Header</SpacerHeader>);
    const children = Array.from(container.firstChild!.childNodes);
    expect(children[0].nodeName).toBe("SPAN");
    expect(children[1].nodeName).toBe("H1");
    expect(children[2].nodeName).toBe("SPAN");
  });

  it("h1 is centered between lines", () => {
    render(<SpacerHeader>Centered</SpacerHeader>);
    const container = screen.getByRole("heading", { level: 1 }).parentElement;
    expect(container).toHaveClass("items-center");
    expect(container).toHaveClass("gap-4");
  });

  it("renders different text content", () => {
    const { rerender } = render(<SpacerHeader>First</SpacerHeader>);
    let heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("First");

    rerender(<SpacerHeader>Second</SpacerHeader>);
    heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Second");
  });
});
