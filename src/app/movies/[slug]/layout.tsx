
import type { Metadata } from "next";
import { MOVIES_LIST } from "@/data/movie";

const SITE_URL = "https://www.mayadstudio.com";

interface MovieLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: MovieLayoutProps): Promise<Metadata> {
  const { slug } = await params;

  const movie = MOVIES_LIST.find(
    (item) => item.slug === slug
  );

  if (!movie) {
    return {
      title: "Movie Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    movie.description?.trim() ||
    `Discover ${movie.title}, a Rajasthani film featured on MAYAD OTT. Explore regional cinema, stories and entertainment from Rajasthan.`;

  const poster = movie.posterUrl
    ? movie.posterUrl.startsWith("http")
      ? movie.posterUrl
      : `${SITE_URL}${movie.posterUrl.startsWith("/") ? "" : "/"}${movie.posterUrl}`
    : `${SITE_URL}/mayad.jpg`;

  const canonicalUrl = `${SITE_URL}/movies/${encodeURIComponent(movie.slug)}`;

  return {
    title: `${movie.title} | Watch on MAYAD OTT`,

    description: description.slice(0, 160),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "video.movie",
      title: `${movie.title} | MAYAD OTT`,
      description: description.slice(0, 200),
      url: canonicalUrl,
      siteName: "MAYAD",
      locale: "en_IN",

      images: [
        {
          url: poster,
          width: 1200,
          height: 630,
          alt: `${movie.title} - Rajasthani Movie on MAYAD`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${movie.title} | MAYAD OTT`,
      description: description.slice(0, 200),
      images: [poster],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
  };
}

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
