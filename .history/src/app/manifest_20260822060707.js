// manifest.js — Web App Manifest for Google PWA & Mobile Search Indexing
// See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest

export default function manifest() {
  return {
    name: "CareerBuild — AI Resume Builder",
    short_name: "CareerBuild",
    description:
      "Build a professional, ATS-friendly resume in minutes with AI. Choose templates, customize sections, and download job-ready resumes.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e3a8a",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
