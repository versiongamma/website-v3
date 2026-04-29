import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { GalleryPhoto } from "../photo/GalleryPhoto";

describe("GalleryPhoto", () => {
  it("renders an img element with src", () => {
    render(<GalleryPhoto src="test-image.jpg" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "test-image.jpg");
  });

  it("renders with aria-label gallery photo", () => {
    render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByLabelText("gallery photo");
    expect(img).toBeInTheDocument();
  });

  it("renders skeleton while image is loading", () => {
    const { container } = render(<GalleryPhoto src="test.jpg" />);
    const skeleton = container.querySelector('[role="status"]');
    expect(skeleton).toBeInTheDocument();
  });

  it("applies opacity-0 to image while loading", () => {
    render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveClass("opacity-0");
  });

  it("hides skeleton when image loads", async () => {
    const { container } = render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByRole("img", { hidden: true }) as HTMLImageElement;

    img.dispatchEvent(new Event("load"));

    await waitFor(() => {
      const skeleton = container.querySelector('[role="status"]');
      expect(skeleton).not.toBeInTheDocument();
    });
  });

  it("changes opacity to opacity-100 when image loads", async () => {
    render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByRole("img", { hidden: true }) as HTMLImageElement;

    expect(img).toHaveClass("opacity-0");

    img.dispatchEvent(new Event("load"));

    await waitFor(() => {
      expect(img).toHaveClass("opacity-100");
      expect(img).not.toHaveClass("opacity-0");
    });
  });

  it("applies custom className to image", () => {
    render(<GalleryPhoto src="test.jpg" className="custom-photo-class" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveClass("custom-photo-class");
  });

  it("applies default transition classes", () => {
    render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveClass("transition-opacity");
    expect(img).toHaveClass("duration-300");
  });

  it("combines custom className with default classes", () => {
    render(<GalleryPhoto src="test.jpg" className="custom-1 custom-2" />);
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveClass("custom-1");
    expect(img).toHaveClass("custom-2");
    expect(img).toHaveClass("transition-opacity");
    expect(img).toHaveClass("duration-300");
  });

  it("applies absolute inset-0 to skeleton", () => {
    const { container } = render(<GalleryPhoto src="test.jpg" />);
    const skeleton = container.querySelector('[role="status"]');
    expect(skeleton).toHaveClass("absolute");
    expect(skeleton).toHaveClass("inset-0");
  });

  it("forwards additional HTML img attributes", () => {
    render(
      <GalleryPhoto
        src="test.jpg"
        alt="Gallery image"
        loading="lazy"
        decoding="async"
      />
    );
    const img = screen.getByRole("img", { hidden: true });
    expect(img).toHaveAttribute("alt", "Gallery image");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("handles multiple images independently", () => {
    const { container } = render(
      <>
        <GalleryPhoto src="image1.jpg" />
        <GalleryPhoto src="image2.jpg" />
      </>
    );
    const images = screen.getAllByRole("img", { hidden: true });
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "image1.jpg");
    expect(images[1]).toHaveAttribute("src", "image2.jpg");
  });

  it("preserves loaded state when className changes", async () => {
    const { rerender } = render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByRole("img", { hidden: true }) as HTMLImageElement;

    img.dispatchEvent(new Event("load"));

    await waitFor(() => {
      expect(img).toHaveClass("opacity-100");
    });

    rerender(<GalleryPhoto src="test.jpg" className="extra-class" />);

    expect(img).toHaveClass("opacity-100");
    expect(img).toHaveClass("extra-class");
  });

  it("applies opacity-100 after onLoad fires", async () => {
    render(<GalleryPhoto src="test.jpg" />);
    const img = screen.getByRole("img", { hidden: true }) as HTMLImageElement;

    img.dispatchEvent(new Event("load"));

    await waitFor(() => {
      expect(img).toHaveClass("opacity-100");
    });
  });

  it("handles different image formats", () => {
    const formats = ["image.jpg", "image.png", "image.webp", "image.svg"];
    formats.forEach((src) => {
      const { unmount } = render(<GalleryPhoto src={src} />);
      const img = screen.getByRole("img", { hidden: true });
      expect(img).toHaveAttribute("src", src);
      unmount();
    });
  });

  it("skeleton uses Skeleton component with status role", () => {
    const { container } = render(<GalleryPhoto src="test.jpg" />);
    const skeleton = container.querySelector('[role="status"]');
    expect(skeleton?.tagName).toBe("DIV");
  });

  it("starts in loading state", () => {
    const { container } = render(<GalleryPhoto src="test.jpg" />);
    const skeleton = container.querySelector('[role="status"]');
    const img = screen.getByRole("img", { hidden: true });

    expect(skeleton).toBeInTheDocument();
    expect(img).toHaveClass("opacity-0");
  });
});
