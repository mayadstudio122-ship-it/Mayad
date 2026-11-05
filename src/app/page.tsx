
import type { Metadata } from "next";

import Hero from "@/components/Hero";
import PopularPersonalities from "@/components/PopularPersonalities";
import GallerySection from "@/components/GallerySection";
import TrendingSection from "@/components/TrendingSection";
import AppDownload from "@/components/AppDownload";
import Numbers from "@/components/Numbers";
import RajasthanConnect from "@/components/RajasthanConnect";
import SocialSection from "@/components/SocialSection";

export const metadata: Metadata = {
  title: "MAYAD | Rajasthani Movies, Music & Entertainment",

  description:
    "Explore MAYAD, a Rajasthani OTT platform for movies, web series, Rajasthani music, folk stories, artists and original entertainment.",

  alternates: {
    canonical: "https://www.mayadstudio.com/",
  },

  openGraph: {
    type: "website",
    title: "MAYAD | Rajasthani OTT Platform",
    description:
      "Watch Rajasthani movies, web series, music and original entertainment on MAYAD.",
    url: "https://www.mayadstudio.com/",
    siteName: "MAYAD",
  },
};

export default function Home() {
  return (
    <main className="w-full bg-mayad-bg">
      <Hero />
      <Numbers />
      <PopularPersonalities />
      <GallerySection />
      <TrendingSection />
      <RajasthanConnect />
      <AppDownload />
      <SocialSection />
    </main>
  );
}
