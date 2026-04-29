import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectEntry } from "../software/ProjectEntry";

// Mock SkillIcons component
vi.mock("../software/SkillIcons", () => ({
  SkillIcons: ({ icons }: { icons: string }) => (
    <img data-testid="skill-icons" src={`https://skillicons.dev/icons?i=${icons}`} alt={icons} />
  ),
}));

describe("ProjectEntry", () => {
  const mockEntry = {
    title: "Test Project",
    icons: "react,typescript",
    link: {
      href: "https://example.com/project",
      text: "View Project",
    },
    copy: "This is a test project description.",
    work: "Full-time",
    logo: undefined,
  };

  it("renders the project container", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("space-y-0.5");
  });

  it("renders the project title", () => {
    render(<ProjectEntry entry={mockEntry} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders the project title as h2", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("Test Project");
  });

  it("applies styling classes to title", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveClass("font-heading");
    expect(title).toHaveClass("font-bold");
    expect(title).toHaveClass("text-3xl");
    expect(title).toHaveClass("md:text-4xl");
    expect(title).toHaveClass("translate-y-1");
  });

  it("renders skill icons component", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const icons = screen.getByTestId("skill-icons");
    expect(icons).toBeInTheDocument();
  });

  it("passes correct icons to SkillIcons component", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const icons = screen.getByTestId("skill-icons");
    expect(icons).toHaveAttribute("alt", "react,typescript");
  });

  it("renders the project link", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("renders link with correct href", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com/project");
  });

  it("renders link with correct text", () => {
    render(<ProjectEntry entry={mockEntry} />);
    expect(screen.getByText("View Project")).toBeInTheDocument();
  });

  it("opens link in new tab", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("applies noopener noreferrer for security", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies link-color class to link", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("link-color");
  });

  it("renders project description", () => {
    render(<ProjectEntry entry={mockEntry} />);
    expect(screen.getByText("This is a test project description.")).toBeInTheDocument();
  });

  it("applies styling classes to description", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const description = container.querySelector("p");
    expect(description).toHaveClass("text-sm");
    expect(description).toHaveClass("md:text-base");
  });

  it("arranges title and icons in flex container", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const flexContainer = container.querySelector("span.flex");
    expect(flexContainer).toHaveClass("gap-4");
    expect(flexContainer).toHaveClass("items-center");
    expect(flexContainer).toHaveClass("justify-between");
  });

  it("renders with different project data", () => {
    const differentEntry = {
      ...mockEntry,
      title: "Another Project",
      copy: "Different description",
    };
    render(<ProjectEntry entry={differentEntry} />);
    expect(screen.getByText("Another Project")).toBeInTheDocument();
    expect(screen.getByText("Different description")).toBeInTheDocument();
  });

  it("renders with multiple icons", () => {
    const multiIconEntry = {
      ...mockEntry,
      icons: "react,typescript,tailwind,nodejs",
    };
    render(<ProjectEntry entry={multiIconEntry} />);
    const icons = screen.getByTestId("skill-icons");
    expect(icons).toHaveAttribute("alt", "react,typescript,tailwind,nodejs");
  });

  it("renders with external URLs", () => {
    const externalEntry = {
      ...mockEntry,
      link: {
        href: "https://github.com/user/project",
        text: "GitHub",
      },
    };
    render(<ProjectEntry entry={externalEntry} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://github.com/user/project");
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders title and link in correct order", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const children = Array.from(container.firstChild!.childNodes);
    const titleSpan = children[0];
    const linkDiv = children[1];
    const copyP = children[2];

    expect((titleSpan as HTMLElement).querySelector("h2")).toBeInTheDocument();
    expect((linkDiv as HTMLElement).querySelector("a")).toBeInTheDocument();
    expect((copyP as HTMLElement).tagName).toBe("P");
  });

  it("renders with long project description", () => {
    const longEntry = {
      ...mockEntry,
      copy: "This is a very long project description that spans multiple lines and contains detailed information about what the project does and its key features.",
    };
    render(<ProjectEntry entry={longEntry} />);
    expect(
      screen.getByText(
        /This is a very long project description that spans multiple lines/
      )
    ).toBeInTheDocument();
  });

  it("renders with empty icons string", () => {
    const noIconEntry = {
      ...mockEntry,
      icons: "",
    };
    render(<ProjectEntry entry={noIconEntry} />);
    const icons = screen.getByTestId("skill-icons");
    expect(icons).toHaveAttribute("alt", "");
  });

  it("maintains responsive layout across breakpoints", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const title = screen.getByRole("heading", { level: 2 });
    const description = screen.getByText("This is a test project description.");

    expect(title).toHaveClass("text-3xl");
    expect(title).toHaveClass("md:text-4xl");
    expect(description).toHaveClass("text-sm");
    expect(description).toHaveClass("md:text-base");
  });

  it("renders link container with proper spacing", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const linkDiv = container.querySelector("div.mb-1");
    expect(linkDiv).toHaveClass("mb-1");
  });

  it("renders all content from entry object", () => {
    render(<ProjectEntry entry={mockEntry} />);
    expect(screen.getByText(mockEntry.title)).toBeInTheDocument();
    expect(screen.getByText(mockEntry.link.text)).toBeInTheDocument();
    expect(screen.getByText(mockEntry.copy)).toBeInTheDocument();
  });

  it("applies proper flex centering to header", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const flexContainer = container.querySelector("span.flex");
    expect(flexContainer).toHaveClass("items-center");
    expect(flexContainer).toHaveClass("justify-between");
  });

  it("title translate-y-1 applied correctly", () => {
    render(<ProjectEntry entry={mockEntry} />);
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveClass("translate-y-1");
  });

  it("renders with special characters in title", () => {
    const specialEntry = {
      ...mockEntry,
      title: "Project & Company #1",
    };
    render(<ProjectEntry entry={specialEntry} />);
    expect(screen.getByText("Project & Company #1")).toBeInTheDocument();
  });

  it("renders with special characters in description", () => {
    const specialEntry = {
      ...mockEntry,
      copy: "Description with special chars: <>&\"'",
    };
    render(<ProjectEntry entry={specialEntry} />);
    expect(
      screen.getByText(/Description with special chars/)
    ).toBeInTheDocument();
  });

  it("maintains spacing between title and icons", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const flexContainer = container.querySelector("span.flex");
    expect(flexContainer).toHaveClass("gap-4");
  });

  it("renders with responsive icon positioning", () => {
    const { container } = render(<ProjectEntry entry={mockEntry} />);
    const flexContainer = container.querySelector("span.flex");
    expect(flexContainer).toHaveClass("justify-between");
    // justify-between ensures icons stay on the right
  });
});
