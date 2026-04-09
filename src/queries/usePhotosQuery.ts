import { useQuery } from "@tanstack/react-query";
import { PhotosApiResponse } from "../../server/types";

const KEY = "photos";
const API_URL = import.meta.env.VITE_API_URL!;

export const usePhotosQuery = () => {
  const { data, ...query } = useQuery({
    staleTime: 1000 * 60,
    queryKey: [KEY],
    queryFn: async () => {
      const files = (await fetch(`${API_URL}/photos`).then((res) =>
        res.json()
      )) as PhotosApiResponse;

      return files.map((file) => ({
        url: `https://lh3.googleusercontent.com/d/${file.id}`,
        thumbnailUrl: file.thumbnailLink,
        aspectRatio:
          file.imageMediaMetadata.width / file.imageMediaMetadata.height,
      }));
    },
  });

  return {
    photos: data,
    ...query,
  };
};
