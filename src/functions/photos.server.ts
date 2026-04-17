import { createServerOnlyFn } from "@tanstack/react-start";

import type { GoogleDriveFilesApiFields } from "~/types";
import { fetch } from "../utils/fetch";
import { getEnv } from "./env.server";

type File = Pick<
  GoogleDriveFilesApiFields,
  "id" | "imageMediaMetadata" | "thumbnailLink"
>;

export const fetchPhotosFromDriveFolder = createServerOnlyFn(
  async (): Promise<File[]> => {
    const { GOOGLE_DRIVE_API_KEY, PHOTO_DRIVE_FOLDER_ID } = getEnv();

    const params = new URLSearchParams({
      q: `'${PHOTO_DRIVE_FOLDER_ID}' in parents`,
      key: GOOGLE_DRIVE_API_KEY,
      fields: "files/id,files/imageMediaMetadata,files/thumbnailLink",
    });
    const result = await fetch<{ files: File[] }>(
      `https://www.googleapis.com/drive/v3/files`,
      { params },
    );

    return result.files ?? [];
  },
);
