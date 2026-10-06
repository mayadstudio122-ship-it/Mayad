'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getBackendUrl } from '@/utils/config';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artistPhoto, setArtistPhoto] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { openSearch, language, setLanguage, t } = useApp();

  // ============================================================
  // ARTIST PHOTO
  // ============================================================
  useEffect(() => {
    const updateArtistPhoto = () => {
      if (typeof window === 'undefined') return;
      const token = localStorage.getItem('mayad_artist_jwt') || localStorage.getItem('token');
      if (!token) {
        setArtistPhoto(null);
        return;
      }
      const savedPhoto = localStorage.getItem('mayad_artist_profile_photo');
      if (savedPhoto) {
        setArtistPhoto(savedPhoto);
      }
    };

    updateArtistPhoto();

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('mayad_artist_jwt') || localStorage.getItem('token');
      if (token && !localStorage.getItem('mayad_artist_profile_photo')) {
        const backendUrl = getBackendUrl();
        fetch(`${backendUrl}/api/artist/me`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.artist?.profilePhoto) {
              localStorage.setItem('mayad_artist_profile_photo', data.artist.profilePhoto);
              setArtistPhoto(data.artist.profilePhoto);
            }
          })
          .catch((err) => console.error('Navbar artist photo fetch error:', err));
      }
    }

    window.addEventListener('artistProfileUpdated', updateArtistPhoto);
    window.addEventListener('storage', updateArtistPhoto);

    return () => {
      window.removeEventListener('artistProfileUpdated', updateArtistPhoto);
      window.removeEventListener('storage', updateArtistPhoto);
    };
  }, []);

  const handleArtistAccount = () => {
    const token = window.localStorage.getItem('mayad_artist_jwt');
    router.push(token ? '/artist/dashboard' : '/artist/login');
  };

  // ============================================================
  // SCROLL
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ============================================================
  // NAV LINKS
  // ============================================================
  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('movies'), href: '/movies' },
    { name: t('artists'), href: '/artists' },
    { name: t('gallery'), href: '/gallery' },
    { name: t('blogs'), href: '/blogs' },
    { name: t('culture'), href: '/culture' },
    { name: t('founder'), href: '/founder' },
    { name: t('faq'), href: '/faq' },
    { name: t('contact'), href: '/contact' },
  ];

  const isJoinActive = pathname === '/register';

  return (
    <>
      {/* ========================================================
          NAVBAR
      ======================================================== */}
      <header
        className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] min-w-0 items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
          {/* LEFT */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-5 lg:gap-6">
            {/* LOGO */}
            <Link href="/" className="group relative flex shrink-0 items-center gap-2">
              <div className="relative h-8 w-24 shrink-0 overflow-hidden transition-transform group-hover:scale-105 sm:h-10 sm:w-32 lg:h-11 lg:w-36">
                <Image
                  src="/mayadlogo.jpg"
                  alt="MAYAD Logo"
                  fill
                  sizes="150px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden min-w-0 flex-nowrap items-center gap-0.5 md:flex lg:gap-1">
              {/* NORMAL LINKS */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`whitespace-nowrap rounded-lg px-2 py-2 text-[13px] font-medium transition-colors ${
                      isActive
                        ? 'bg-white/5 font-semibold text-mayad-gold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT DESKTOP */}
          <div className="hidden shrink-0 items-center gap-2 lg:gap-3 md:flex">
            {/* SEARCH */}
            <button
              onClick={openSearch}
              className="p-2 text-slate-300 transition-colors hover:text-mayad-gold focus:outline-none"
              title="Search titles"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* LANGUAGE */}
            <div className="relative flex items-center rounded-full border border-white/15 bg-white/10 p-0.5 text-xs font-bold text-white shadow-inner backdrop-blur-md">
              <button
                onClick={() => setLanguage('ENG')}
                className={`rounded-full px-3 py-1 transition-all duration-200 ${
                  language === 'ENG'
                    ? 'bg-mayad-gold font-extrabold text-black shadow-glow-gold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage('HIN')}
                className={`rounded-full px-3 py-1 transition-all duration-200 ${
                  language === 'HIN'
                    ? 'bg-mayad-gold font-extrabold text-black shadow-glow-gold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
            </div>

            {/* ARTIST REGISTRATION CTA (Prominent vertical rectangular CTA) */}
            <Link
              href="/register"
              className={`group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-xl px-5 text-[13px] font-extrabold tracking-wide uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mayad-gold/80 active:scale-95 ${
                isJoinActive
                  ? 'bg-mayad-gold text-black shadow-[0_0_25px_rgba(245,197,24,0.4)]'
                  : 'bg-mayad-gold text-black shadow-[0_0_20px_rgba(245,197,24,0.25)] hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(245,197,24,0.5)]'
              }`}
            >
              <span>{language === 'HIN' ? 'आर्टिस्ट रजिस्ट्रेशन' : 'Artist Registration'}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            {/* MOBILE LANGUAGE */}
            <div className="relative flex items-center rounded-full border border-white/15 bg-black/40 p-0.5 text-[11px] font-bold text-white shadow-inner backdrop-blur-md">
              <button
                onClick={() => setLanguage('ENG')}
                className={`rounded-full px-2.5 py-0.5 transition-all duration-200 ${
                  language === 'ENG'
                    ? 'bg-mayad-gold font-extrabold text-black shadow-glow-gold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                ENG
              </button>
              <button
                onClick={() => setLanguage('HIN')}
                className={`rounded-full px-2.5 py-0.5 transition-all duration-200 ${
                  language === 'HIN'
                    ? 'bg-mayad-gold font-extrabold text-black shadow-glow-gold'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
            </div>

            {/* MOBILE SEARCH */}
            <button
              onClick={openSearch}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/15 text-slate-200 transition-all hover:text-mayad-gold hover:border-mayad-gold/50 active:scale-95"
              aria-label="Search"
              title="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mayad-gold text-black shadow-[0_0_15px_rgba(245,197,24,0.4)] transition-all hover:scale-105 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 stroke-[2.5]" />
              ) : (
                <Menu className="h-5 w-5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE MENU DRAWER
      ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex w-full flex-col justify-between overflow-y-auto bg-[#070A14]/98 p-5 backdrop-blur-2xl md:hidden"
          >
            <div>
              {/* MOBILE DRAWER HEADER */}
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="relative h-9 w-32 shrink-0">
                  <Image
                    src="/mayadlogo.jpg"
                    alt="MAYAD Logo"
                    fill
                    sizes="150px"
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-mayad-gold hover:bg-white/20 transition-all"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* MOBILE LANGUAGE SWITCHER */}
              <div className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3.5 shadow-lg">
                <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Globe className="h-4 w-4 text-mayad-gold" />
                  <span>{t('languageLabel')}:</span>
                </span>
                <div className="flex items-center rounded-full border border-white/15 bg-black/60 p-1 text-xs font-bold shadow-inner">
                  <button
                    onClick={() => setLanguage('ENG')}
                    className={`rounded-full px-3.5 py-1 transition-all ${
                      language === 'ENG'
                        ? 'bg-mayad-gold font-extrabold text-black shadow-glow-gold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ENG
                  </button>
                  <button
                    onClick={() => setLanguage('HIN')}
                    className={`rounded-full px-3.5 py-1 transition-all ${
                      language === 'HIN'
                        ? 'bg-mayad-gold font-extrabold text-black shadow-glow-gold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              </div>

              {/* MOBILE NAV LINKS */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all ${
                        isActive
                          ? 'bg-mayad-gold text-black shadow-glow-gold'
                          : 'text-slate-200 hover:bg-white/10 hover:text-mayad-gold'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <div className="h-2 w-2 rounded-full bg-black" />}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* MOBILE ARTIST REGISTRATION CTA */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-5 py-3.5 text-base font-extrabold uppercase tracking-wider text-black shadow-[0_4px_25px_rgba(245,197,24,0.4)] transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>{language === 'HIN' ? 'आर्टिस्ट रजिस्ट्रेशन' : 'Artist Registration'}</span>
                <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
