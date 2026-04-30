import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the useLocation hook before importing the component
vi.mock("@tanstack/react-router", () => ({
  useLocation: vi.fn(),
}));

import { useLocation } from "@tanstack/react-router";
import { NotFound } from "../NotFound";

describe("NotFound", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the not found container with full screen dimensions", () => {
    (useLocation as any).mockReturnValue({ pathname: "/unknown" });
    const { container } = render(<NotFound />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("w-screen");
    expect(mainDiv).toHaveClass("h-screen");
  });

  it("displays the terminal-like GET message", () => {
    (useLocation as any).mockReturnValue({ pathname: "/test" });
    render(<NotFound />);
    expect(screen.getByText(/GET https:\/\/versiongamma.com/)).toBeInTheDocument();
  });

  it("includes pathname in the GET message", () => {
    const testPathname = "/about";
    (useLocation as any).mockReturnValue({ pathname: testPathname });
    render(<NotFound />);
    expect(screen.getByText(new RegExp(testPathname))).toBeInTheDocument();
  });

  it("displays 404 Not Found status", () => {
    (useLocation as any).mockReturnValue({ pathname: "/notfound" });
    render(<NotFound />);
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });

  it("displays error message heading", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    render(<NotFound />);
    expect(screen.getByText("Uh oh!")).toBeInTheDocument();
  });

  it("displays error description", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    render(<NotFound />);
    expect(
      screen.getByText("Looks like that page doesn't exist.")
    ).toBeInTheDocument();
  });

  it("displays home link", () => {
    (useLocation as any).mockReturnValue({ pathname: "/random" });
    render(<NotFound />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Back to Home?");
  });

  it("home link points to root path", () => {
    (useLocation as any).mockReturnValue({ pathname: "/nonexistent" });
    render(<NotFound />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies styling classes to home link", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    render(<NotFound />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("text-blue-400");
    expect(link).toHaveClass("text-2xl");
    expect(link).toHaveClass("bg-slate-700/50");
    expect(link).toHaveClass("p-4");
    expect(link).toHaveClass("rounded-2xl");
  });

  it("renders with different pathnames", () => {
    const pathnames = ["/video", "/photo", "/software", "/invalid/nested/path"];

    pathnames.forEach((pathname) => {
      (useLocation as any).mockReturnValue({ pathname });
      const { unmount } = render(<NotFound />);
      expect(screen.getByText(new RegExp(pathname))).toBeInTheDocument();
      unmount();
    });
  });

  it("applies flex centering classes to container", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    const { container } = render(<NotFound />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("flex-col");
    expect(mainDiv).toHaveClass("items-center");
    expect(mainDiv).toHaveClass("justify-center");
  });

  it("has proper spacing between elements", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    const { container } = render(<NotFound />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass("gap-6");
  });

  it("renders terminal message with monospace font", () => {
    (useLocation as any).mockReturnValue({ pathname: "/test" });
    const { container } = render(<NotFound />);
    const monoElement = container.querySelector(".font-mono");
    expect(monoElement).toBeInTheDocument();
  });

  it("displays 404 status with semibold font weight", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    render(<NotFound />);
    const statusSpan = screen.getByText("404 Not Found");
    expect(statusSpan).toHaveClass("font-semibold");
  });

  it("renders error text with correct styling", () => {
    (useLocation as any).mockReturnValue({ pathname: "/" });
    const { container } = render(<NotFound />);
    const errorDiv = container.querySelector(".text-2xl");
    expect(errorDiv).toHaveClass("font-semibold");
    expect(errorDiv).toHaveClass("text-center");
  });
});
