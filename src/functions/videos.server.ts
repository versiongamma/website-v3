import { createServerOnlyFn } from "@tanstack/react-start";

import type { YoutubeApiPlaylistResponse } from "~/types";
import { fetch } from "~/utils/fetch";
import { getEnv } from "./env.server";

const YOUTUBE_API_PLAYLIST_URL =
  "https://youtube.googleapis.com/youtube/v3/playlistItems";

const fetchFromPlaylist = createServerOnlyFn((playlistId: string) => {
  const { YOUTUBE_API_KEY } = getEnv();

  const params = new URLSearchParams({
    part: "snippet",
    maxResults: "50",
    playlistId,
    key: YOUTUBE_API_KEY,
  });

  return fetch<YoutubeApiPlaylistResponse>(YOUTUBE_API_PLAYLIST_URL, {
    params,
  });
});

export const fetchYoutubeVideos = createServerOnlyFn(
  async (): Promise<YoutubeApiPlaylistResponse["items"]> => {
    const { YOUTUBE_REVIEWS_PLAYLIST_ID, YOUTUBE_ANALYSIS_PLAYLIST_ID } =
      getEnv();
    const [analysisData, reviewsData] = await Promise.all([
      fetchFromPlaylist(YOUTUBE_ANALYSIS_PLAYLIST_ID),
      fetchFromPlaylist(YOUTUBE_REVIEWS_PLAYLIST_ID),
    ]);

    return [...(analysisData.items ?? []), ...(reviewsData.items ?? [])].sort(
      (a, b) =>
        new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime(),
    );
  },
);

export const fetchVideographyVideos = createServerOnlyFn(async () => {
  const { VIDEOGRAPHY_PLAYLIST_ID } = getEnv();

  const response = await fetchFromPlaylist(VIDEOGRAPHY_PLAYLIST_ID);
  return response.items ?? [];
});
