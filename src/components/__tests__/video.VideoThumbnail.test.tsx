import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { VideoThumbnail } from "../video/VideoThumbnail";

// Mock the useWaitForImgLoad hook
vi.mock("~/hooks/useWaitForImgLoad", () => ({
  default: vi.fn((img: string) => true),
}));

// Mock the Skeleton component
vi.mock("../Skeleton", () => ({
  default: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="skeleton" className={className}>
      {children}
    </div>
  ),
}));

import useWaitForImgLoad from "~/hooks/useWaitForImgLoad";

describe("VideoThumbnail", () => {
  const mockProps = {
    id: "dQw4w9WgXcQ",
    title: "Test Video Title",
    img: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    publishedDate: new Date("2024-01-15"),
  };

  it("renders as an anchor element", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  it("renders link to YouTube video", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://youtu.be/dQw4w9WgXcQ");
  });

  it("opens link in new tab", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("has noreferrer rel attribute for security", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("renders thumbnail image when loaded", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(true);
    render(<VideoThumbnail {...mockProps} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProps.img);
  });

  it("applies aria-label to image", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(true);
    render(<VideoThumbnail {...mockProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("aria-label", "thumbnail for Test Video Title");
  });

  it("renders skeleton while image is loading", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(false);
    render(<VideoThumbnail {...mockProps} />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("does not show image when still loading", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(false);
    render(<VideoThumbnail {...mockProps} />);
    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });

  it("renders video title", () => {
    render(<VideoThumbnail {...mockProps} />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent("Test Video Title");
  });

  it("applies styling classes to title", () => {
    render(<VideoThumbnail {...mockProps} />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("font-heading");
    expect(title).toHaveClass("font-semibold");
    expect(title).toHaveClass("text-sm");
    expect(title).toHaveClass("xl:text-lg");
    expect(title).toHaveClass("text-white");
  });

  it("renders published date", () => {
    render(<VideoThumbnail {...mockProps} />);
    expect(
      screen.getByText(mockProps.publishedDate.toLocaleDateString()),
    ).toBeInTheDocument();
  });

  it("formats date according to locale", () => {
    const testDate = new Date("2023-12-25");
    render(<VideoThumbnail {...mockProps} publishedDate={testDate} />);
    const dateString = testDate.toLocaleDateString();
    expect(screen.getByText(dateString)).toBeInTheDocument();
  });

  it("applies default styling classes to link", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("flex");
    expect(link).toHaveClass("flex-col");
    expect(link).toHaveClass("rounded-xl");
    expect(link).toHaveClass("transition-opacity");
  });

  it("applies responsive padding classes", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("p-4");
    expect(link).toHaveClass("md:p-0");
  });

  it("applies responsive width classes", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("w-[320px]");
    expect(link).toHaveClass("xl:w-120");
  });

  it("applies background color classes", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("bg-[#171717]/60");
    expect(link).toHaveClass("md:bg-transparent");
  });

  it("applies hover opacity effect", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("hover:opacity-80");
  });

  it("applies custom style prop", () => {
    const customStyle = { opacity: 0.5 };
    render(<VideoThumbnail {...mockProps} style={customStyle} />);
    const link = screen.getByRole("link");
    expect(link).toHaveStyle(customStyle);
  });

  it("renders with different video IDs", () => {
    const { rerender } = render(<VideoThumbnail {...mockProps} />);
    let link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://youtu.be/dQw4w9WgXcQ");

    rerender(
      <VideoThumbnail
        {...mockProps}
        id="abc123XYZ"
      />
    );
    link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://youtu.be/abc123XYZ");
  });

  it("renders with different titles", () => {
    const { rerender } = render(<VideoThumbnail {...mockProps} />);
    expect(screen.getByText("Test Video Title")).toBeInTheDocument();

    rerender(
      <VideoThumbnail
        {...mockProps}
        title="Another Video Title"
      />
    );
    expect(screen.getByText("Another Video Title")).toBeInTheDocument();
  });

  it("renders with different image URLs", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(true);
    const { rerender } = render(<VideoThumbnail {...mockProps} />);
    let img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockProps.img);

    const newImg = "https://i.ytimg.com/vi/abc123/maxresdefault.jpg";
    rerender(
      <VideoThumbnail
        {...mockProps}
        img={newImg}
      />
    );
    img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", newImg);
  });

  it("applies image rounded styling", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(true);
    render(<VideoThumbnail {...mockProps} />);
    const img = screen.getByRole("img");
    expect(img).toHaveClass("rounded-xl");
  });

  it("applies date text styling", () => {
    const { container } = render(<VideoThumbnail {...mockProps} />);
    const dateP = container.querySelector("p");
    expect(dateP).toHaveClass("text-white");
    expect(dateP).toHaveClass("text-xs");
    expect(dateP).toHaveClass("md:text-sm");
    expect(dateP).toHaveClass("xl:text-md");
  });

  it("applies responsive date alignment", () => {
    const { container } = render(<VideoThumbnail {...mockProps} />);
    const dateDiv = container.querySelector("div.flex");
    expect(dateDiv).toHaveClass("items-end");
    expect(dateDiv).toHaveClass("grow");
    expect(dateDiv).toHaveClass("justify-end");
    expect(dateDiv).toHaveClass("md:justify-start");
    expect(dateDiv).toHaveClass("md:grow-0");
  });

  it("renders title with top margin", () => {
    render(<VideoThumbnail {...mockProps} />);
    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("mt-1");
  });

  it("passes correct img URL to useWaitForImgLoad hook", () => {
    render(<VideoThumbnail {...mockProps} />);
    expect(useWaitForImgLoad).toHaveBeenCalledWith(mockProps.img);
  });

  it("renders with long video titles", () => {
    const longTitle = "This is a very long video title that should wrap to multiple lines and still display correctly";
    render(<VideoThumbnail {...mockProps} title={longTitle} />);
    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it("renders with different date formats", () => {
    const dates = [
      new Date("2024-01-01"),
      new Date("2024-12-31"),
      new Date("2023-06-15"),
    ];
    dates.forEach((date) => {
      const { unmount } = render(
        <VideoThumbnail {...mockProps} publishedDate={date} />
      );
      expect(screen.getByText(date.toLocaleDateString())).toBeInTheDocument();
      unmount();
    });
  });

  it("renders with shrink-0 to prevent flexbox shrinking", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("shrink-0");
  });

  it("renders with h-full for full height", () => {
    render(<VideoThumbnail {...mockProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveClass("h-full");
  });

  it("renders skeleton with video recording icon when loading", () => {
    vi.mocked(useWaitForImgLoad).mockReturnValue(false);
    const { container } = render(<VideoThumbnail {...mockProps} />);
    const skeleton = screen.getByTestId("skeleton");
    const icon = skeleton.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("handles missing style prop", () => {
    const { id, title, img, publishedDate } = mockProps;
    render(
      <VideoThumbnail
        id={id}
        title={title}
        img={img}
        publishedDate={publishedDate}
      />
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).not.toHaveAttribute("style", "");
  });
});
