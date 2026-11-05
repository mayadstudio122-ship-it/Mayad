
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "Rajasthani Movies & Films Online",

  description:
    "Explore Rajasthani movies, regional films and authentic Rajasthan cinema on MAYAD OTT. Discover Rajasthani stories, filmmakers, artists and regional entertainment.",

  alternates: {
    canonical: `${SITE_URL}/movies`,
  },

  openGraph: {
    type: "website",
    title: "Rajasthani Movies & Films Online | MAYAD OTT",
    description:
      "Discover Rajasthani movies, original films and regional cinema from Rajasthan on MAYAD OTT.",
    url: `${SITE_URL}/movies`,
    siteName: "MAYAD",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/mayad.jpg`,
        width: 1200,
        height: 630,
        alt: "MAYAD OTT - Rajasthani Movies and Films",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajasthani Movies & Films Online | MAYAD",
    description:
      "Explore Rajasthani movies, original films and regional cinema on MAYAD OTT.",
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

export default function MoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
