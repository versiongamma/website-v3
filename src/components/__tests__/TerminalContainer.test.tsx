import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TerminalContainer } from "../TerminalContainer";

describe("TerminalContainer", () => {
  it("renders the component with tab role", () => {
    render(<TerminalContainer header="Header" content="Content" />);
    const container = screen.getByRole("tab");
    expect(container).toBeInTheDocument();
  });

  it("renders header and content sections", () => {
    render(<TerminalContainer header="Test Header" content="Test Content" />);
    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders header in a separate div with light background", () => {
    render(
      <TerminalContainer
        header={<h2>Header Text</h2>}
        content={<p>Content Text</p>}
      />
    );
    const header = screen.getByText("Header Text").closest("div");
    expect(header).toHaveClass("bg-[#D8D8D8]");
  });

  it("renders content in a separate div with flex column layout", () => {
    render(
      <TerminalContainer
        header={<h2>Header</h2>}
        content={<p>Content Text</p>}
      />
    );
    const content = screen.getByText("Content Text").closest("div");
    expect(content).toHaveClass("flex");
    expect(content).toHaveClass("flex-col");
    expect(content).toHaveClass("justify-between");
  });

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <TerminalContainer
        header="Header"
        content="Content"
        onClick={handleClick}
      />
    );
    const container = screen.getByRole("tab");
    await userEvent.click(container);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("calls onKeyDown handler when key is pressed", async () => {
    const handleClick = vi.fn();
    render(
      <TerminalContainer
        header="Header"
        content="Content"
        onClick={handleClick}
      />
    );
    const container = screen.getByRole("tab");
    await userEvent.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies custom container class", () => {
    render(
      <TerminalContainer
        header="Header"
        content="Content"
        classes={{ container: "custom-container" }}
      />
    );
    const container = screen.getByRole("tab");
    expect(container).toHaveClass("custom-container");
  });

  it("applies custom header class", () => {
    render(
      <TerminalContainer
        header={<h2>Header</h2>}
        content="Content"
        classes={{ header: "custom-header" }}
      />
    );
    const header = screen.getByText("Header").closest("div");
    expect(header).toHaveClass("custom-header");
  });

  it("applies custom content class", () => {
    render(
      <TerminalContainer
        header="Header"
        content={<p>Content</p>}
        classes={{ content: "custom-content" }}
      />
    );
    const content = screen.getByText("Content").closest("div");
    expect(content).toHaveClass("custom-content");
  });

  it("applies multiple custom classes together", () => {
    render(
      <TerminalContainer
        header="Header"
        content="Content"
        classes={{
          container: "custom-container",
          header: "custom-header",
          content: "custom-content",
        }}
      />
    );
    const container = screen.getByRole("tab");
    const header = screen.getByText("Header").closest("div");
    const content = screen.getByText("Content").closest("div");

    expect(container).toHaveClass("custom-container");
    expect(header).toHaveClass("custom-header");
    expect(content).toHaveClass("custom-content");
  });

  it("applies default styling classes to container", () => {
    render(<TerminalContainer header="Header" content="Content" />);
    const container = screen.getByRole("tab");
    expect(container).toHaveClass("md:bg-[#171717]/60");
    expect(container).toHaveClass("md:rounded-3xl");
  });

  it("applies default styling classes to header", () => {
    render(
      <TerminalContainer header={<h2>Header</h2>} content="Content" />
    );
    const header = screen.getByText("Header").closest("div");
    expect(header).toHaveClass("w-full");
    expect(header).toHaveClass("drop-shadow");
  });

  it("has tabIndex of 0", () => {
    render(<TerminalContainer header="Header" content="Content" />);
    const container = screen.getByRole("tab");
    expect(container).toHaveAttribute("tabindex", "0");
  });

  it("renders with React.ReactNode children types", () => {
    const HeaderComponent = () => <div>Header Component</div>;
    const ContentComponent = () => <div>Content Component</div>;

    render(
      <TerminalContainer
        header={<HeaderComponent />}
        content={<ContentComponent />}
      />
    );

    expect(screen.getByText("Header Component")).toBeInTheDocument();
    expect(screen.getByText("Content Component")).toBeInTheDocument();
  });

  it("does not call onClick if not provided", () => {
    render(<TerminalContainer header="Header" content="Content" />);
    const container = screen.getByRole("tab");
    expect(() => container.click()).not.toThrow();
  });

  it("combines default classes with custom classes in container", () => {
    render(
      <TerminalContainer
        header="Header"
        content="Content"
        classes={{ container: "my-custom-class" }}
      />
    );
    const container = screen.getByRole("tab");
    expect(container).toHaveClass("md:bg-[#171717]/60");
    expect(container).toHaveClass("my-custom-class");
  });

  it("combines default classes with custom classes in header", () => {
    render(
      <TerminalContainer
        header={<h2>Header</h2>}
        content="Content"
        classes={{ header: "my-header-class" }}
      />
    );
    const header = screen.getByText("Header").closest("div");
    expect(header).toHaveClass("bg-[#D8D8D8]");
    expect(header).toHaveClass("my-header-class");
  });
});
