// robots.js — Programmatic robots file
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login", "/signup", "/api/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://careerbuild.app"}/sitemap.xml`,
  };
}
