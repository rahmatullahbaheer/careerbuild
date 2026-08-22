// robots.js — Programmatic robots file for Googlebot & Search Crawlers
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/signup"],
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/signup"],
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/login", "/signup"],
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
