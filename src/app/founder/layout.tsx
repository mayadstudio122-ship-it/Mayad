
import type { Metadata } from "next";

const SITE_URL = "https://www.mayadstudio.com";

export const metadata: Metadata = {
  title: "DP Singh Basni | Founder & CEO of MAYAD",

  description:
    "Discover DP Singh Basni, Founder and CEO of MAYAD, and explore his creative journey in Rajasthani filmmaking, direction, writing, acting, music and culture.",

  authors: [
    {
      name: "DP Singh Basni",
      url: `${SITE_URL}/founder`,
    },
  ],

  creator: "MAYAD",
  publisher: "MAYAD",
  applicationName: "MAYAD OTT",

  alternates: {
    canonical: `${SITE_URL}/founder`,
  },

  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: `${SITE_URL}/founder`,
    siteName: "MAYAD",

    title: "DP Singh Basni | Founder & CEO of MAYAD",

    description:
      "Meet DP Singh Basni, Founder and CEO of MAYAD, working to promote Rajasthani cinema, music, storytelling and culture.",

    images: [
      {
        url: `${SITE_URL}/ceo.jpg`,
        width: 1200,
        height: 1500,
        alt: "DP Singh Basni - Founder and CEO of MAYAD",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DP Singh Basni | Founder & CEO of MAYAD",
    description:
      "Explore the journey and creative vision of DP Singh Basni, Founder and CEO of MAYAD.",
    images: [`${SITE_URL}/ceo.jpg`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function FounderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
