import { createFileRoute } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";

const generateSitemap = createServerOnlyFn((domain: string) => {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
	  <loc>${domain}/</loc>
  </url>
	<url>
		<loc>${domain}/video/</loc>
	</url>
	<url>
	  <loc>${domain}/photo/</loc>
  </url>
  <url>
	  <loc>${domain}/software/</loc>
  </url>
  <url>
	  <loc>${domain}/dev/</loc>
  </url>
</urlset>`
  );
});

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request: { url } }) => {
        const domain = new URL(url).origin;
        const sitemap = generateSitemap(domain);

        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
          },
        });
      },
    },
  },
});
