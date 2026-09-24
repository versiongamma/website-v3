import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PhotoViewerModal } from "../PhotoViewerModal";

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
    <div className={classes?.container} data-testid="terminal-container">
      <div className={classes?.header} data-testid="modal-header">
        {header}
      </div>
      <div className={classes?.content} data-testid="modal-content">
        {content}
      </div>
    </div>
  ),
}));

// Mock GalleryPhoto
vi.mock("../GalleryPhoto", () => ({
  GalleryPhoto: ({
    src,
    className,
    ...rest
  }: {
    src: string;
    className?: string;
  }) => (
    <img src={src} className={className} aria-label="gallery photo" {...rest} />
  ),
}));

const baseProps = {
  src: "https://lh3.googleusercontent.com/d/abc=s1600",
  index: 0,
  total: 3,
  onClose: vi.fn(),
  onPrevious: vi.fn(),
  onNext: vi.fn(),
};

describe("PhotoViewerModal", () => {
  it("renders the selected image with its src", () => {
    render(<PhotoViewerModal {...baseProps} />);
    const img = screen.getByLabelText("gallery photo");
    expect(img).toHaveAttribute(
      "src",
      "https://lh3.googleusercontent.com/d/abc=s1600",
    );
  });

  it("renders the current position out of total", () => {
    render(<PhotoViewerModal {...baseProps} index={2} total={5} />);
    expect(screen.getByText("3 / 5")).toBeInTheDocument();
  });

  it("renders close, previous and next buttons", () => {
    render(<PhotoViewerModal {...baseProps} />);
    expect(
      screen.getByRole("button", { name: /close photo viewer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous photo/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next photo/i }),
    ).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    render(<PhotoViewerModal {...baseProps} />);
    await userEvent.click(
      screen.getByRole("button", { name: /close photo viewer/i }),
    );
    expect(baseProps.onClose).toHaveBeenCalledOnce();
  });

  it("calls onPrevious when the previous button is clicked", async () => {
    render(<PhotoViewerModal {...baseProps} />);
    await userEvent.click(
      screen.getByRole("button", { name: /previous photo/i }),
    );
    expect(baseProps.onPrevious).toHaveBeenCalledOnce();
  });

  it("calls onNext when the next button is clicked", async () => {
    render(<PhotoViewerModal {...baseProps} />);
    await userEvent.click(screen.getByRole("button", { name: /next photo/i }));
    expect(baseProps.onNext).toHaveBeenCalledOnce();
  });

  it("renders overlay with backdrop styling", () => {
    const { container } = render(<PhotoViewerModal {...baseProps} />);
    const overlay = container.querySelector(".fixed.w-screen.h-screen");
    expect(overlay).toHaveClass("top-0");
    expect(overlay).toHaveClass("left-0");
    expect(overlay).toHaveClass("bg-black/60");
    expect(overlay).toHaveClass("backdrop-blur-xs");
  });

  it("enables navigation buttons for multiple photos", () => {
    render(<PhotoViewerModal {...baseProps} total={3} />);
    expect(
      screen.getByRole("button", { name: /previous photo/i }),
    ).not.toBeDisabled();
    expect(
      screen.getByRole("button", { name: /next photo/i }),
    ).not.toBeDisabled();
  });

  it("disables navigation buttons when there is a single photo", () => {
    render(<PhotoViewerModal {...baseProps} total={1} />);
    expect(
      screen.getByRole("button", { name: /previous photo/i }),
    ).toBeDisabled();
    expect(screen.getByRole("button", { name: /next photo/i })).toBeDisabled();
  });

  it("applies fullscreen viewer container classes", () => {
    render(<PhotoViewerModal {...baseProps} />);
    const terminal = screen.getByTestId("terminal-container");
    expect(terminal).toHaveClass("fixed");
    expect(terminal).toHaveClass("left-1/2");
  });

  it("keeps the image mounted with object-contain sizing", () => {
    render(<PhotoViewerModal {...baseProps} />);
    const img = screen.getByLabelText("gallery photo");
    expect(img).toHaveClass("object-contain");
    expect(img).toHaveClass("max-h-[70vh]");
  });
});
