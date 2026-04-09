const { GOOGLE_DRIVE_API_KEY = "", PHOTO_DRIVE_FOLDER_ID = "" } = process.env;

const PORT = 8001;

Bun.serve({
  routes: {
    "/api/photos": {
      GET: async () => {
        const params = new URLSearchParams({
          q: `'${PHOTO_DRIVE_FOLDER_ID}' in parents`,
          key: GOOGLE_DRIVE_API_KEY,
          fields: "files/id,files/imageMediaMetadata,files/thumbnailLink",
        });
        const result = await fetch(
          `https://www.googleapis.com/drive/v3/files?${params.toString()}`
        ).then((res) => res.json());
        return Response.json(result.files ?? []);
      },
    },
  },
  port: PORT,
});

console.log(`Server is listening on port ${PORT}`);
