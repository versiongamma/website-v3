import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerOnlyFn: <T>(fn: T) => fn,
}));

import { getEnv } from "../env.server";

const ENV_KEYS = [
  "GOOGLE_DRIVE_API_KEY",
  "PHOTO_DRIVE_FOLDER_ID",
  "YOUTUBE_API_KEY",
  "YOUTUBE_ANALYSIS_PLAYLIST_ID",
  "YOUTUBE_REVIEWS_PLAYLIST_ID",
  "VIDEOGRAPHY_PLAYLIST_ID",
  "SOFTWARE_PASTEBIN_ID",
] as const;

describe("getEnv", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      delete process.env[key];
    }
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns all expected env keys", () => {
    const env = getEnv();
    for (const key of ENV_KEYS) {
      expect(env).toHaveProperty(key);
    }
  });

  it("returns empty strings for unset env vars", () => {
    const env = getEnv();
    for (const key of ENV_KEYS) {
      expect(env[key]).toBe("");
    }
  });

  it("returns the value from process.env when set", () => {
    process.env.GOOGLE_DRIVE_API_KEY = "drive-key";
    process.env.YOUTUBE_API_KEY = "yt-key";
    process.env.SOFTWARE_PASTEBIN_ID = "pastebin-id";

    const env = getEnv();
    expect(env.GOOGLE_DRIVE_API_KEY).toBe("drive-key");
    expect(env.YOUTUBE_API_KEY).toBe("yt-key");
    expect(env.SOFTWARE_PASTEBIN_ID).toBe("pastebin-id");
  });

  it("falls back to empty strings for vars that are not set, even when others are set", () => {
    process.env.GOOGLE_DRIVE_API_KEY = "drive-key";
    const env = getEnv();
    expect(env.GOOGLE_DRIVE_API_KEY).toBe("drive-key");
    expect(env.YOUTUBE_API_KEY).toBe("");
    expect(env.PHOTO_DRIVE_FOLDER_ID).toBe("");
  });

  it("re-reads process.env on each call", () => {
    expect(getEnv().YOUTUBE_API_KEY).toBe("");
    process.env.YOUTUBE_API_KEY = "set-after-first-call";
    expect(getEnv().YOUTUBE_API_KEY).toBe("set-after-first-call");
  });
});
