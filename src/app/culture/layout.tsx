
import type { Metadata } from "next";
import React from "react";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "Rajasthan Culture & Heritage",

  description:
    "Explore Rajasthan's rich culture and heritage on MAYAD. Discover Rajasthani folk dances, music, festivals, historic forts, handicrafts and traditional cuisine.",

  alternates: {
    canonical: `${SITE_URL}/culture`,
  },

  openGraph: {
    type: "website",
    title: "Rajasthan Culture & Heritage | MAYAD",
    description:
      "Discover Rajasthani culture, folk traditions, historic forts, festivals, handicrafts and traditional cuisine on MAYAD.",
    url: `${SITE_URL}/culture`,
    siteName: "MAYAD",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/mayad.jpg`,
        width: 1200,
        height: 630,
        alt: "MAYAD - Rajasthan Culture and Heritage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rajasthan Culture & Heritage | MAYAD",
    description:
      "Explore Rajasthani culture, folk music, dance, festivals and heritage on MAYAD.",
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

export default function CultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
