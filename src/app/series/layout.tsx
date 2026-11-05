
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "Rajasthani Web Series & Original Shows",

  description:
    "Watch Rajasthani web series, original shows and regional stories on MAYAD OTT. Explore engaging stories, regional talent and entertainment from Rajasthan.",

  alternates: {
    canonical: `${SITE_URL}/series`,
  },

  openGraph: {
    type: "website",
    title: "Rajasthani Web Series & Original Shows | MAYAD",
    description:
      "Discover Rajasthani web series, original shows and regional stories on MAYAD OTT.",
    url: `${SITE_URL}/series`,
    siteName: "MAYAD",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/mayad.jpg`,
        width: 1200,
        height: 630,
        alt: "MAYAD - Rajasthani Web Series",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajasthani Web Series & Original Shows | MAYAD",
    description:
      "Explore Rajasthani web series and original entertainment on MAYAD OTT.",
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

export default function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
