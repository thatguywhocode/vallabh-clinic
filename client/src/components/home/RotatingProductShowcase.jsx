import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import Badge from '../common/Badge';

const FEATURED_ITEMS = [
  {
    id: 'vc-prod-001',
    name: 'Triphala Cleanse & Gut Harmonizer',
    subtitle: 'Standardized Triphala Phyto-Extract with Amla',
    price: 449,
    volume: '100g Powder Jar',
    categoryName: 'Digestive Health',
    image: '/products/triphala-cleanse.svg',
    accent: '#49614D',
  },
  {
    id: 'vc-prod-002',
    name: 'Ashwagandha & Brahmi Stress Calmer',
    subtitle: 'Full-Spectrum Adaptogen Formulation',
    price: 599,
    volume: '60 Veg Capsules',
    categoryName: 'Stress & Sleep',
    image: '/products/ashwagandha-capsules.svg',
    accent: '#5D4F3F',
  },
  {
    id: 'vc-prod-004',
    name: 'Kumkumadi Radiance Botanical Face Oil',
    subtitle: 'Kashmiri Saffron & Sandalwood Extract',
    price: 899,
    volume: '30ml Luxury Dropper',
    categoryName: 'Dermal Care',
    image: '/products/kumkumadi-face-oil.svg',
    accent: '#E83F35',
  },
  {
    id: 'vc-prod-003',
    name: 'Wild Amla & Tulsi C-Immune Drops',
    subtitle: 'Fresh Indian Gooseberry & Holy Basil Bio-Actives',
    price: 389,
    volume: '50ml Dropper Bottle',
    categoryName: 'Immunity & Vitality',
    image: '/products/amla-tulsi-drops.svg',
    accent: '#49614D',
  },
  {
    id: 'vc-prod-005',
    name: 'Chamomile & Shankhpushpi Night Tea',
    subtitle: 'Whole-Flower Chamomile & Ayurvedic Herbs',
    price: 349,
    volume: '20 Pyramid Infusers',
    categoryName: 'Stress & Sleep',
    image: '/products/chamomile-night-tea.svg',
    accent: '#5D4F3F',
  },
];

export default function RotatingProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Check reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Single source of truth for timer scheduling (transitions every 3.5 seconds)
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!isPaused && !prefersReducedMotion) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
      }, 3500);
    }
  }, [isPaused, prefersReducedMotion]);

  // Start rotation on mount and whenever pause status changes
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resetTimer]);

  // Pause when browser tab is inactive and resume when focused
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
    resetTimer();
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    resetTimer();
  };

  const activeProduct = FEATURED_ITEMS[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center select-none"
    >
      {/* Studio Pedestal Backdrop with Perspective */}
      <div className="relative w-full aspect-square max-w-[420px] rounded-full bg-gradient-to-b from-[#FCFBF8] via-[#F7F5EF] to-[#E9E4D8] border border-[#CBD5CD]/70 shadow-soft-md flex items-center justify-center p-4 overflow-hidden">
        {/* Floating Top Badge */}
        <div className="absolute top-4 right-5 z-40 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-warm-300 shadow-soft-sm flex items-center gap-1.5 text-[11px] font-semibold text-[#49614D]">
          <Leaf className="w-3.5 h-3.5 text-emerald-700" />
          <span>Botanical Spotlight</span>
        </div>

        {/* Ambient Halo & Concentric Pedestal Rings */}
        <div className="absolute inset-8 rounded-full border border-dashed border-[#CBD5CD]/40 pointer-events-none" />
        <div className="absolute inset-16 rounded-full border border-[#CBD5CD]/30 pointer-events-none" />

        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-[270px] sm:h-[300px] flex items-center justify-center"
          style={{ perspective: 1000 }}
        >
          {FEATURED_ITEMS.map((item, idx) => {
            const count = FEATURED_ITEMS.length;
            let diff = (idx - activeIndex + count) % count;
            if (diff > count / 2) diff -= count;

            const isCenter = diff === 0;
            const isRight = diff === 1;
            const isLeft = diff === -1;
            const isVisible = isCenter || isRight || isLeft;

            // Compute 3D layered positioning
            let translateX = 0;
            let translateY = 0;
            let scale = 0.6;
            let rotateY = 0;
            let opacity = 0;
            let zIndex = 10;

            if (isCenter) {
              translateX = 0;
              translateY = -8;
              scale = 1.0;
              rotateY = 0;
              opacity = 1;
              zIndex = 30;
            } else if (isRight) {
              translateX = 115;
              translateY = 14;
              scale = 0.74;
              rotateY = -20;
              opacity = 0.72;
              zIndex = 20;
            } else if (isLeft) {
              translateX = -115;
              translateY = 14;
              scale = 0.74;
              rotateY = 20;
              opacity = 0.72;
              zIndex = 20;
            }

            if (!isVisible) {
              return null;
            }

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(idx);
                    resetTimer();
                  }
                }}
                animate={{
                  x: translateX,
                  y: translateY,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute w-44 sm:w-52 h-auto flex flex-col items-center justify-center cursor-pointer transition-shadow ${
                  isCenter ? 'pointer-events-auto drop-shadow-xl' : 'drop-shadow-md hover:opacity-90'
                }`}
                title={isCenter ? item.name : `Click to spotlight ${item.name}`}
              >
                <Link
                  to={`/products/${item.id}`}
                  onClick={(e) => {
                    if (!isCenter) {
                      e.preventDefault();
                      setActiveIndex(idx);
                      resetTimer();
                    }
                  }}
                  className="block w-full focus:outline-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full max-h-56 sm:max-h-64 object-contain select-none"
                    loading="eager"
                  />
                </Link>

                {/* Ground Reflection Shadow */}
                <div
                  className={`w-3/4 h-3.5 rounded-full bg-[#1C251E]/15 blur-sm mt-1 transition-opacity ${
                    isCenter ? 'opacity-100' : 'opacity-40'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Featured Botanical Formulation"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#1C251E] hover:text-[#49614D] border border-warm-300 shadow-soft-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#49614D]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Featured Botanical Formulation"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#1C251E] hover:text-[#49614D] border border-warm-300 shadow-soft-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#49614D]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Featured Product Info Card (Always in Sync) */}
      <div className="w-full max-w-sm mt-4 bg-white/95 backdrop-blur-xs rounded-2xl p-4 border border-[#CBD5CD]/80 shadow-soft-sm text-center space-y-2 relative z-30 transition-all duration-300">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-earth-500">
          <span className="text-[#49614D] font-bold">{activeProduct.categoryName}</span>
          <span className="font-mono text-earth-400">{activeProduct.volume}</span>
        </div>

        <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C251E] leading-snug line-clamp-1">
          {activeProduct.name}
        </h3>

        <p className="text-xs text-earth-600 line-clamp-1">
          {activeProduct.subtitle}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-warm-200">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-earth-500 block">Sample Price</span>
            <span className="font-serif text-xl font-bold text-[#1C251E]">₹{activeProduct.price}</span>
          </div>

          <Link to={`/products/${activeProduct.id}`}>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#49614D] hover:bg-[#3D5240] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Carousel Dots Navigation */}
      <div className="flex items-center gap-1.5 mt-3 z-30">
        {FEATURED_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveIndex(idx);
              resetTimer();
            }}
            aria-label={`Go to slide ${idx + 1}: ${item.name}`}
            className={`transition-all rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-6 h-2 bg-[#49614D]'
                : 'w-2 h-2 bg-warm-300 hover:bg-warm-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
