'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  const isStandalonePage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password' ||
    (pathname?.startsWith('/artist') && !pathname?.startsWith('/artists')) ||
    pathname?.startsWith('/artist-portal') ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/d148b489-49a3-4eae-9e82-ccf473893d6d');

  if (isStandalonePage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </>
  );
}