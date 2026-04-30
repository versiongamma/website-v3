import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    handler: <T>(fn: T) => fn,
  }),
}));

const fetchYoutubeVideos = vi.fn();
const fetchVideographyVideos = vi.fn();
vi.mock("../videos.server", () => ({
  fetchYoutubeVideos: () => fetchYoutubeVideos(),
  fetchVideographyVideos: () => fetchVideographyVideos(),
}));

import { loadVideos } from "../videos.function";

describe("loadVideos", () => {
  beforeEach(() => {
    fetchYoutubeVideos.mockReset();
    fetchVideographyVideos.mockReset();
  });

  it("returns the YouTube and videography videos in a tagged shape", async () => {
    fetchYoutubeVideos.mockResolvedValue([{ id: "yt-1" }]);
    fetchVideographyVideos.mockResolvedValue([{ id: "v-1" }]);

    const result = await loadVideos();
    expect(result).toEqual({
      ytVideos: [{ id: "yt-1" }],
      videographyVideos: [{ id: "v-1" }],
    });
  });

  it("calls both fetchers exactly once", async () => {
    fetchYoutubeVideos.mockResolvedValue([]);
    fetchVideographyVideos.mockResolvedValue([]);

    await loadVideos();
    expect(fetchYoutubeVideos).toHaveBeenCalledTimes(1);
    expect(fetchVideographyVideos).toHaveBeenCalledTimes(1);
  });

  it("issues both fetches concurrently (Promise.all)", async () => {
    let ytResolve: (v: unknown[]) => void = () => {};
    let vResolve: (v: unknown[]) => void = () => {};
    fetchYoutubeVideos.mockReturnValue(
      new Promise((res) => {
        ytResolve = res;
      }),
    );
    fetchVideographyVideos.mockReturnValue(
      new Promise((res) => {
        vResolve = res;
      }),
    );

    const pending = loadVideos();

    // Both fetchers should have been called before either resolves.
    expect(fetchYoutubeVideos).toHaveBeenCalled();
    expect(fetchVideographyVideos).toHaveBeenCalled();

    vResolve([{ id: "v-1" }]);
    ytResolve([{ id: "yt-1" }]);

    const result = await pending;
    expect(result.ytVideos).toEqual([{ id: "yt-1" }]);
    expect(result.videographyVideos).toEqual([{ id: "v-1" }]);
  });

  it("propagates errors when one of the fetchers rejects", async () => {
    fetchYoutubeVideos.mockRejectedValue(new Error("yt boom"));
    fetchVideographyVideos.mockResolvedValue([]);

    await expect(loadVideos()).rejects.toThrow("yt boom");
  });

  it("returns empty arrays when both fetchers return empty", async () => {
    fetchYoutubeVideos.mockResolvedValue([]);
    fetchVideographyVideos.mockResolvedValue([]);

    const result = await loadVideos();
    expect(result).toEqual({ ytVideos: [], videographyVideos: [] });
  });
});
