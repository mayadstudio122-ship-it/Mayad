
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AppProvider } from "@/context/AppContext";
import VideoModal from "@/components/VideoModal";
import SearchModal from "@/components/SearchModal";
import LoginModal from "@/components/LoginModal";
import SubscribeModal from "@/components/SubscribeModal";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.mayadstudio.com";
const SITE_NAME = "MAYAD";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "MAYAD | Rajasthani Movies, Music & Entertainment",
    template: "%s | MAYAD OTT",
  },

  description:
    "Discover MAYAD, a Rajasthani OTT platform featuring Rajasthani movies, web series, music, folk stories, culture, artists and original entertainment.",

  keywords: [
    "MAYAD",
    "MAYAD OTT",
    "MAYAD Studio",
    "Rajasthani OTT Platform",
    "Rajasthani Movies",
    "Rajasthani Cinema",
    "Rajasthani Films",
    "Rajasthani Songs",
    "Rajasthani Music",
    "Rajasthani Web Series",
    "Rajasthani Entertainment",
    "Marwari Movies",
    "Mewari Movies",
    "Rajasthan Culture",
    "Rajasthani Folk Music",
    "Rajasthani Stories",
  ],

  authors: [
    {
      name: "MAYAD",
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: "MAYAD OTT",
  category: "Entertainment",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: "MAYAD | Rajasthani Movies, Music & Entertainment",

    description:
      "Watch Rajasthani movies, web series, music, folk stories and original entertainment on MAYAD OTT.",

    images: [
      {
        url: "/mayad.jpg",
        width: 1200,
        height: 630,
        alt: "MAYAD - Rajasthani OTT Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "MAYAD | Rajasthani Movies, Music & Entertainment",

    description:
      "Explore Rajasthani movies, music, culture, artists and original entertainment on MAYAD.",

    images: ["/mayad.jpg"],
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

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

// Organization and Website structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MAYAD",
      alternateName: "MAYAD Studio",
      url: SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "MAYAD",
      alternateName: "MAYAD OTT",
      url: SITE_URL,
      inLanguage: ["en-IN", "hi-IN"],
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

// ============================================================
// ROOT LAYOUT
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body
        className="
          bg-mayad-bg
          text-slate-100
          antialiased
          font-sans
          flex
          flex-col
          min-h-screen
          pb-24
          sm:pb-0
        "
      >
        <AppProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>

          <VideoModal />
          <SearchModal />
          <LoginModal />
          <SubscribeModal />
        </AppProvider>
      </body>
    </html>
  );
}
