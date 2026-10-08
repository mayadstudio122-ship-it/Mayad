"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight } from "lucide-react";

import { MAYAD_OFFICIAL_URL } from "@/utils/config";
import { useApp } from "@/context/AppContext";

export default function Hero() {
  const { language } = useApp();
  const isHin = language === "HIN";

  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#4a0600] sm:min-h-[720px] lg:min-h-[calc(100vh-70px)]">

      {/* =====================================================
          MOBILE BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 sm:hidden">
        <Image
          src="/mobilehero.jpg.jpeg"
          alt="MAYAD Rajasthan Cultural Voice"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </div>

      {/* =====================================================
          DESKTOP / TABLET BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/hero.jpg"
          alt="MAYAD Rajasthan Cultural Voice"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* =====================================================
          OVERLAYS
      ===================================================== */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,_var(--tw-gradient-stops))] from-black/50 via-transparent to-black/65" />

      {/* Mobile readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 sm:hidden" />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1500px] items-center justify-center px-4 pb-28 pt-16 sm:min-h-0 sm:px-8 sm:pb-32 sm:pt-16 lg:justify-end lg:pb-28 lg:pr-16 xl:pr-24">

        <div className="flex w-full max-w-[350px] -translate-y-5 flex-col items-center text-center sm:max-w-xl sm:translate-y-0 lg:w-[60%] lg:max-w-none xl:w-[56%]">

          {/* =====================================================
              SUBTITLE
          ===================================================== */}

          <div className="mb-2 flex w-full flex-col items-center sm:mb-3">

            <div className="mb-1.5 flex w-[185px] items-center justify-center gap-2 sm:w-64 sm:gap-3">

              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-white/90" />

              <span className="h-2 w-2 rotate-45 border border-white/70 bg-white/20 sm:h-2.5 sm:w-2.5" />

              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/50 to-white/90" />

            </div>

            <span className="text-[9px] font-bold uppercase tracking-[0.19em] text-amber-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] sm:text-xs sm:tracking-[0.28em] sm:text-white/95 md:text-sm">
              RAJASTHAN&apos;S CULTURAL VOICE
            </span>

            <div className="mt-1.5 h-[1px] w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent sm:w-24" />

          </div>

          {/* =====================================================
              MAIN HEADING
          ===================================================== */}

          <div className="relative my-1 flex -rotate-1 select-none flex-col items-center sm:my-4 sm:-rotate-2">

            {/* White Heading */}

            <div className="relative inline-block px-2 py-0.5 sm:px-3 sm:py-1.5">

              <div className="absolute inset-0 -z-10 scale-110 rounded-2xl bg-black/80 blur-xl sm:blur-2xl" />

              <h1 className="relative whitespace-nowrap text-[2.55rem] font-black leading-none tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] [text-shadow:_2px_3px_6px_rgba(0,0,0,0.95)] sm:text-6xl sm:[text-shadow:_3px_4px_8px_rgba(0,0,0,0.95)] md:text-7xl lg:text-8xl xl:text-[6rem]">
                हेलो मायड़
              </h1>

            </div>

            {/* Golden Heading */}

            <div className="relative mt-1 inline-block px-2.5 py-1 sm:mt-2 sm:px-4 sm:py-2">

              <div className="absolute inset-0 -z-10 scale-110 rounded-2xl bg-black/80 blur-xl sm:blur-2xl" />

              <span className="relative whitespace-nowrap text-[2.55rem] font-black leading-none tracking-wide text-[#ffc83b] drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] [text-shadow:_2px_3px_8px_rgba(0,0,0,0.95)] sm:text-6xl sm:[text-shadow:_3px_4px_10px_rgba(0,0,0,0.95)] md:text-7xl lg:text-8xl xl:text-[6rem]">
                भाषा रो
              </span>

            </div>

          </div>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <p className="mt-4 max-w-[325px] text-center text-[11px] font-medium leading-[1.65] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:mt-4 sm:max-w-xl sm:text-sm sm:leading-relaxed md:text-base">
            राजस्थान री माटी, मायड़ री भाषा अर आपणी संस्कृति ने दुनिया तक
            पहुंचावां। आओ, एक साथ मिलकर राजस्थान री कला, हुनर अर कहाणी ने
            नवी पहचान देवां।
          </p>

          {/* =====================================================
              MOBILE BUTTONS
          ===================================================== */}

          <div className="mt-6 flex w-full max-w-[330px] flex-col items-center gap-3 sm:hidden">

            {/* Artist Registration */}

            <Link
              href="/register"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffca28] via-[#ffd54f] to-[#ffb300] px-5 py-3.5 text-sm font-extrabold text-black shadow-[0_0_24px_rgba(255,202,40,0.55)] transition-all duration-300 active:scale-95"
            >
              <span>
                {isHin ? "आर्टिस्ट रजिस्ट्रेशन" : "Artist Registration"}
              </span>

              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </Link>

            {/* Explore MAYAD */}

            <a
              href={MAYAD_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-white/40 bg-black/65 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 active:scale-95"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-white/10">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>

              <span>
                {isHin ? "मायड़ का अनुभव करें" : "Explore MAYAD"}
              </span>
            </a>

          </div>

        </div>

      </div>

      {/* =====================================================
          DESKTOP BUTTONS
      ===================================================== */}

      <div className="absolute bottom-10 left-8 z-20 hidden items-center justify-start gap-4 lg:flex xl:left-16">

        {/* Artist Registration */}

        <Link
          href="/register"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffca28] via-[#ffd54f] to-[#ffb300] px-7 py-3.5 text-sm font-extrabold text-black shadow-[0_0_24px_rgba(255,202,40,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(255,202,40,0.85)] active:scale-95 md:text-base"
        >
          <span>
            {isHin ? "आर्टिस्ट रजिस्ट्रेशन" : "Artist Registration"}
          </span>

          <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Explore MAYAD */}

        <a
          href={MAYAD_OFFICIAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/40 bg-black/60 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-yellow-400 active:scale-95 md:text-base"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-white/10 transition-colors group-hover:border-yellow-400 group-hover:text-yellow-400">
            <Play className="ml-0.5 h-3 w-3 fill-current" />
          </span>

          <span>
            {isHin ? "मायड़ का अनुभव करें" : "Explore MAYAD"}
          </span>
        </a>

      </div>

      {/* =====================================================
          SMALL BLINKING SCROLL DOWN
      ===================================================== */}

      <button
        type="button"
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-0.5 text-white/80 transition-opacity duration-300 hover:text-white sm:bottom-6"
        aria-label="Scroll down"
      >
        <span className="text-[7px] font-medium uppercase tracking-[0.22em] opacity-80 sm:text-[8px] sm:tracking-[0.3em]">
          Scroll Down
        </span>

        <span className="animate-[bounce_1.5s_infinite] text-lg font-light leading-none text-[#ffc83b] drop-shadow-[0_0_8px_rgba(255,200,59,0.7)] sm:text-xl">
          ↓
        </span>
      </button>

    </section>
  );
}