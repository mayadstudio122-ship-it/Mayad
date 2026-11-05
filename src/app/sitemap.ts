
import type { MetadataRoute } from "next";

import { MOVIES_LIST } from "@/data/movie";
import { POPULAR_PERSONALITIES } from "@/data/content";

const BASE_URL = "https://www.mayadstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Public static pages
  const staticPages = [
    "",
    "/about",
    "/movies",
    "/series",
    "/artists",
    "/blogs",
    "/culture",
    "/gallery",
    "/contact",
    "/faq",
    "/founder",
  ];

  const staticSitemap: MetadataRoute.Sitemap =
    staticPages.map((page) => ({
      url: `${BASE_URL}${page}`,
      changeFrequency:
        page === "" || page === "/movies" || page === "/series"
          ? "weekly"
          : "monthly",
      priority:
        page === ""
          ? 1
          : page === "/movies" || page === "/series"
            ? 0.9
            : 0.7,
    }));

  // Individual movie pages
  const moviePages: MetadataRoute.Sitemap =
    MOVIES_LIST.map((movie) => ({
      url: `${BASE_URL}/movies/${movie.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Individual artist pages
  const artistPages: MetadataRoute.Sitemap =
    POPULAR_PERSONALITIES.map((artist) => ({
      url: `${BASE_URL}/artists/${artist.id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...staticSitemap,
    ...moviePages,
    ...artistPages,
  ];
}
