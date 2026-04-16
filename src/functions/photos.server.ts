import { createServerOnlyFn } from "@tanstack/react-start";
import type { GoogleDriveFilesApiFields } from "src/types";
import { getEnv } from "./env.server";

export const fetchPhotosFromDriveFolder = createServerOnlyFn(
  async (): Promise<
    Pick<
      GoogleDriveFilesApiFields,
      "id" | "imageMediaMetadata" | "thumbnailLink"
    >[]
  > => {
    const { GOOGLE_DRIVE_API_KEY, PHOTO_DRIVE_FOLDER_ID } = getEnv();

    const params = new URLSearchParams({
      q: `'${PHOTO_DRIVE_FOLDER_ID}' in parents`,
      key: GOOGLE_DRIVE_API_KEY,
      fields: "files/id,files/imageMediaMetadata,files/thumbnailLink",
    });
    const result = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
    ).then((res) => res.json());

    return result.files ?? [];
  },
);
