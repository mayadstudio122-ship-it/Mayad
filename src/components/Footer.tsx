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
      name: "Data Deletion Request",
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
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050A12] text-white">

      {/* =========================================
          DECORATIVE GLOW
      ========================================= */}

      <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-[#FBBE16]/5 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-150px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#FBBE16]/5 blur-[140px]" />

      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="relative mx-auto max-w-[1800px] px-6 pb-12 pt-14 sm:px-8 lg:px-12 lg:pt-16 xl:px-16">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* =====================================
              COLUMN 1 - BRAND
          ===================================== */}

          <div className="lg:col-span-4 xl:col-span-4">

            {/* Logo */}
            <div className="relative mb-6 h-[48px] w-[185px]">
              <Image
                src="/mayadlogo.jpg"
                alt="MAYAD Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>

            {/* Description */}
            <p className="max-w-[430px] text-[14px] leading-[1.8] text-gray-300 sm:text-[15px]">
              {t("footerDesc")}
            </p>

            <p className="mt-5 max-w-[430px] text-[13px] font-medium leading-[1.7] text-gray-400">
              Celebrating creativity, culture and people while building a
              meaningful digital presence for Rajasthan.
            </p>
          </div>

          {/* =====================================
              COLUMN 2 - COMPANY
          ===================================== */}

          <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8 xl:pl-10">

            <h3 className="mb-6 text-[18px] font-bold text-white sm:text-[19px]">
              Company
            </h3>

            <div className="space-y-4">

              {companyLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-2.5"
                  >
                    <Icon
                      className="h-[15px] w-[15px] shrink-0 text-gray-500 transition-colors group-hover:text-[#FBBE16]"
                    />

                    <span className="text-[13px] text-gray-300 transition-colors group-hover:text-[#FBBE16] sm:text-[14px]">
                      {link.name}
                    </span>
                  </Link>
                );
              })}

            </div>
          </div>

          {/* =====================================
              COLUMN 3 - EXPLORE
          ===================================== */}

          <div className="lg:col-span-2">

            <h3 className="mb-6 text-[18px] font-bold text-white sm:text-[19px]">
              Explore
            </h3>

            <div className="space-y-4">

              {exploreLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2"
                >
                  <ChevronRight
                    className="h-[16px] w-[16px] shrink-0 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-[#FBBE16]"
                  />

                  <span className="text-[13px] text-gray-300 transition-colors group-hover:text-[#FBBE16] sm:text-[14px]">
                    {link.name}
                  </span>
                </Link>
              ))}

            </div>
          </div>

          {/* =====================================
              COLUMN 4 - CONNECT
          ===================================== */}

          <div className="lg:col-span-4">

            <h3 className="mb-6 text-[18px] font-bold text-white sm:text-[19px]">
              Contact MAYAD
            </h3>

            <p className="mb-6 max-w-[360px] text-[14px] leading-[1.7] text-gray-400">
              Get in touch with MAYAD for artist registration, general
              enquiries, collaborations and other information.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

              {contactLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-[#FBBE16]/40 hover:bg-[#FBBE16]/5"
                >
                  <ChevronRight
                    className="h-[16px] w-[16px] shrink-0 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-[#FBBE16]"
                  />

                  <span className="text-[13px] font-medium text-gray-300 transition-colors group-hover:text-[#FBBE16]">
                    {link.name}
                  </span>
                </Link>
              ))}

            </div>

          </div>

        </div>
      </div>



      {/* =========================================
          COPYRIGHT
      ========================================= */}

      <div className="relative mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12 xl:px-16">

        <div className="border-t border-white/10 py-6">

          <div className="flex flex-col items-center justify-between gap-3 text-[12px] text-gray-500 md:flex-row sm:text-[13px]">

            <p>
              {t("copyright")}
            </p>

            <p className="text-center md:text-right">
              {t("taglineSubtitle")}
            </p>

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
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFBD00] text-black shadow-lg transition-all hover:scale-105 hover:bg-[#ffd04a] sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
      >
        <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

    </footer>
  );
}