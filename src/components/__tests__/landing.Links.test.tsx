import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Links from "../landing/Links";

// Mock TanStack Router Link
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, className }: any) => (
    <a href={to} className={className} data-testid={`link-${to}`}>
      {children}
    </a>
  ),
}));

describe("Links", () => {
  it("renders the links container", () => {
    const { container } = render(<Links />);
    const linksDiv = container.firstChild;
    expect(linksDiv).toHaveClass("flex");
    expect(linksDiv).toHaveClass("flex-col");
  });

  it("renders all three navigation links", () => {
    render(<Links />);
    expect(screen.getByText("/video")).toBeInTheDocument();
    expect(screen.getByText("/photo")).toBeInTheDocument();
    expect(screen.getByText("/software")).toBeInTheDocument();
  });

  it("renders video link with correct href", () => {
    render(<Links />);
    const videoLink = screen.getByTestId("link-/video");
    expect(videoLink).toHaveAttribute("href", "/video");
  });

  it("renders photo link with correct href", () => {
    render(<Links />);
    const photoLink = screen.getByTestId("link-/photo");
    expect(photoLink).toHaveAttribute("href", "/photo");
  });

  it("renders software link with correct href", () => {
    render(<Links />);
    const softwareLink = screen.getByTestId("link-/software");
    expect(softwareLink).toHaveAttribute("href", "/software");
  });

  it("renders icons for each link", () => {
    const { container } = render(<Links />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBe(3);
  });

  it("applies link-color class to all links", () => {
    const { container } = render(<Links />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveClass("link-color");
    });
  });

  it("applies monospace font to all links", () => {
    const { container } = render(<Links />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveClass("font-mono");
    });
  });

  it("applies text sizing to all links", () => {
    const { container } = render(<Links />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveClass("text-2xl/loose");
    });
  });

  it("applies flex and gap styling to all links", () => {
    const { container } = render(<Links />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveClass("flex");
      expect(link).toHaveClass("items-center");
      expect(link).toHaveClass("gap-4");
    });
  });

  it("applies w-fit to all links", () => {
    const { container } = render(<Links />);
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      expect(link).toHaveClass("w-fit");
    });
  });

  it("applies icon sizing to all icons", () => {
    const { container } = render(<Links />);
    const icons = container.querySelectorAll("svg");
    icons.forEach((icon) => {
      expect(icon).toHaveClass("text-3xl");
    });
  });

  it("applies responsive alignment to container", () => {
    const { container } = render(<Links />);
    const linksDiv = container.firstChild;
    expect(linksDiv).toHaveClass("items-center");
    expect(linksDiv).toHaveClass("md:items-start");
  });

  it("renders links in correct order", () => {
    render(<Links />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/video");
    expect(links[1]).toHaveAttribute("href", "/photo");
    expect(links[2]).toHaveAttribute("href", "/software");
  });

  it("renders exactly three links", () => {
    render(<Links />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("renders with proper flex column layout", () => {
    const { container } = render(<Links />);
    const linksDiv = container.firstChild;
    expect(linksDiv).toHaveClass("flex");
    expect(linksDiv).toHaveClass("flex-col");
    expect(linksDiv).toHaveClass("items-center");
  });

  it("each link renders with icon and text", () => {
    render(<Links />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      const icon = link.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(link.textContent).toMatch(/\/(video|photo|software)/);
    });
  });

  it("applies consistent styling across all links", () => {
    const { container } = render(<Links />);
    const links = container.querySelectorAll("a");
    const classesToCheck = [
      "link-color",
      "font-mono",
      "text-2xl/loose",
      "flex",
      "items-center",
      "gap-4",
      "w-fit",
    ];
    links.forEach((link) => {
      classesToCheck.forEach((className) => {
        expect(link).toHaveClass(className);
      });
    });
  });
});
