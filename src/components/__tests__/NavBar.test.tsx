import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBar } from "../NavBar";

// Mock TanStack Router Link component
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    className,
    children,
  }: {
    to: string;
    className?: string;
    children: React.ReactNode;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe("NavBar", () => {
  it("renders the navigation bar", () => {
    render(<NavBar />);
    const navbar = screen.getByRole("navigation", { hidden: true });
    expect(navbar).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<NavBar />);
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("video")).toBeInTheDocument();
    expect(screen.getByText("photo")).toBeInTheDocument();
    expect(screen.getByText("software")).toBeInTheDocument();
  });

  it("renders link separators", () => {
    const { container } = render(<NavBar />);
    const separators = container.querySelectorAll("p");
    expect(separators.length).toBeGreaterThan(0);
  });

  it("renders correct link hrefs", () => {
    render(<NavBar />);
    const homeLink = screen.getByText("home").closest("a");
    const videoLink = screen.getByText("video").closest("a");
    const photoLink = screen.getByText("photo").closest("a");
    const softwareLink = screen.getByText("software").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(videoLink).toHaveAttribute("href", "/video");
    expect(photoLink).toHaveAttribute("href", "/photo");
    expect(softwareLink).toHaveAttribute("href", "/software");
  });

  it("applies default styling classes to navbar", () => {
    const { container } = render(<NavBar />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("bg-black/40");
    expect(navbar).toHaveClass("h-12");
    expect(navbar).toHaveClass("md:h-16");
    expect(navbar).toHaveClass("w-full");
    expect(navbar).toHaveClass("flex");
  });

  it("applies custom className to navbar", () => {
    const { container } = render(<NavBar className="custom-navbar" />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("custom-navbar");
  });

  it("combines default and custom classNames", () => {
    const { container } = render(<NavBar className="extra-class" />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("bg-black/40");
    expect(navbar).toHaveClass("extra-class");
  });

  it("highlights active link with orange text when path matches", () => {
    render(<NavBar path="/video" />);
    const videoLink = screen.getByText("video").closest("a");
    expect(videoLink).toHaveClass("text-orange-500");
    expect(videoLink).toHaveClass("cursor-default");
  });

  it("applies hover styles to inactive links", () => {
    render(<NavBar path="/video" />);
    const homeLink = screen.getByText("home").closest("a");
    const photoLink = screen.getByText("photo").closest("a");
    const softwareLink = screen.getByText("software").closest("a");

    expect(homeLink).toHaveClass("hover:text-orange-400");
    expect(homeLink).toHaveClass("transition-colors");
    expect(photoLink).toHaveClass("hover:text-orange-400");
    expect(softwareLink).toHaveClass("hover:text-orange-400");
  });

  it("does not apply hover styles to active link", () => {
    render(<NavBar path="/photo" />);
    const photoLink = screen.getByText("photo").closest("a");
    expect(photoLink).not.toHaveClass("hover:text-orange-400");
  });

  it("highlights home link when path is /", () => {
    render(<NavBar path="/" />);
    const homeLink = screen.getByText("home").closest("a");
    expect(homeLink).toHaveClass("text-orange-500");
  });

  it("highlights software link when path is /software", () => {
    render(<NavBar path="/software" />);
    const softwareLink = screen.getByText("software").closest("a");
    expect(softwareLink).toHaveClass("text-orange-500");
  });

  it("applies mono font to nav links container", () => {
    const { container } = render(<NavBar />);
    const linksContainer = container.querySelector(".font-mono");
    expect(linksContainer).toBeInTheDocument();
  });

  it("applies flex gap to nav links container", () => {
    const { container } = render(<NavBar />);
    const linksContainer = container.querySelector(".gap-4");
    expect(linksContainer).toBeInTheDocument();
  });

  it("applies responsive text size to nav links", () => {
    const { container } = render(<NavBar />);
    const linksContainer = container.querySelector(".md\\:text-xl");
    expect(linksContainer).toBeInTheDocument();
  });

  it("renders with no path prop", () => {
    render(<NavBar />);
    expect(screen.getByText("home")).toBeInTheDocument();
    // Without path, no link should be highlighted
    const homeLink = screen.getByText("home").closest("a");
    expect(homeLink).toHaveClass("hover:text-orange-400");
  });

  it("switches active link styling when path changes", () => {
    const { rerender } = render(<NavBar path="/video" />);
    let videoLink = screen.getByText("video").closest("a");
    expect(videoLink).toHaveClass("text-orange-500");

    rerender(<NavBar path="/photo" />);
    videoLink = screen.getByText("video").closest("a");
    const photoLink = screen.getByText("photo").closest("a");
    expect(videoLink).not.toHaveClass("text-orange-500");
    expect(photoLink).toHaveClass("text-orange-500");
  });

  it("applies proper layout classes for flexbox centering", () => {
    const { container } = render(<NavBar />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("items-center");
    expect(navbar).toHaveClass("justify-center");
  });

  it("applies backdrop blur effect", () => {
    const { container } = render(<NavBar />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("backdrop-blur-md");
  });

  it("renders with z-index for layering", () => {
    const { container } = render(<NavBar />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("z-10");
  });

  it("applies shrink-0 to prevent navbar shrinking", () => {
    const { container } = render(<NavBar />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("shrink-0");
  });

  it("applies drop shadow effect", () => {
    const { container } = render(<NavBar />);
    const navbar = container.firstChild;
    expect(navbar).toHaveClass("drop-shadow");
  });
});
