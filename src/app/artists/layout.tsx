
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "Rajasthani Artists, Actors & Singers",

  description:
    "Discover Rajasthani actors, singers, filmmakers and artists on MAYAD OTT. Explore artist profiles, creative journeys, filmography and contributions to Rajasthani entertainment.",

  alternates: {
    canonical: `${SITE_URL}/artists`,
  },

  openGraph: {
    type: "website",
    title: "Rajasthani Artists, Actors & Singers | MAYAD",
    description:
      "Explore profiles of Rajasthani actors, singers, filmmakers and creative talents featured on MAYAD OTT.",
    url: `${SITE_URL}/artists`,
    siteName: "MAYAD",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/mayad.jpg`,
        width: 1200,
        height: 630,
        alt: "Rajasthani Artists and Actors - MAYAD",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajasthani Artists, Actors & Singers | MAYAD",
    description:
      "Discover Rajasthani artists, actors, singers and creative talents on MAYAD OTT.",
    images: [`${SITE_URL}/mayad.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function ArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
