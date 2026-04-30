import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfoModal } from "../InfoModal";

// Mock the photos function module
vi.mock("~/functions/photos.function", () => ({
  setHidePhotoModal: vi.fn(),
  clearHidePhotoModal: vi.fn(),
}));

// Mock en.json
vi.mock("~/en.json", () => ({
  default: {
    photos: {
      heading: "Test Heading",
      description: ["Description 1", "Description 2", "Description 3"],
    },
  },
}));

// Mock TerminalContainer
vi.mock("../../TerminalContainer", () => ({
  TerminalContainer: ({
    header,
    content,
    classes,
  }: {
    header: React.ReactNode;
    content: React.ReactNode;
    classes?: { container?: string; header?: string; content?: string };
  }) => (
    <div
      className={classes?.container}
      data-testid="terminal-container"
      style={{ display: classes?.container?.includes("invisible") ? "none" : "block" }}
    >
      <div className={classes?.header} data-testid="modal-header">
        {header}
      </div>
      <div className={classes?.content} data-testid="modal-content">
        {content}
      </div>
    </div>
  ),
}));

import { setHidePhotoModal, clearHidePhotoModal } from "~/functions/photos.function";

describe("InfoModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the floating action button", () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });
    expect(fabButton).toBeInTheDocument();
  });

  it("renders FAB with info icon", () => {
    const { container } = render(<InfoModal />);
    const fabButton = container.querySelector("button[type='button']");
    expect(fabButton?.querySelector("svg")).toBeInTheDocument();
  });

  it("applies FAB styling classes", () => {
    const { container } = render(<InfoModal />);
    const fabButton = container.querySelector("button[type='button']");
    expect(fabButton).toHaveClass("fixed");
    expect(fabButton).toHaveClass("bottom-2");
    expect(fabButton).toHaveClass("right-2");
    expect(fabButton).toHaveClass("bg-black/40");
    expect(fabButton).toHaveClass("rounded-full");
  });

  it("starts with modal closed by default", async () => {
    render(<InfoModal />);
    const modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: none");
  });

  it("opens modal when FAB is clicked", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);

    const modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: block");
  });

  it("calls clearHidePhotoModal when opening modal", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);

    expect(clearHidePhotoModal).toHaveBeenCalledOnce();
  });

  it("renders modal header with heading text", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("renders close button in modal header", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(1);
  });

  it("closes modal when close button is clicked", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    // Open modal
    await userEvent.click(fabButton);
    let modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: block");

    // Close modal
    const buttons = screen.getAllByRole("button");
    const closeButton = buttons[buttons.length - 1];
    await userEvent.click(closeButton);

    modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: none");
  });

  it("calls setHidePhotoModal when closing modal", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);

    const buttons = screen.getAllByRole("button");
    const closeButton = buttons[buttons.length - 1];
    await userEvent.click(closeButton);

    expect(setHidePhotoModal).toHaveBeenCalledOnce();
  });

  it("renders modal content with descriptions", async () => {
    render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);

    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("Description 3")).toBeInTheDocument();
  });

  it("initializes with open state when initialState is true", () => {
    render(<InfoModal initialState={true} />);
    const modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: block");
  });

  it("calls clearHidePhotoModal on mount when initialState is true", () => {
    render(<InfoModal initialState={true} />);
    expect(clearHidePhotoModal).toHaveBeenCalled();
  });

  it("renders overlay when modal is open", async () => {
    const { container } = render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    // Modal is closed, no overlay
    let overlay = container.querySelector(".fixed.w-screen.h-screen");
    expect(overlay).not.toBeInTheDocument();

    // Open modal
    await userEvent.click(fabButton);

    overlay = container.querySelector(".fixed.w-screen.h-screen");
    expect(overlay).toBeInTheDocument();
  });

  it("removes overlay when modal is closed", async () => {
    const { container } = render(<InfoModal initialState={true} />);

    // Overlay should exist
    let overlay = container.querySelector(".fixed.w-screen.h-screen");
    expect(overlay).toBeInTheDocument();

    // Close modal
    const buttons = screen.getAllByRole("button");
    const closeButton = buttons[buttons.length - 1];
    await userEvent.click(closeButton);

    overlay = container.querySelector(".fixed.w-screen.h-screen");
    expect(overlay).not.toBeInTheDocument();
  });

  it("applies correct classes to modal overlay", async () => {
    const { container } = render(<InfoModal initialState={true} />);

    const overlay = container.querySelector(".fixed.w-screen.h-screen");
    expect(overlay).toHaveClass("top-0");
    expect(overlay).toHaveClass("left-0");
    expect(overlay).toHaveClass("bg-black/60");
    expect(overlay).toHaveClass("backdrop-blur-xs");
  });

  it("modal header contains correct styling", async () => {
    render(<InfoModal initialState={true} />);

    const header = screen.getByTestId("modal-header");
    expect(header).toBeInTheDocument();
    const headerInner = header.firstChild as HTMLElement;
    expect(headerInner).toHaveClass("flex");
    expect(headerInner).toHaveClass("w-full");
    expect(headerInner).toHaveClass("justify-between");
  });

  it("modal content is properly structured", async () => {
    render(<InfoModal initialState={true} />);

    const content = screen.getByTestId("modal-content");
    expect(content).toBeInTheDocument();
    const contentInner = content.firstChild as HTMLElement;
    expect(contentInner).toHaveClass("flex");
    expect(contentInner).toHaveClass("flex-col");
  });

  it("multiple instances work independently", async () => {
    const { unmount } = render(<InfoModal />);
    const fabButton = screen.getByRole("button", { name: /info/i });

    await userEvent.click(fabButton);
    let modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: block");

    unmount();
    render(<InfoModal initialState={false} />);
    modal = screen.getByTestId("terminal-container");
    expect(modal).toHaveStyle("display: none");
  });

  it("closes modal only once when close button clicked", async () => {
    render(<InfoModal initialState={true} />);

    const buttons = screen.getAllByRole("button");
    const closeButton = buttons[buttons.length - 1];
    await userEvent.click(closeButton);

    expect(setHidePhotoModal).toHaveBeenCalledTimes(1);
  });

  it("FAB is always visible regardless of modal state", async () => {
    const { container } = render(<InfoModal />);
    const fabButton = container.querySelector("button[type='button']");

    expect(fabButton).toHaveClass("fixed");
    expect(fabButton).not.toHaveClass("invisible");
    expect(fabButton).not.toHaveClass("hidden");
  });
});
