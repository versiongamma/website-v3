import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TextButton } from "../TextButton";

describe("TextButton", () => {
  it("renders as a button element when no href is provided", () => {
    render(<TextButton>Click me</TextButton>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders as an anchor element when href is provided", () => {
    render(<TextButton href="https://example.com">Click me</TextButton>);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  it("renders children text", () => {
    render(<TextButton>Hello World</TextButton>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders children text in anchor element", () => {
    render(<TextButton href="https://example.com">Link Text</TextButton>);
    expect(screen.getByText("Link Text")).toBeInTheDocument();
  });

  it("calls onClick handler when button is clicked", () => {
    const handleClick = vi.fn();
    render(<TextButton onClick={handleClick}>Click me</TextButton>);
    const button = screen.getByRole("button");
    button.click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick when button is disabled", () => {
    const handleClick = vi.fn();
    render(
      <TextButton onClick={handleClick} disabled={true}>
        Click me
      </TextButton>
    );
    const button = screen.getByRole("button");
    button.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("disables the button when disabled prop is true", () => {
    render(<TextButton disabled={true}>Click me</TextButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies default styling classes to button", () => {
    render(<TextButton>Click me</TextButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-black/40");
    expect(button).toHaveClass("p-4");
    expect(button).toHaveClass("rounded-2xl");
    expect(button).toHaveClass("transition-colors");
  });

  it("applies default styling classes to anchor", () => {
    render(<TextButton href="https://example.com">Link</TextButton>);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("bg-black/40");
    expect(link).toHaveClass("p-4");
    expect(link).toHaveClass("rounded-2xl");
    expect(link).toHaveClass("transition-colors");
  });

  it("anchor element opens in new tab", () => {
    render(<TextButton href="https://example.com">Link</TextButton>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("anchor element has rel noopener", () => {
    render(<TextButton href="https://example.com">Link</TextButton>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("anchor element has correct href", () => {
    const testUrl = "https://example.com/path";
    render(<TextButton href={testUrl}>Link</TextButton>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", testUrl);
  });

  it("button has type button", () => {
    render(<TextButton>Click me</TextButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });
});
