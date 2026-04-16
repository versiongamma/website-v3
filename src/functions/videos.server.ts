import { createServerOnlyFn } from "@tanstack/react-start";
import type { YoutubeApiPlaylistResponse } from "src/types";
import { getEnv } from "./env.server";

const getPlaylistUrl = createServerOnlyFn((playlistId: string) => {
  const { YOUTUBE_API_KEY } = getEnv();
  return `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;
});

export const fetchYoutubeVideos = createServerOnlyFn(
  async (): Promise<YoutubeApiPlaylistResponse["items"]> => {
    const { YOUTUBE_REVIEWS_PLAYLIST_ID, YOUTUBE_ANALYSIS_PLAYLIST_ID } =
      getEnv();
    const [analysisData, reviewsData] = await Promise.all([
      fetch(getPlaylistUrl(YOUTUBE_ANALYSIS_PLAYLIST_ID))
        .then((res) => res.json())
        .then((videos) => videos),
      fetch(getPlaylistUrl(YOUTUBE_REVIEWS_PLAYLIST_ID))
        .then((res) => res.json())
        .then((videos) => videos),
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
  const fetchVideographyVideosUrl = getPlaylistUrl(VIDEOGRAPHY_PLAYLIST_ID);

  const response = await fetch(fetchVideographyVideosUrl)
    .then((res) => res.json())
    .then((videos) => videos);

  return response.items ?? [];
});
