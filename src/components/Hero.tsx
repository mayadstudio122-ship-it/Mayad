"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ChevronDown, ArrowUpRight } from "lucide-react";

import { MAYAD_OFFICIAL_URL } from "@/utils/config";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#4a0600] sm:min-h-[720px] lg:min-h-[calc(100vh-70px)]">

      {/* =====================================================
          MOBILE BACKGROUND IMAGE
          Path: /mobilehero.jpg
          Only visible on mobile
      ===================================================== */}
      <div className="absolute inset-0 sm:hidden">
        <Image
          src="/mobilehero.jpg.jpeg"
          alt="MAYAD Rajasthan Cultural Voice"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* =====================================================
          DESKTOP / TABLET BACKGROUND IMAGE
          Path: /hero.jpg
          Hidden on mobile
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

      {/* Lighting & Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,_var(--tw-gradient-stops))] from-black/50 via-transparent to-black/65" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center justify-center px-4 pb-16 pt-20 sm:px-8 sm:pb-32 sm:pt-16 lg:justify-end lg:pb-28 lg:pr-16 xl:pr-24">

        <div className="flex w-full max-w-md flex-col items-center text-center sm:max-w-xl lg:w-[60%] lg:max-w-none xl:w-[56%]">

          {/* Subtitle Badge */}
          <div className="mb-2 flex flex-col items-center sm:mb-3">

            <div className="mb-1.5 flex w-44 items-center justify-center gap-2 sm:w-64 sm:gap-3">

              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-white/90" />

              <span className="rotate-45 border border-white/60 bg-white/20 p-0.5 text-[8px] text-white sm:text-[10px]" />

              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/50 to-white/90" />

            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] sm:text-xs sm:tracking-[0.28em] sm:text-white/95 md:text-sm">
              RAJASTHAN&apos;S CULTURAL VOICE
            </span>

            <div className="mt-1 h-[1px] w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent sm:w-24" />

          </div>

          {/* Bold Stylish Main Heading */}
          <div className="relative my-2 flex -rotate-1 select-none flex-col items-center sm:my-4 sm:-rotate-2">

            {/* White Heading */}
            <div className="relative inline-block px-2 py-0.5 sm:px-3 sm:py-1.5">

              <div className="absolute inset-0 -z-10 scale-110 rounded-2xl bg-black/80 blur-xl sm:blur-2xl" />

              <h1 className="relative text-4xl font-black tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] [text-shadow:_2px_3px_6px_rgba(0,0,0,0.95)] sm:text-6xl sm:[text-shadow:_3px_4px_8px_rgba(0,0,0,0.95)] md:text-7xl lg:text-8xl xl:text-[6rem]">
                हेलो मायड़
              </h1>

            </div>

            {/* Golden Yellow Heading */}
            <div className="relative mt-0.5 inline-block px-2.5 py-1 sm:mt-2 sm:px-4 sm:py-2">

              <div className="absolute inset-0 -z-10 scale-110 rounded-2xl bg-black/80 blur-xl sm:blur-2xl" />

              <span className="relative text-4xl font-black tracking-wide text-[#ffc83b] drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] [text-shadow:_2px_3px_8px_rgba(0,0,0,0.95)] sm:text-6xl sm:[text-shadow:_3px_4px_10px_rgba(0,0,0,0.95)] md:text-7xl lg:text-8xl xl:text-[6rem]">
                भाषा रो
              </span>

            </div>

          </div>

          {/* Subtext Description */}
          <p className="mt-2.5 max-w-xs text-center text-xs font-medium leading-relaxed text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:mt-4 sm:max-w-xl sm:text-sm sm:leading-relaxed sm:text-white/95 md:text-base">
            राजस्थान री माटी, मायड़ री भाषा अर आपणी संस्कृति ने दुनिया तक
            पहुंचावां। आओ, एक साथ मिलकर राजस्थान री कला, हुनर अर कहाणी ने
            नवी पहचान देवां।
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 px-4 sm:mt-7 sm:w-auto sm:flex-row sm:gap-5 sm:px-0">

            {/* Join Movement */}
            <Link
              href="/register"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffca28] via-[#ffd54f] to-[#ffb300] px-6 py-3.5 text-sm font-extrabold text-black shadow-[0_0_24px_rgba(255,202,40,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
            >
              <span>Join the Movement</span>

              <ArrowUpRight className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Explore MAYAD */}
            <a
              href={MAYAD_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2.5 rounded-full border border-white/30 bg-black/60 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-yellow-400 active:scale-95 sm:w-auto sm:gap-3 sm:px-8 sm:py-4 sm:text-base"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/80 bg-white/10 transition-colors group-hover:border-yellow-400 group-hover:text-yellow-400 sm:h-6 sm:w-6">

                <Play className="ml-0.5 h-2.5 w-2.5 fill-current sm:h-3 sm:w-3" />

              </span>

              <span>Explore MAYAD</span>
            </a>

          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer flex-col items-center gap-1 opacity-80 transition-opacity hover:opacity-100 sm:flex">

        <div className="flex h-6 w-3.5 justify-center rounded-full border-2 border-white/80 pt-1 shadow-md sm:h-7 sm:w-4">

          <div className="h-1.5 w-0.5 animate-bounce rounded-full bg-white" />

        </div>

        <span className="text-[9px] font-semibold uppercase tracking-widest text-white/90 drop-shadow-md sm:text-[10px]">
          Scroll Down
        </span>

        <ChevronDown className="-mt-0.5 h-3 w-3 animate-bounce text-white/90 sm:h-3.5 sm:w-3.5" />

      </div>

    </section>
  );
}