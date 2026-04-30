import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { JobEntry } from "../software/JobEntry";

vi.mock("../TerminalContainer", () => ({
  TerminalContainer: ({
    header,
    content,
    classes,
  }: {
    header: React.ReactNode;
    content: React.ReactNode;
    classes?: { container?: string; header?: string; content?: string };
  }) => (
    <div data-testid="terminal-container" className={classes?.container}>
      <div data-testid="job-header" className={classes?.header}>
        {header}
      </div>
      <div data-testid="job-content" className={classes?.content}>
        {content}
      </div>
    </div>
  ),
}));

vi.mock("../software/SkillIcons", () => ({
  SkillIcons: ({ icons }: { icons: string }) => (
    <div data-testid="skill-icons" data-icons={icons} />
  ),
}));

const baseEntry = {
  title: "Acme Corp",
  icons: "react,typescript",
  copy: "Built lots of things at Acme.",
  work: "Senior Engineer",
  link: { text: "acme.example", href: "https://acme.example" },
};

describe("JobEntry", () => {
  it("renders inside a TerminalContainer", () => {
    render(<JobEntry entry={baseEntry} />);
    expect(screen.getByTestId("terminal-container")).toBeInTheDocument();
  });

  it("renders the logo when entry.logo is set", () => {
    render(<JobEntry entry={{ ...baseEntry, logo: "logo.png" }} />);
    const logo = screen.getByRole("img", { name: baseEntry.title });
    expect(logo).toHaveAttribute("src", "logo.png");
    expect(logo).toHaveAttribute("alt", baseEntry.title);
  });

  it("falls back to the title heading when no logo is provided", () => {
    render(<JobEntry entry={baseEntry} />);
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent(baseEntry.title);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("does not render the title heading when logo is provided", () => {
    render(<JobEntry entry={{ ...baseEntry, logo: "logo.png" }} />);
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("passes the icons string through to SkillIcons", () => {
    render(<JobEntry entry={baseEntry} />);
    const skills = screen.getByTestId("skill-icons");
    expect(skills).toHaveAttribute("data-icons", baseEntry.icons);
  });

  it("renders the copy text", () => {
    render(<JobEntry entry={baseEntry} />);
    expect(screen.getByText(baseEntry.copy)).toBeInTheDocument();
  });

  it("applies responsive text sizing to the copy", () => {
    render(<JobEntry entry={baseEntry} />);
    const copy = screen.getByText(baseEntry.copy);
    expect(copy).toHaveClass("text-sm");
    expect(copy).toHaveClass("md:text-base");
  });

  it("renders the work label", () => {
    render(<JobEntry entry={baseEntry} />);
    const work = screen.getByText(baseEntry.work);
    expect(work).toBeInTheDocument();
    expect(work).toHaveClass("opacity-50");
  });

  it("renders the external link with href, target, and rel", () => {
    render(<JobEntry entry={baseEntry} />);
    const link = screen.getByRole("link", { name: baseEntry.link.text });
    expect(link).toHaveAttribute("href", baseEntry.link.href);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("forwards container and content classes to TerminalContainer", () => {
    render(<JobEntry entry={baseEntry} />);
    const container = screen.getByTestId("terminal-container");
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("flex-col");
    expect(container).toHaveClass("w-full");
    expect(container).toHaveClass("max-w-3xl");

    const content = screen.getByTestId("job-content");
    expect(content).toHaveClass("h-full");
  });

  it("renders without work text when entry.work is omitted", () => {
    const { work, ...rest } = baseEntry;
    void work;
    render(<JobEntry entry={rest} />);
    expect(screen.queryByText(baseEntry.work)).not.toBeInTheDocument();
    // The link should still render.
    expect(
      screen.getByRole("link", { name: baseEntry.link.text }),
    ).toBeInTheDocument();
  });

  it("renders the SkillIcons in the header section", () => {
    render(<JobEntry entry={baseEntry} />);
    const header = screen.getByTestId("job-header");
    expect(header.querySelector("[data-testid='skill-icons']")).not.toBeNull();
  });
});
