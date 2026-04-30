import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    handler: <T>(fn: T) => fn,
  }),
}));

const fetchMock = vi.fn();
vi.mock("~/utils/fetch", () => ({
  fetch: (...args: unknown[]) => fetchMock(...args),
}));

vi.mock("../env.server", () => ({
  getEnv: () => ({
    SOFTWARE_PASTEBIN_ID: "test-pastebin-id",
    GOOGLE_DRIVE_API_KEY: "",
    PHOTO_DRIVE_FOLDER_ID: "",
    YOUTUBE_API_KEY: "",
    YOUTUBE_ANALYSIS_PLAYLIST_ID: "",
    YOUTUBE_REVIEWS_PLAYLIST_ID: "",
    VIDEOGRAPHY_PLAYLIST_ID: "",
  }),
}));

import { getSoftwarePageData } from "../software.function";

describe("getSoftwarePageData", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("calls the pastebin URL using the configured ID", async () => {
    fetchMock.mockResolvedValue("");
    await getSoftwarePageData();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://pastebin.com/raw/test-pastebin-id",
      { type: "text" },
    );
  });

  it("returns empty jobs and projects when input is empty", async () => {
    fetchMock.mockResolvedValue("");
    const result = await getSoftwarePageData();
    expect(result).toEqual({ jobs: [], projects: [] });
  });

  it("parses a project entry with title, icons, link and copy", async () => {
    fetchMock.mockResolvedValue(
      [
        "#My Project",
        "/icons| react,typescript",
        "/link| [my-project.example](https://my-project.example)",
        "A short description of the project.",
      ].join("\n"),
    );

    const { projects, jobs } = await getSoftwarePageData();

    expect(jobs).toEqual([]);
    expect(projects).toHaveLength(1);
    expect(projects[0]).toMatchObject({
      title: "My Project",
      icons: "react,typescript",
      link: {
        text: "my-project.example",
        href: "https://my-project.example",
      },
      copy: "A short description of the project.\n",
    });
    expect(projects[0]).not.toHaveProperty("logo");
  });

  it("classifies an entry as a job when /work is present", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Acme Corp",
        "/icons| react",
        "/work| Senior Engineer",
        "/link| [acme.example](https://acme.example)",
        "Built lots of things.",
      ].join("\n"),
    );

    const { projects, jobs } = await getSoftwarePageData();

    expect(projects).toEqual([]);
    expect(jobs).toHaveLength(1);
    expect(jobs[0]).toMatchObject({
      title: "Acme Corp",
      work: "Senior Engineer",
      icons: "react",
      link: { text: "acme.example", href: "https://acme.example" },
      copy: "Built lots of things.\n",
    });
  });

  it("attaches a logo when /logo is present", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Branded Co",
        "/logo| https://example.com/logo.png",
        "/work| Engineer",
        "/icons| react",
        "/link| [a](b)",
      ].join("\n"),
    );

    const { jobs } = await getSoftwarePageData();
    expect(jobs[0]?.logo).toBe("https://example.com/logo.png");
  });

  it("concatenates multi-line copy with newlines", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Multi-line",
        "/icons| typescript",
        "/link| [example](https://example.com)",
        "Line one of the description.",
        "Line two of the description.",
        "Line three.",
      ].join("\n"),
    );

    const { projects } = await getSoftwarePageData();
    expect(projects[0]?.copy).toBe(
      "Line one of the description.\nLine two of the description.\nLine three.\n",
    );
  });

  it("ignores blank lines (does not add them to copy)", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Spaced Out",
        "/icons| go",
        "/link| [g](g)",
        "Line one.",
        "",
        "Line two.",
      ].join("\n"),
    );

    const { projects } = await getSoftwarePageData();
    expect(projects[0]?.copy).toBe("Line one.\nLine two.\n");
  });

  it("trims whitespace from /-prefixed values", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Trim Test",
        "/icons|    react,typescript   ",
        "/work|   Engineer  ",
        "/logo|   logo.png   ",
        "/link| [a](b)",
      ].join("\n"),
    );

    const { jobs } = await getSoftwarePageData();
    expect(jobs[0]?.icons).toBe("react,typescript");
    expect(jobs[0]?.work).toBe("Engineer");
    expect(jobs[0]?.logo).toBe("logo.png");
  });

  it("handles a malformed link by returning empty strings", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Bad Link",
        "/icons| react",
        "/link| no-brackets-here",
      ].join("\n"),
    );

    const { projects } = await getSoftwarePageData();
    expect(projects[0]?.link).toEqual({ text: "", href: "" });
  });

  it("parses multiple entries and groups them into jobs and projects", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Project A",
        "/icons| react",
        "/link| [a](a)",
        "Project A copy.",
        "#Job A",
        "/icons| go",
        "/work| Backend",
        "/link| [j](j)",
        "Job A copy.",
        "#Project B",
        "/icons| typescript",
        "/link| [b](b)",
        "Project B copy.",
      ].join("\n"),
    );

    const { jobs, projects } = await getSoftwarePageData();

    expect(jobs.map((e) => e.title)).toEqual(["Job A"]);
    expect(projects.map((e) => e.title)).toEqual(["Project A", "Project B"]);
  });

  it("does nothing for unrecognised /-prefixed keys", async () => {
    fetchMock.mockResolvedValue(
      [
        "#Unknown Key",
        "/icons| react",
        "/unknown| should-be-ignored",
        "/link| [a](b)",
        "Some copy.",
      ].join("\n"),
    );

    const { projects } = await getSoftwarePageData();
    expect(projects[0]).toMatchObject({
      title: "Unknown Key",
      icons: "react",
      copy: "Some copy.\n",
    });
    expect(projects[0]).not.toHaveProperty("unknown");
  });

  it("preserves entry order within jobs and projects (filter is stable)", async () => {
    fetchMock.mockResolvedValue(
      [
        "#J1",
        "/work| W",
        "/icons| i",
        "/link| [t](h)",
        "#P1",
        "/icons| i",
        "/link| [t](h)",
        "#J2",
        "/work| W",
        "/icons| i",
        "/link| [t](h)",
        "#P2",
        "/icons| i",
        "/link| [t](h)",
      ].join("\n"),
    );

    const { jobs, projects } = await getSoftwarePageData();
    expect(jobs.map((j) => j.title)).toEqual(["J1", "J2"]);
    expect(projects.map((p) => p.title)).toEqual(["P1", "P2"]);
  });
});
