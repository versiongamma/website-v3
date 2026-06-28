import {
  createClientOnlyFn,
  createIsomorphicFn,
  createServerFn,
} from "@tanstack/react-start";
import {
  deleteCookie,
  getCookie,
  setCookie,
} from "@tanstack/react-start/server";
import { fetchPhotosFromDriveFolder } from "./photos.server";

const HIDE_MODAL_KEY = "hidePhotoModal";

export const loadPhotos = createServerFn().handler(async () => {
  const files = await fetchPhotosFromDriveFolder();
  return files.map((file) => ({
    url: `https://lh3.googleusercontent.com/d/${file.id}`,
    thumbnailUrl: file.thumbnailLink,
    aspectRatio: file.imageMediaMetadata.width / file.imageMediaMetadata.height,
  }));
});

const setHidePhotoModalServer = createServerFn().handler(() => {
  setCookie(HIDE_MODAL_KEY, "true");
});

const setHidePhotoModalClient = createClientOnlyFn(() => {
  sessionStorage.setItem(HIDE_MODAL_KEY, "true");
});

const clearHidePhotoModalServer = createServerFn().handler(() => {
  deleteCookie(HIDE_MODAL_KEY);
});

const clearHidePhotoModalClient = createClientOnlyFn(() => {
  sessionStorage.removeItem(HIDE_MODAL_KEY);
});

/** Clears the first visit flag for the current session.
 * Different from an isomorphic function, this runs on both client and server simultaneously,
 * instead of just running client/server code based on context. As such, can only be called from the client.
 */
export const setHidePhotoModal = createClientOnlyFn(() => {
  setHidePhotoModalClient();
  setHidePhotoModalServer();
});

/** Resets the first visit flag for the current session.
 * Different from an isomorphic function, this runs on both client and server simultaneously,
 * instead of just running client/server code based on context. As such, can only be called from the client.
 */
export const clearHidePhotoModal = createClientOnlyFn(() => {
  clearHidePhotoModalClient();
  clearHidePhotoModalServer();
});

export const isPhotoInfoModalDefaultHidden = createIsomorphicFn()
  .server(() => {
    return getCookie(HIDE_MODAL_KEY) === "true";
  })
  .client(() => {
    return sessionStorage.getItem(HIDE_MODAL_KEY) === "true";
  });
