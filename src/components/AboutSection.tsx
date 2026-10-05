'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Film, Globe, Sparkles, Heart, Flame, Smartphone } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AboutSection() {
  const { t, language } = useApp();
  const isHin = language === 'HIN';

  const highlights = [
    {
      icon: Film,
      title: isHin ? 'राजस्थानी सिनेमा' : 'Rajasthani Cinema',
      text: isHin ? 'स्थानीय फिल्म निर्माताओं और सिनेमाई रचनाकारों को सशक्त बनाना।' : 'Empowering local filmmakers and cinematic creators.'
    },
    {
      icon: Globe,
      title: isHin ? 'वैश्विक वितरण' : 'Global Distribution',
      text: isHin ? '50+ देशों में फैले राजस्थानी समुदाय तक पहुंचना।' : 'Reaching the Rajasthani diaspora across 50+ countries.'
    },
    {
      icon: Sparkles,
      title: isHin ? 'प्रामाणिक भाषा' : 'Authentic Language',
      text: isHin ? 'मूल मारवाड़ी, मेवाड़ी और शेखावाटी बोलियों का जश्न।' : 'Celebrating native Marwari, Mewari & Shekhawati dialects.'
    },
    {
      icon: Heart,
      title: isHin ? 'उभरती प्रतिभाएं' : 'Emerging Talent',
      text: isHin ? 'अभिनेताओं, गायकों, लेखकों और लोक कलाकारों को मंच।' : 'Spotlighting actors, singers, writers & folk artistes.'
    },
  ];

  const creationPoints = isHin ? [
    'राजस्थानी सिनेमा को उसकी अपनी डिजिटल पहचान देना',
    'राजस्थानी भाषा और संस्कृति को बढ़ावा देना और संरक्षित करना',
    'फिल्म निर्माताओं और कलाकारों के लिए मंच प्रदान करना',
    'नए अभिनेताओं, लेखकों, निर्देशकों और तकनीशियनों की खोज और विकास करना',
    'युवा दर्शकों को राजस्थान की भाषा और संस्कृति से जोड़ना',
    'राजस्थानी कहानियों और सिनेमा को पूरे भारत और अंतरराष्ट्रीय स्तर पर ले जाना',
    'एक टिकाऊ राजस्थानी मनोरंजन और फिल्म इकोसिस्टम बनाना',
  ] : [
    'Give Rajasthani cinema its own digital identity',
    'Promote and preserve the Rajasthani language and culture',
    'Provide a platform for filmmakers and artists',
    'Discover and develop new actors, writers, directors and technicians',
    'Connect young audiences with Rajasthan’s language and culture',
    'Take Rajasthani stories and cinema to audiences across India and internationally',
    'Build a sustainable Rajasthani entertainment and film ecosystem',
  ];

  const visionPoints = isHin ? [
    'राजस्थानी फीचर फिल्में',
    'शॉर्ट फिल्में',
    'वेब सीरीज',
    'ओरिजिनल म्यूजिक',
    'सांस्कृतिक और ऐतिहासिक कहानियां',
    'नई प्रतिभाओं की खोज',
    'एक्टिंग वर्कशॉप और ऑडिशन',
    'फिल्म प्रोडक्शन',
    'डिजिटल वितरण',
    'उभरते कलाकारों और तकनीशियनों के लिए अवसर',
  ] : [
    'Rajasthani feature films',
    'Short films',
    'Web series',
    'Original music',
    'Cultural & historical stories',
    'New talent discovery',
    'Acting workshops & auditions',
    'Film production',
    'Digital distribution',
    'Opportunities for emerging artists & technicians',
  ];

  return (
    <section className="py-20 relative bg-gradient-to-b from-[#050816] via-[#0B0F28] to-[#050816] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D1226]/80 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-mayad-royal/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Logo Anchor */}
            <div className="relative w-36 h-12 mb-6">
              <Image
                src="/mayad.jpg"
                alt="MAYAD Brand Logo"
                fill
                className="object-contain object-left"
              />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
              {t('aboutTitle')}
            </h2>

            <p className="text-lg sm:text-xl text-mayad-gold font-semibold mb-4">
              {t('aboutSubtitle')}
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              {t('aboutContent1')}
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="p-2 bg-mayad-gold/20 rounded-lg text-mayad-gold">
                    <h.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{h.title}</h4>
                    <p className="text-xs text-mayad-muted mt-0.5">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-mayad-gold to-mayad-goldHover text-black font-bold text-base rounded-full shadow-glow-gold hover:scale-105 transition-transform"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>{isHin ? 'मायड़ को जानें' : 'Discover MAYAD'}</span>
            </Link>
          </div>
        </div>

        {/* MAYAD Studios / MAYAD OTT Ecosystem Section */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-mayad-gold">
              MAYAD Studios / MAYAD OTT
            </p>
            <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isHin ? 'राजस्थान के लिए डिजिटल इकोसिस्टम का निर्माण' : 'Building a digital ecosystem for Rajasthan'}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              {isHin
                ? 'राजस्थानी सिनेमा, भाषा, संस्कृति और उभरती रचनात्मक प्रतिभा के इर्द-गिर्द बनाया गया मंच।'
                : 'A platform created around Rajasthani cinema, language, culture and emerging creative talent.'}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0D1226]/80 p-6 sm:p-8 backdrop-blur-sm">
              <h4 className="text-2xl font-black text-white">
                {isHin ? 'मायड़ क्यों बनाया गया' : 'Why MAYAD was created'}
              </h4>

              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                {isHin
                  ? 'राजस्थान का एक समृद्ध इतिहास, भाषा, संस्कृति, लोक परंपराएं और कहानी कहने की विरासत है। मायड़ को राजस्थानी रचनाकारों और कहानियों को एक समर्पित डिजिटल पहचान और व्यावसायिक मंच प्रदान करने के लिए बनाया गया था।'
                  : 'Rajasthan has a rich history, language, culture, folk traditions and storytelling heritage. MAYAD was created to provide Rajasthani creators and stories with a dedicated digital identity and professional space.'}
              </p>

              <ul className="mt-6 space-y-3">
                {creationPoints.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mayad-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-mayad-gold/20 bg-gradient-to-br from-mayad-gold/10 via-[#0D1226]/60 to-transparent p-6 sm:p-8 backdrop-blur-sm">
              <h4 className="text-2xl font-black text-white">
                {isHin ? 'भविष्य का दृष्टिकोण' : 'Future vision'}
              </h4>

              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                {isHin
                  ? 'दीर्घकालिक दृष्टिकोण राजस्थान के लिए एक संपूर्ण डिजिटल मनोरंजन पारिस्थितिकी तंत्र का निर्माण करना है।'
                  : 'The long-term vision is to build a complete digital entertainment ecosystem for Rajasthan.'}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visionPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MAYAD Reach Section */}
        <div className="mt-16 sm:mt-20">
          <div className="rounded-3xl border border-white/10 bg-[#0D1226]/80 p-6 sm:p-10 backdrop-blur-sm shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mayad-gold">
              MAYAD Reach
            </p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-5xl font-black text-white sm:text-6xl">
                7,000+
              </span>
              <span className="pb-2 text-sm text-slate-400">
                {isHin ? 'वर्तमान आंतरिक डाउनलोड मील का पत्थर' : 'current internal download milestone'}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base max-w-3xl">
              {isHin
                ? 'MAYAD एंड्रॉइड और iOS दोनों पर उपलब्ध है। सार्वजनिक गूगल प्ले लिस्टिंग एक अलग राउंडेड डाउनलोड काउंटर दिखा सकती है; 7,000+ को यहां वर्तमान आंतरिक मील के पत्थर के रूप में प्रस्तुत किया गया है।'
                : 'MAYAD is available on Android and iOS. The public Google Play listing may display a different rounded download counter; 7,000+ is presented here as the current internal milestone.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.mayad.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20 hover:scale-105"
              >
                <Smartphone className="h-4 w-4 text-mayad-gold" />
                Google Play
              </a>

              <a
                href="https://apps.apple.com/in/app/mayad/id6759036727"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20 hover:scale-105"
              >
                <Smartphone className="h-4 w-4 text-mayad-gold" />
                App Store
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


