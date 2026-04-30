import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerOnlyFn: <T>(fn: T) => fn,
}));

const fetchMock = vi.fn();
vi.mock("../../utils/fetch", () => ({
  fetch: (...args: unknown[]) => fetchMock(...args),
}));

vi.mock("../env.server", () => ({
  getEnv: () => ({
    GOOGLE_DRIVE_API_KEY: "drive-key",
    PHOTO_DRIVE_FOLDER_ID: "folder-id",
    YOUTUBE_API_KEY: "",
    YOUTUBE_ANALYSIS_PLAYLIST_ID: "",
    YOUTUBE_REVIEWS_PLAYLIST_ID: "",
    VIDEOGRAPHY_PLAYLIST_ID: "",
    SOFTWARE_PASTEBIN_ID: "",
  }),
}));

import { fetchPhotosFromDriveFolder } from "../photos.server";

describe("fetchPhotosFromDriveFolder", () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("calls the Google Drive files API", async () => {
    fetchMock.mockResolvedValue({ files: [] });
    await fetchPhotosFromDriveFolder();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.googleapis.com/drive/v3/files",
      expect.objectContaining({ params: expect.any(URLSearchParams) }),
    );
  });

  it("includes the API key, folder query, and the requested fields", async () => {
    fetchMock.mockResolvedValue({ files: [] });
    await fetchPhotosFromDriveFolder();

    const callArgs = fetchMock.mock.calls[0]!;
    const params = callArgs[1].params as URLSearchParams;

    expect(params.get("key")).toBe("drive-key");
    expect(params.get("q")).toBe("'folder-id' in parents");
    expect(params.get("fields")).toBe(
      "files/id,files/imageMediaMetadata,files/thumbnailLink",
    );
  });

  it("returns the files array from the response", async () => {
    const files = [
      {
        id: "abc",
        thumbnailLink: "thumb-abc",
        imageMediaMetadata: { width: 100, height: 50 },
      },
    ];
    fetchMock.mockResolvedValue({ files });

    const result = await fetchPhotosFromDriveFolder();
    expect(result).toEqual(files);
  });

  it("returns an empty array when the response has no files key", async () => {
    fetchMock.mockResolvedValue({});
    const result = await fetchPhotosFromDriveFolder();
    expect(result).toEqual([]);
  });

  it("returns an empty array when files is undefined", async () => {
    fetchMock.mockResolvedValue({ files: undefined });
    const result = await fetchPhotosFromDriveFolder();
    expect(result).toEqual([]);
  });
});
