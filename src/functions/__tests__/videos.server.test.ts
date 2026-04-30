import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerOnlyFn: <T>(fn: T) => fn,
}));

const fetchMock = vi.fn();
vi.mock("~/utils/fetch", () => ({
  fetch: (...args: unknown[]) => fetchMock(...args),
}));

vi.mock("../env.server", () => ({
  getEnv: () => ({
    YOUTUBE_API_KEY: "yt-key",
    YOUTUBE_ANALYSIS_PLAYLIST_ID: "analysis-id",
    YOUTUBE_REVIEWS_PLAYLIST_ID: "reviews-id",
    VIDEOGRAPHY_PLAYLIST_ID: "videography-id",
    GOOGLE_DRIVE_API_KEY: "",
    PHOTO_DRIVE_FOLDER_ID: "",
    SOFTWARE_PASTEBIN_ID: "",
  }),
}));

import { fetchVideographyVideos, fetchYoutubeVideos } from "../videos.server";

const PLAYLIST_URL =
  "https://youtube.googleapis.com/youtube/v3/playlistItems";

const makeItem = (id: string, publishedAt: string) => ({
  id,
  snippet: { publishedAt, title: id },
});

describe("fetchYoutubeVideos", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("requests both the analysis and reviews playlists", async () => {
    fetchMock.mockResolvedValue({ items: [] });
    await fetchYoutubeVideos();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const playlistIds = fetchMock.mock.calls.map(
      (call) => (call[1].params as URLSearchParams).get("playlistId"),
    );
    expect(playlistIds).toContain("analysis-id");
    expect(playlistIds).toContain("reviews-id");
  });

  it("sends the API key, snippet part, and maxResults=50", async () => {
    fetchMock.mockResolvedValue({ items: [] });
    await fetchYoutubeVideos();

    const params = fetchMock.mock.calls[0]![1].params as URLSearchParams;
    expect(params.get("key")).toBe("yt-key");
    expect(params.get("part")).toBe("snippet");
    expect(params.get("maxResults")).toBe("50");
  });

  it("calls the playlistItems endpoint", async () => {
    fetchMock.mockResolvedValue({ items: [] });
    await fetchYoutubeVideos();

    expect(fetchMock.mock.calls[0]![0]).toBe(PLAYLIST_URL);
  });

  it("merges items from both playlists and sorts by publishedAt desc", async () => {
    fetchMock.mockResolvedValueOnce({
      items: [
        makeItem("a-old", "2023-01-01T00:00:00Z"),
        makeItem("a-new", "2024-06-01T00:00:00Z"),
      ],
    });
    fetchMock.mockResolvedValueOnce({
      items: [
        makeItem("r-mid", "2024-01-01T00:00:00Z"),
        makeItem("r-newest", "2024-12-01T00:00:00Z"),
      ],
    });

    const result = await fetchYoutubeVideos();
    expect(result.map((item) => item.id)).toEqual([
      "r-newest",
      "a-new",
      "r-mid",
      "a-old",
    ]);
  });

  it("treats a missing items field as an empty list", async () => {
    fetchMock.mockResolvedValueOnce({});
    fetchMock.mockResolvedValueOnce({ items: [makeItem("only", "2024-01-01")] });

    const result = await fetchYoutubeVideos();
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("only");
  });

  it("returns an empty array when both playlists are empty", async () => {
    fetchMock.mockResolvedValue({ items: [] });
    const result = await fetchYoutubeVideos();
    expect(result).toEqual([]);
  });
});

describe("fetchVideographyVideos", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("calls the videography playlist exactly once", async () => {
    fetchMock.mockResolvedValue({ items: [] });
    await fetchVideographyVideos();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const params = fetchMock.mock.calls[0]![1].params as URLSearchParams;
    expect(params.get("playlistId")).toBe("videography-id");
  });

  it("returns the items array from the response", async () => {
    const items = [
      makeItem("v-1", "2024-01-01"),
      makeItem("v-2", "2024-02-01"),
    ];
    fetchMock.mockResolvedValue({ items });

    const result = await fetchVideographyVideos();
    expect(result).toEqual(items);
  });

  it("returns an empty array when items is missing", async () => {
    fetchMock.mockResolvedValue({});
    const result = await fetchVideographyVideos();
    expect(result).toEqual([]);
  });

  it("does not sort the videography items", async () => {
    // fetchVideographyVideos passes through whatever order the API returns.
    const items = [
      makeItem("first", "2020-01-01"),
      makeItem("second", "2024-01-01"),
      makeItem("third", "2022-01-01"),
    ];
    fetchMock.mockResolvedValue({ items });

    const result = await fetchVideographyVideos();
    expect(result.map((i) => i.id)).toEqual(["first", "second", "third"]);
  });
});
