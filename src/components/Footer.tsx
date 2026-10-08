"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowUp,
  Building2,
  Users,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { t } = useApp();

  // =========================================
  // COMPANY LINKS
  // =========================================

  const companyLinks = [
    {
      name: "About MAYAD",
      href: "/about",
      icon: Building2,
    },
    {
      name: "Founder",
      href: "/founder",
      icon: Users,
    },
  ];

  // =========================================
  // EXPLORE LINKS
  // =========================================

  const exploreLinks = [
    {
      name: "Culture",
      href: "/culture",
    },
    {
      name: "Artists",
      href: "/artists",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
  ];

  // =========================================
  // CONTACT LINKS
  // =========================================

  const contactLinks = [
    {
      name: "Artist Registration",
      href: "/register",
    },
    {
      name: "Contact Us",
      href: "/contact",
    },
  ];

  // =========================================
  // LEGAL LINKS
  // =========================================

  const legalLinks = [
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      href: "/terms-and-conditions",
    },
    {
      name: "Help & Support",
      href: "/help-support",
    },
    {
      name: "Data Deletion",
      href: "/data-deletion-request",
    },
  ];

  // =========================================
  // BACK TO TOP
  // =========================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#050A12] text-white">

      {/* =========================================
          BACKGROUND GLOWS
      ========================================= */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#FBBE16]/[0.035] blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-[#FBBE16]/[0.035] blur-[120px]" />

      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="relative mx-auto max-w-[1500px] px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-12 lg:px-10 xl:px-14">

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-7">

          {/* =====================================
              BRAND
          ===================================== */}

          <div className="sm:col-span-2 lg:col-span-4">

            {/* Logo */}

            <Link
              href="/"
              className="mb-5 block w-fit transition-opacity duration-300 hover:opacity-90"
            >
              <div className="relative h-[38px] w-[145px] sm:h-[42px] sm:w-[160px]">
                <Image
                  src="/mayadlogo.jpg"
                  alt="MAYAD Logo"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Description */}

            <p className="max-w-[400px] text-[12px] leading-[1.75] text-gray-400 sm:text-[13px]">
              {t("footerDesc")}
            </p>

            <p className="mt-3 max-w-[390px] text-[11px] leading-[1.7] text-gray-500 sm:text-[12px]">
              Celebrating creativity, culture and people while building a
              meaningful digital presence for Rajasthan.
            </p>

          </div>

          {/* =====================================
              COMPANY
          ===================================== */}

          <div className="lg:col-span-2 lg:border-l lg:border-white/[0.08] lg:pl-7">

            <h3 className="mb-4 text-[14px] font-semibold tracking-wide text-white sm:text-[15px]">
              Company
            </h3>

            <div className="space-y-3">

              {companyLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-2"
                  >
                    <Icon className="h-[14px] w-[14px] shrink-0 text-gray-500 transition-colors duration-300 group-hover:text-[#FBBE16]" />

                    <span className="text-[12px] text-gray-400 transition-colors duration-300 group-hover:text-[#FBBE16] sm:text-[13px]">
                      {link.name}
                    </span>
                  </Link>
                );
              })}

            </div>

          </div>

          {/* =====================================
              EXPLORE
          ===================================== */}

          <div className="lg:col-span-2">

            <h3 className="mb-4 text-[14px] font-semibold tracking-wide text-white sm:text-[15px]">
              Explore
            </h3>

            <div className="space-y-3">

              {exploreLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-1.5"
                >
                  <ChevronRight className="h-[13px] w-[13px] shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#FBBE16]" />

                  <span className="text-[12px] text-gray-400 transition-colors duration-300 group-hover:text-[#FBBE16] sm:text-[13px]">
                    {link.name}
                  </span>
                </Link>
              ))}

            </div>

          </div>

          {/* =====================================
              CONTACT
          ===================================== */}

          <div className="lg:col-span-4">

            <h3 className="mb-4 text-[14px] font-semibold tracking-wide text-white sm:text-[15px]">
              Contact MAYAD
            </h3>

            <p className="mb-5 max-w-[360px] text-[12px] leading-[1.7] text-gray-400 sm:text-[13px]">
              Get in touch with MAYAD for artist registration, general
              enquiries, collaborations and other information.
            </p>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

              {contactLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex min-h-[42px] items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 transition-all duration-300 hover:border-[#FBBE16]/30 hover:bg-[#FBBE16]/[0.04]"
                >
                  <ChevronRight className="h-[14px] w-[14px] shrink-0 text-gray-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#FBBE16]" />

                  <span className="text-[11px] font-medium text-gray-400 transition-colors duration-300 group-hover:text-[#FBBE16] sm:text-[12px]">
                    {link.name}
                  </span>
                </Link>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          BOTTOM SECTION
      ========================================= */}

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-10 xl:px-14">

        <div className="border-t border-white/[0.08]">

          <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">

            {/* Copyright */}

            <p className="text-center text-[10px] text-gray-500 sm:text-[11px] md:text-left">
              {t("copyright")}
            </p>

            {/* Tagline */}

            <p className="text-center text-[10px] text-gray-500 sm:text-[11px] md:text-right">
              {t("taglineSubtitle")}
            </p>

          </div>

          {/* =====================================
              LEGAL LINKS
          ===================================== */}

          <div className="border-t border-white/[0.05] py-4">

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">

              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>

                  <Link
                    href={link.href}
                    className="text-[9px] text-gray-500 transition-colors duration-300 hover:text-[#FBBE16] sm:text-[10px]"
                  >
                    {link.name}
                  </Link>

                  {index !== legalLinks.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-gray-700" />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          BACK TO TOP
      ========================================= */}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFBD00] text-black shadow-[0_5px_25px_rgba(255,189,0,0.25)] transition-all duration-300 hover:scale-105 hover:bg-[#ffd04a] active:scale-95 sm:bottom-7 sm:right-7 sm:h-12 sm:w-12"
      >
        <ArrowUp className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </button>

    </footer>
  );
}