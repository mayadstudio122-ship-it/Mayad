
import type { Metadata } from "next";
import { POPULAR_PERSONALITIES } from "@/data/content";
import { notFound } from "next/navigation";

const SITE_URL = "https://www.mayadstudio.com";

interface ArtistLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArtistLayoutProps): Promise<Metadata> {
  const { id } = await params;

  const artist = POPULAR_PERSONALITIES.find(
    (person) => person.id === id
  );

  if (!artist) {
    return {
      title: "Artist Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    artist.bio?.trim() ||
    `Discover ${artist.name}, their creative journey, films and contributions to Rajasthani cinema and entertainment on MAYAD OTT.`;

  const image = artist.imageUrl
    ? artist.imageUrl.startsWith("http")
      ? artist.imageUrl
      : `${SITE_URL}${artist.imageUrl.startsWith("/") ? "" : "/"}${artist.imageUrl}`
    : `${SITE_URL}/Default.jpg`;

  const canonicalUrl = `${SITE_URL}/artists/${encodeURIComponent(id)}`;

  return {
    title: `${artist.name} | Rajasthani Artist & MAYAD`,

    description: description.slice(0, 160),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "profile",
      title: `${artist.name} | MAYAD OTT`,
      description: description.slice(0, 200),
      url: canonicalUrl,
      siteName: "MAYAD",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 800,
          height: 800,
          alt: `${artist.name} - Rajasthani Artist`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${artist.name} | MAYAD OTT`,
      description: description.slice(0, 200),
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
