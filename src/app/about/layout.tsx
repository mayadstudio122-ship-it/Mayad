
import type { Metadata } from "next";

const siteUrl = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "About MAYAD | Rajasthani OTT Platform",

  description:
    "Discover MAYAD, a Rajasthani OTT platform celebrating Rajasthan's cinema, music, folk stories, culture, artists and original entertainment.",

  keywords: [
    "About MAYAD",
    "MAYAD OTT",
    "MAYAD Studio",
    "Rajasthani OTT Platform",
    "Rajasthani Cinema",
    "Rajasthani Entertainment",
    "Rajasthani Movies",
    "Rajasthani Music",
    "Rajasthani Culture",
  ],

  alternates: {
    canonical: `${siteUrl}/about`,
  },

  openGraph: {
    type: "website",
    title: "About MAYAD | Rajasthani OTT Platform",
    description:
      "Discover MAYAD's vision of bringing Rajasthani movies, music, culture and original entertainment to audiences worldwide.",
    url: `${siteUrl}/about`,
    siteName: "MAYAD",
    locale: "en_IN",
    images: [
      {
        url: `${siteUrl}/mayad.jpg`,
        width: 1200,
        height: 630,
        alt: "MAYAD - Rajasthani OTT Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About MAYAD | Rajasthani OTT Platform",
    description:
      "Explore MAYAD, Rajasthan's platform for movies, music, culture and entertainment.",
    images: [`${siteUrl}/mayad.jpg`],
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
