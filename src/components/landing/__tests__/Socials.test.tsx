import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Socials } from "../Socials";

describe("Socials", () => {
  it("renders the social links container", () => {
    const { container } = render(<Socials />);
    const socials = container.firstChild;
    expect(socials).toHaveClass("flex");
    expect(socials).toHaveClass("gap-4");
  });

  it("renders all five social links", () => {
    render(<Socials />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
  });

  it("renders email social link", () => {
    render(<Socials />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", "mailto:matt@versiongamma.com");
  });

  it("renders youtube social link", () => {
    render(<Socials />);
    const youtubeLink = screen.getByRole("link", { name: /youtube/i });
    expect(youtubeLink).toHaveAttribute(
      "href",
      "https://youtube.com/c/VersionGamma",
    );
  });

  it("renders github social link", () => {
    render(<Socials />);
    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/versiongamma",
    );
  });

  it("renders instagram social link", () => {
    render(<Socials />);
    const instagramLink = screen.getByRole("link", { name: /instagram/i });
    expect(instagramLink).toHaveAttribute(
      "href",
      "https://instagram.com/mattsphotosnz",
    );
  });

  it("renders bluesky social link", () => {
    render(<Socials />);
    const blueskyLink = screen.getByRole("link", { name: /bluesky/i });
    expect(blueskyLink).toHaveAttribute(
      "href",
      "https://bsky.app/profile/versiongamma.com",
    );
  });

  it("all social links open in new tab", () => {
    render(<Socials />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("all social links have noopener rel attribute", () => {
    render(<Socials />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener");
    });
  });

  it("renders all tooltip text", () => {
    render(<Socials />);
    expect(
      screen.getByText("Email: matt@versiongamma.com"),
    ).toBeInTheDocument();
    expect(screen.getByText("YouTube: @VersionGamma")).toBeInTheDocument();
    expect(screen.getByText("GitHub: versiongamma")).toBeInTheDocument();
    expect(screen.getByText("Instagram: @mattsphotosnz")).toBeInTheDocument();
    expect(screen.getByText("Bluesky: @versiongamma.com")).toBeInTheDocument();
  });

  it("applies responsive justify classes to container", () => {
    const { container } = render(<Socials />);
    const socials = container.firstChild;
    expect(socials).toHaveClass("justify-center");
    expect(socials).toHaveClass("md:justify-start");
  });

  it("all icon buttons have tooltip class", () => {
    const { container } = render(<Socials />);
    const tooltipContainers = container.querySelectorAll(".has-tooltip");
    expect(tooltipContainers).toHaveLength(5);
  });

  it("renders icons with correct styling", () => {
    const { container } = render(<Socials />);
    const icons = container.querySelectorAll("svg");
    icons.forEach((icon) => {
      expect(icon).toHaveClass("text-4xl");
      expect(icon).toHaveClass("hover:text-neutral-400");
      expect(icon).toHaveClass("transition-colors");
      expect(icon).toHaveClass("cursor-pointer");
    });
  });

  it("renders with proper accessibility for external links", () => {
    render(<Socials />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener");
    });
  });

  it("all social buttons are clickable", () => {
    render(<Socials />);
    const links = screen.getAllByRole("link");
    expect(links.every((link) => !link.hasAttribute("disabled"))).toBe(true);
  });

  it("renders correct email address in tooltip", () => {
    render(<Socials />);
    const emailTooltip = screen.getByText("Email: matt@versiongamma.com");
    expect(emailTooltip).toHaveClass("tooltip");
  });

  it("renders all social tooltips with tooltip class", () => {
    const { container } = render(<Socials />);
    const tooltips = container.querySelectorAll(".tooltip");
    expect(tooltips).toHaveLength(5);
  });
});
