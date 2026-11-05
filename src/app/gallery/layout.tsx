
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "MAYAD Photo Gallery | Rajasthani Artists & Entertainment",

  description:
    "Explore the MAYAD photo gallery featuring Rajasthani artists, cinema events, entertainment highlights, special moments and visual stories from Rajasthan.",

  alternates: {
    canonical: `${SITE_URL}/gallery`,
  },

  openGraph: {
    type: "website",
    title: "MAYAD Photo Gallery | Rajasthani Artists & Entertainment",
    description:
      "Discover MAYAD's photo gallery featuring Rajasthani artists, cinema, cultural events and entertainment highlights.",
    url: `${SITE_URL}/gallery`,
    siteName: "MAYAD",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/mayad.jpg`,
        width: 1200,
        height: 630,
        alt: "MAYAD Photo Gallery - Rajasthan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MAYAD Photo Gallery | MAYAD",
    description:
      "Explore Rajasthani artists, events, cinema and entertainment highlights in the MAYAD photo gallery.",
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
    },
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
