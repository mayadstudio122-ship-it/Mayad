'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useApp } from '@/context/AppContext';
import { MOVIES_LIST, MovieItem } from '@/data/movie';
import { getBackendUrl } from '@/utils/config';

const BACKEND_URL = getBackendUrl();

export default function SearchModal() {
  const { isSearchOpen, closeSearch, openSearch, playVideo, t } = useApp();

  const [query, setQuery] = useState('');
  const [allMovies, setAllMovies] = useState<MovieItem[]>(MOVIES_LIST);
  const [results, setResults] = useState<MovieItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch backend movies and merge with static list
  useEffect(() => {
    let isMounted = true;
    const fetchBackendMovies = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/movies`);
        if (res.ok) {
          const data = await res.json();
          const backendList = data.movies || data.data || (Array.isArray(data) ? data : []);
          if (Array.isArray(backendList) && backendList.length > 0 && isMounted) {
            const combinedMap = new Map<string, MovieItem>();
            MOVIES_LIST.forEach((m) => combinedMap.set(m.slug || m.id, m));
            backendList.forEach((bm: any) => {
              const key = bm.slug || bm._id || bm.id;
              combinedMap.set(key, {
                id: bm._id || bm.id || key,
                slug: bm.slug || key,
                title: bm.title,
                originalTitle: bm.originalTitle || bm.titleHin,
                posterUrl: bm.posterUrl || bm.thumbnail || '/mayadlogo.jpg',
                type: bm.type || 'movie',
                category: bm.category,
                language: bm.language,
                year: bm.releaseYear || bm.year,
                genre: bm.genre,
                description: bm.description || bm.synopsis,
                cast: bm.cast,
                director: bm.director,
              });
            });
            setAllMovies(Array.from(combinedMap.values()));
          }
        }
      } catch (err) {
        // Fallback silently to static list
      }
    };

    fetchBackendMovies();
    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard shortcut Ctrl+K to open & Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else openSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, openSearch, closeSearch]);

  // Focus input on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  // Search filtering logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const q = query.toLowerCase().trim();

      const filtered = allMovies.filter((movie) => {
        const matchesTitle = movie.title?.toLowerCase().includes(q);
        const matchesOriginalTitle = movie.originalTitle?.toLowerCase().includes(q);
        const matchesCategory = movie.category?.toLowerCase().includes(q);
        const matchesGenre = movie.genre?.toLowerCase().includes(q);
        const matchesLanguage = movie.language?.toLowerCase().includes(q);
        const matchesDescription = movie.description?.toLowerCase().includes(q);
        const matchesDirector = movie.director?.toLowerCase().includes(q);

        const matchesCast = Array.isArray(movie.cast)
          ? movie.cast.some((c) => String(c).toLowerCase().includes(q))
          : typeof movie.cast === 'string' && (movie.cast as string).toLowerCase().includes(q);

        return (
          matchesTitle ||
          matchesOriginalTitle ||
          matchesCategory ||
          matchesGenre ||
          matchesLanguage ||
          matchesDescription ||
          matchesDirector ||
          matchesCast
        );
      });

      setResults(filtered);
    }, 150);

    return () => clearTimeout(timer);
  }, [query, allMovies]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeSearch}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        className="
          relative
          w-full
          max-w-3xl
          bg-[#0D1226]
          border border-amber-500/30
          rounded-2xl
          overflow-hidden
          shadow-2xl
          shadow-amber-500/10
          z-10
          p-5 sm:p-6
          my-auto sm:my-0
        "
      >
        {/* SEARCH BAR */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-4 w-5 h-5 text-mayad-gold" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder') || 'Search movies, shows, artists...'}
            className="
              w-full
              bg-[#050816]
              text-white
              placeholder-slate-400
              text-base sm:text-lg
              pl-12
              pr-12
              py-4
              rounded-xl
              border border-white/10
              focus:border-mayad-gold
              focus:ring-1
              focus:ring-mayad-gold/50
              focus:outline-none
              transition-all
            "
          />

          {query ? (
            <button
              onClick={() => setQuery('')}
              className="absolute right-12 text-slate-400 hover:text-white p-1"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          <button
            onClick={closeSearch}
            className="
              absolute
              right-4
              text-slate-400
              hover:text-white
              p-1
              rounded-lg
              hover:bg-white/10
              transition-colors
            "
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH OUTPUT */}
        <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-4">
          {!query.trim() ? (
            <div className="text-center py-8">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Popular Searches on MAYAD
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Vadlya Hindwa',
                  'Seth Maharo Sanwariya',
                  'Maa Padmavati',
                  'Sawariya Seth',
                  'Dada Laad Ladaya',
                  'Tara Shree',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="
                      px-3.5
                      py-1.5
                      rounded-xl
                      bg-white/5
                      hover:bg-mayad-gold/20
                      hover:text-mayad-gold
                      hover:border-mayad-gold/40
                      text-xs
                      font-medium
                      text-slate-300
                      transition-all
                      border border-white/10
                    "
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-300 text-base font-medium">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Try searching for a movie title, genre, category, or artist name.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  className="
                    flex
                    items-center
                    gap-3.5
                    bg-[#050816]
                    p-3
                    rounded-xl
                    border border-white/5
                    hover:border-mayad-gold/50
                    hover:bg-white/[0.02]
                    transition-all
                    group
                  "
                >
                  {/* Poster */}
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                    <Image
                      src={movie.posterUrl || '/mayadlogo.jpg'}
                      alt={movie.title}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Movie Information */}
                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-extrabold text-mayad-gold uppercase tracking-wider">
                      {movie.category || 'Movie'}
                    </span>

                    <h4 className="text-white font-bold text-sm truncate group-hover:text-mayad-gold transition-colors">
                      {movie.title}
                    </h4>

                    {movie.originalTitle && (
                      <p className="text-slate-400 text-xs truncate mt-0.5 font-medium">
                        {movie.originalTitle}
                      </p>
                    )}

                    {movie.description && (
                      <p className="text-slate-500 text-[11px] line-clamp-1 mt-0.5">
                        {movie.description}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => {
                          closeSearch();
                          playVideo(movie);
                        }}
                        className="flex items-center gap-1 text-xs font-bold text-mayad-gold hover:underline"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Watch Now
                      </button>

                      <Link
                        href={`/movies/${movie.slug}`}
                        onClick={closeSearch}
                        className="text-xs text-slate-400 hover:text-white font-medium"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}