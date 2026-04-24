import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiHome } from "react-icons/fi";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "../IconButton";

describe("IconButton", () => {
  it("renders a button element", () => {
    render(<IconButton icon={FiHome} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders the provided icon", () => {
    render(<IconButton icon={FiHome} />);
    const icon = screen.getByRole("button").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(<IconButton icon={FiHome} onClick={handleClick} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("applies custom className to the button", () => {
    render(<IconButton icon={FiHome} className="custom-class" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("applies custom iconClassName to the icon", () => {
    render(<IconButton icon={FiHome} iconClassName="icon-custom-class" />);
    const icon = screen.getByRole("button").querySelector("svg");
    expect(icon).toHaveClass("icon-custom-class");
  });

  it("disables the button when disabled prop is true", () => {
    render(<IconButton icon={FiHome} disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn();
    render(<IconButton icon={FiHome} onClick={handleClick} disabled={true} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies default styling classes", () => {
    render(<IconButton icon={FiHome} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("flex");
    expect(button).toHaveClass("items-center");
    expect(button).toHaveClass("justify-center");
    expect(button).toHaveClass("rounded-full");
  });
});
