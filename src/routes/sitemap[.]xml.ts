import { createFileRoute } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";

/**
 * Generates the sitemap XML data based on the request headers
 */
const generateSitemap = createServerOnlyFn((headers: Headers) => {
  const protocol = process.env.NODE_ENV !== "production" ? "http" : "https";
  const domain = `${protocol}://${headers.get("host") ?? "versiongamma.com"}`;
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
      GET: ({ request }) => {
        const sitemap = generateSitemap(request.headers);
        return new Response(sitemap, {
          headers: {
            "Content-Type": "application/xml",
          },
        });
      },
    },
  },
});
