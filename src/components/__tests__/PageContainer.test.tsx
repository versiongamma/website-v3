import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageContainer } from "../PageContainer";

// Mock NavBar component
vi.mock("../NavBar", () => ({
  NavBar: ({ path, className }: { path: string; className?: string }) => (
    <div data-testid="navbar" data-path={path} className={className}>
      NavBar
    </div>
  ),
}));

describe("PageContainer", () => {
  it("renders children content", () => {
    render(
      <PageContainer>
        <div>Test Content</div>
      </PageContainer>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with full screen dimensions", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("w-screen");
    expect(outerDiv).toHaveClass("h-screen");
  });

  it("applies background styling classes", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("bg-cover");
    expect(outerDiv).toHaveClass("bg-no-repeat");
  });

  it("applies custom bg prop as className", () => {
    const { container } = render(
      <PageContainer bg="bg-gradient-to-b">
        <div>Content</div>
      </PageContainer>
    );
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("bg-gradient-to-b");
  });

  it("renders NavBar when path prop is provided", () => {
    render(
      <PageContainer path="/video">
        <div>Content</div>
      </PageContainer>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });

  it("does not render NavBar when path prop is not provided", () => {
    render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
  });

  it("passes path prop to NavBar", () => {
    render(
      <PageContainer path="/photo">
        <div>Content</div>
      </PageContainer>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveAttribute("data-path", "/photo");
  });

  it("passes correct className to NavBar", () => {
    render(
      <PageContainer path="/software">
        <div>Content</div>
      </PageContainer>
    );
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveClass("fixed");
    expect(navbar).toHaveClass("top-0");
  });

  it("applies padding top when path is provided", () => {
    const { container } = render(
      <PageContainer path="/video">
        <div>Content</div>
      </PageContainer>
    );
    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    expect(innerDiv).toHaveClass("pt-12");
    expect(innerDiv).toHaveClass("md:pt-16");
  });

  it("does not apply padding top when path is not provided", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    const classList = innerDiv?.className || "";
    expect(classList).not.toMatch(/\bpt-12\b/);
  });

  it("applies custom className prop", () => {
    const { container } = render(
      <PageContainer className="custom-container">
        <div>Content</div>
      </PageContainer>
    );
    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    expect(innerDiv).toHaveClass("custom-container");
  });

  it("applies default layout classes to content container", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    expect(innerDiv).toHaveClass("flex");
    expect(innerDiv).toHaveClass("flex-col");
    expect(innerDiv).toHaveClass("items-center");
    expect(innerDiv).toHaveClass("overflow-y-scroll");
    expect(innerDiv).toHaveClass("w-screen");
    expect(innerDiv).toHaveClass("h-screen");
  });

  it("applies overlay styling to middle div", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const overlayDiv = container.querySelector("div.bg-black\\/30");
    expect(overlayDiv).toHaveClass("w-screen");
    expect(overlayDiv).toHaveClass("h-screen");
  });

  it("renders multiple children", () => {
    render(
      <PageContainer>
        <div>First Child</div>
        <div>Second Child</div>
        <div>Third Child</div>
      </PageContainer>
    );
    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
    expect(screen.getByText("Third Child")).toBeInTheDocument();
  });

  it("renders with all props together", () => {
    const { container } = render(
      <PageContainer
        path="/software"
        bg="bg-blue-500"
        className="extra-class"
      >
        <div>Content</div>
      </PageContainer>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("bg-blue-500");

    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    expect(innerDiv).toHaveClass("extra-class");
    expect(innerDiv).toHaveClass("pt-12");
  });

  it("applies responsive background positioning", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass("md:bg-center");
  });

  it("applies no-scrollbar class for custom scrolling", () => {
    const { container } = render(
      <PageContainer>
        <div>Content</div>
      </PageContainer>
    );
    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    expect(innerDiv).toHaveClass("no-scrollbar");
  });

  it("combines custom className with default classes", () => {
    const { container } = render(
      <PageContainer className="mt-4 mb-2">
        <div>Content</div>
      </PageContainer>
    );
    const innerDiv = container.querySelector(
      "div.flex.flex-col.items-center"
    );
    expect(innerDiv).toHaveClass("flex");
    expect(innerDiv).toHaveClass("mt-4");
    expect(innerDiv).toHaveClass("mb-2");
  });
});
