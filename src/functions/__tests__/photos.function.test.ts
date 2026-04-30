import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({
    handler: <T>(fn: T) => fn,
  }),
  createClientOnlyFn: <T>(fn: T) => fn,
  createIsomorphicFn: () => {
    let clientFn: (...args: unknown[]) => unknown = () => undefined;
    const callable = ((...args: unknown[]) => clientFn(...args)) as ((
      ...a: unknown[]
    ) => unknown) & {
      server: (fn: unknown) => unknown;
      client: (fn: (...args: unknown[]) => unknown) => unknown;
    };
    callable.server = () => callable;
    callable.client = (fn) => {
      clientFn = fn;
      return callable;
    };
    return callable;
  },
}));

const getCookie = vi.fn();
const setCookie = vi.fn();
const deleteCookie = vi.fn();
vi.mock("@tanstack/react-start/server", () => ({
  getCookie: (...args: unknown[]) => getCookie(...args),
  setCookie: (...args: unknown[]) => setCookie(...args),
  deleteCookie: (...args: unknown[]) => deleteCookie(...args),
}));

const fetchPhotosFromDriveFolder = vi.fn();
vi.mock("../photos.server", () => ({
  fetchPhotosFromDriveFolder: () => fetchPhotosFromDriveFolder(),
}));

import {
  clearHidePhotoModal,
  isPhotoInfoModalDefaultHidden,
  loadPhotos,
  setHidePhotoModal,
} from "../photos.function";

describe("loadPhotos", () => {
  beforeEach(() => {
    fetchPhotosFromDriveFolder.mockReset();
  });

  it("maps Drive files to a {url, thumbnailUrl, aspectRatio} list", async () => {
    fetchPhotosFromDriveFolder.mockResolvedValue([
      {
        id: "abc",
        thumbnailLink: "https://drive.google/thumb/abc",
        imageMediaMetadata: { width: 1600, height: 800 },
      },
      {
        id: "def",
        thumbnailLink: "https://drive.google/thumb/def",
        imageMediaMetadata: { width: 600, height: 800 },
      },
    ]);

    const result = await loadPhotos();
    expect(result).toEqual([
      {
        url: "https://lh3.googleusercontent.com/d/abc",
        thumbnailUrl: "https://drive.google/thumb/abc",
        aspectRatio: 2,
      },
      {
        url: "https://lh3.googleusercontent.com/d/def",
        thumbnailUrl: "https://drive.google/thumb/def",
        aspectRatio: 0.75,
      },
    ]);
  });

  it("returns an empty list when the Drive folder has no files", async () => {
    fetchPhotosFromDriveFolder.mockResolvedValue([]);
    const result = await loadPhotos();
    expect(result).toEqual([]);
  });
});

describe("setHidePhotoModal", () => {
  beforeEach(() => {
    sessionStorage.clear();
    setCookie.mockReset();
  });

  it("writes the flag to sessionStorage", () => {
    setHidePhotoModal();
    expect(sessionStorage.getItem("hidePhotoModal")).toBe("true");
  });

  it("also sets the cookie via the server primitive", () => {
    setHidePhotoModal();
    expect(setCookie).toHaveBeenCalledWith("hidePhotoModal", "true");
  });
});

describe("clearHidePhotoModal", () => {
  beforeEach(() => {
    sessionStorage.setItem("hidePhotoModal", "true");
    deleteCookie.mockReset();
  });

  it("removes the flag from sessionStorage", () => {
    clearHidePhotoModal();
    expect(sessionStorage.getItem("hidePhotoModal")).toBeNull();
  });

  it("also deletes the cookie via the server primitive", () => {
    clearHidePhotoModal();
    expect(deleteCookie).toHaveBeenCalledWith("hidePhotoModal");
  });
});

describe("isPhotoInfoModalDefaultHidden (client branch)", () => {
  // Our isomorphic mock always selects the client branch (jsdom).
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("returns true when sessionStorage holds 'true'", () => {
    sessionStorage.setItem("hidePhotoModal", "true");
    expect(isPhotoInfoModalDefaultHidden()).toBe(true);
  });

  it("returns false when sessionStorage is empty", () => {
    expect(isPhotoInfoModalDefaultHidden()).toBe(false);
  });

  it("returns false when sessionStorage holds a non-'true' value", () => {
    sessionStorage.setItem("hidePhotoModal", "yes");
    expect(isPhotoInfoModalDefaultHidden()).toBe(false);
  });
});
