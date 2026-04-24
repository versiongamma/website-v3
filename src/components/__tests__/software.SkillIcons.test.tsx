import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillIcons } from "../software/SkillIcons";

describe("SkillIcons", () => {
  it("renders an img element", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("sets correct src attribute with single icon", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://skillicons.dev/icons?i=react"
    );
  });

  it("sets correct src attribute with multiple icons", () => {
    render(<SkillIcons icons="react,typescript,tailwind" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://skillicons.dev/icons?i=react,typescript,tailwind"
    );
  });

  it("sets alt attribute equal to icons prop", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "react");
  });

  it("applies default height class", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img).toHaveClass("h-8");
  });

  it("applies responsive height class", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img).toHaveClass("md:h-10");
  });

  it("applies both height classes", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img).toHaveClass("h-8");
    expect(img).toHaveClass("md:h-10");
  });

  it("handles comma-separated icon list", () => {
    render(<SkillIcons icons="react,vue,svelte" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://skillicons.dev/icons?i=react,vue,svelte"
    );
  });

  it("handles single icon name", () => {
    render(<SkillIcons icons="javascript" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://skillicons.dev/icons?i=javascript"
    );
  });

  it("generates correct skillicons.dev URL", () => {
    const iconString = "nodejs,python,go";
    render(<SkillIcons icons={iconString} />);
    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toMatch(/https:\/\/skillicons\.dev\/icons/);
    expect(img.getAttribute("src")).toContain(iconString);
  });

  it("renders with img tag", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img");
    expect(img.tagName).toBe("IMG");
  });

  it("handles icon string with spaces", () => {
    render(<SkillIcons icons="react, typescript, tailwind" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      "https://skillicons.dev/icons?i=react, typescript, tailwind"
    );
  });

  it("alt attribute matches icons prop exactly", () => {
    const iconString = "python,rust,go";
    render(<SkillIcons icons={iconString} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", iconString);
  });

  it("renders with multiple icons from different frameworks", () => {
    render(
      <SkillIcons icons="react,django,postgresql,docker" />
    );
    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toContain("react");
    expect(img.getAttribute("src")).toContain("django");
    expect(img.getAttribute("src")).toContain("postgresql");
    expect(img.getAttribute("src")).toContain("docker");
  });

  it("applies consistent styling to different icon sets", () => {
    const { rerender } = render(<SkillIcons icons="react" />);
    let img = screen.getByRole("img");
    expect(img).toHaveClass("h-8");
    expect(img).toHaveClass("md:h-10");

    rerender(<SkillIcons icons="vue,angular" />);
    img = screen.getByRole("img");
    expect(img).toHaveClass("h-8");
    expect(img).toHaveClass("md:h-10");
  });

  it("handles very long icon string", () => {
    const longIconString =
      "react,vue,angular,svelte,typescript,javascript,python,java,go,rust,cpp,csharp,php,ruby,kotlin";
    render(<SkillIcons icons={longIconString} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", `https://skillicons.dev/icons?i=${longIconString}`);
  });

  it("preserves icon order in URL", () => {
    const orderedIcons = "react,vue,angular";
    render(<SkillIcons icons={orderedIcons} />);
    const img = screen.getByRole("img");
    const src = img.getAttribute("src");
    expect(src).toContain("react");
    expect(src?.indexOf("react") || 0).toBeLessThan(src?.indexOf("vue") || 0);
    expect(src?.indexOf("vue") || 0).toBeLessThan(src?.indexOf("angular") || 0);
  });

  it("renders img without any other attributes", () => {
    render(<SkillIcons icons="react" />);
    const img = screen.getByRole("img") as HTMLImageElement;
    const attributes = Array.from(img.attributes).map((attr) => attr.name);
    expect(attributes).toEqual(
      expect.arrayContaining(["class", "src", "alt"])
    );
  });
});
