import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';

const FEATURED_ITEMS = [
  {
    id: 'vc-prod-001',
    code: 'FORMULATION 01',
    name: 'Triphala Cleanse & Gut Harmonizer',
    botanicalClass: 'Digestive Rasayana',
    subtitle: 'Standardized Triphala Phyto-Extract with Certified Organic Amla',
    actives: ['Organic Amalaki', 'Haritaki Extract', 'Bibhitaki Extract'],
    price: 449,
    volume: '100g Powder Jar',
    categoryName: 'Digestive Health',
    image: '/products/triphala-cleanse.svg',
    accent: '#49614D',
    ambientGlow: 'rgba(73, 97, 77, 0.18)',
    botanicalSvg: '/botanicals/tulsi-leaf.svg',
    botanicalSecondary: '/botanicals/amla-fruit.svg',
    shortName: 'Triphala Cleanse',
  },
  {
    id: 'vc-prod-002',
    code: 'FORMULATION 02',
    name: 'Ashwagandha & Brahmi Stress Calmer',
    botanicalClass: 'Adaptogenic Complex',
    subtitle: 'Full-Spectrum KSM-66 Adaptogenic Extract with Bacopa',
    actives: ['KSM-66 Ashwagandha (5%)', 'Brahmi Leaf', 'Shankhpushpi'],
    price: 599,
    volume: '60 Veg Capsules',
    categoryName: 'Stress & Sleep',
    image: '/products/ashwagandha-capsules.svg',
    accent: '#5D4F3F',
    ambientGlow: 'rgba(93, 79, 63, 0.18)',
    botanicalSvg: '/botanicals/ashwagandha-root.svg',
    botanicalSecondary: '/botanicals/brahmi-leaf.svg',
    shortName: 'Ashwagandha Calm',
  },
  {
    id: 'vc-prod-004',
    code: 'FORMULATION 03',
    name: 'Kumkumadi Radiance Botanical Face Oil',
    botanicalClass: 'Phyto-Nutrient Dermal Elixir',
    subtitle: 'Kashmiri Saffron & Sandalwood Herbal Infusion',
    actives: ['Kashmiri Mongra Saffron', 'Red Sandalwood', 'Blue Lotus'],
    price: 899,
    volume: '30ml Luxury Dropper',
    categoryName: 'Dermal Care',
    image: '/products/kumkumadi-face-oil.svg',
    accent: '#B85E38',
    ambientGlow: 'rgba(184, 94, 56, 0.20)',
    botanicalSvg: '/botanicals/saffron-threads.svg',
    botanicalSecondary: null,
    shortName: 'Kumkumadi Oil',
  },
  {
    id: 'vc-prod-003',
    code: 'FORMULATION 04',
    name: 'Wild Amla & Tulsi C-Immune Drops',
    botanicalClass: 'Bio-Active Vitamin C Extract',
    subtitle: 'Fresh Indian Gooseberry & Holy Basil Bio-Actives',
    actives: ['Wild Amla Bio-Actives', 'Holy Basil (Tulsi)', 'Pippali'],
    price: 389,
    volume: '50ml Dropper Bottle',
    categoryName: 'Immunity & Vitality',
    image: '/products/amla-tulsi-drops.svg',
    accent: '#49614D',
    ambientGlow: 'rgba(73, 97, 77, 0.18)',
    botanicalSvg: '/botanicals/amla-fruit.svg',
    botanicalSecondary: '/botanicals/tulsi-leaf.svg',
    shortName: 'Wild Amla Drops',
  },
  {
    id: 'vc-prod-005',
    code: 'FORMULATION 05',
    name: 'Chamomile & Shankhpushpi Night Tea',
    botanicalClass: 'Nocturnal Infusion Blend',
    subtitle: 'Whole-Flower Chamomile & Ayurvedic Herbs',
    actives: ['Whole-Flower Chamomile', 'Shankhpushpi Aerials', 'Licorice Root'],
    price: 349,
    volume: '20 Pyramid Infusers',
    categoryName: 'Rest & Relaxation',
    image: '/products/chamomile-night-tea.svg',
    accent: '#6E5D4B',
    ambientGlow: 'rgba(110, 93, 75, 0.18)',
    botanicalSvg: '/botanicals/chamomile-flower.svg',
    botanicalSecondary: null,
    shortName: 'Night Tea',
  },
];

export default function RotatingProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const timerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (!isHoveredRef.current && !document.hidden) {
        setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
      }
    }, 4500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!document.hidden) {
        startTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [startTimer]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + FEATURED_ITEMS.length) % FEATURED_ITEMS.length);
    startTimer();
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length);
    startTimer();
  };

  const handleSelect = (idx) => {
    setActiveIndex(idx);
    startTimer();
  };

  const activeProduct = FEATURED_ITEMS[activeIndex];

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        isHoveredRef.current = false;
      }}
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center select-none"
    >
      {/* ================= THE BOTANICAL PRODUCT ATELIER ================= */}
      {/* Unified, single cohesive luxury composition: Pedestal, Artwork & Integrated Specifications */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#FCFBF8] via-[#F8F6F1] to-[#EFECE3] border border-[#CBD5CD]/70 shadow-[0_20px_50px_rgba(73,97,77,0.09)] overflow-hidden p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all">
        
        {/* Ambient Studio Lighting (Stable top-left warm key light) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 20% 15%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.35) 45%, transparent 75%)`,
          }}
        />

        {/* Dynamic Warm Ambient Backlight Tailored to Active Botanical Hue */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full blur-[75px] pointer-events-none transition-all duration-700"
          style={{ backgroundColor: activeProduct.ambientGlow }}
        />

        {/* Soft Botanical Leaf Shadows (Subtle Dappled Foliage) */}
        <div className="absolute -top-12 -right-12 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#49614D]/5 blur-[50px] pointer-events-none" />
        <div className="absolute bottom-1/3 -left-12 w-44 sm:w-56 h-44 sm:h-56 rounded-full bg-[#CBD5CD]/20 blur-[60px] pointer-events-none" />

        {/* 1. Atelier Top Header: Formulation Code & Botanical Badge */}
        <div className="relative z-20 flex items-center justify-between pb-3 border-b border-[#CBD5CD]/50">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-earth-700 font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E83F35]" />
            <span>{activeProduct.code}</span>
            <span className="hidden sm:inline text-earth-400">•</span>
            <span className="hidden sm:inline text-[#49614D] font-sans font-semibold normal-case tracking-normal">
              {activeProduct.botanicalClass}
            </span>
          </div>

          <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-warm-300 shadow-soft-sm flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#49614D]">
            <Leaf className="w-3 h-3 text-[#49614D]" />
            <span>Botanical Atelier</span>
          </div>
        </div>

        {/* 2. Central Stage: Warm Ivory Stone Pedestal & Authentic Packaging SVG Artwork */}
        <div className="relative w-full h-[280px] sm:h-[330px] md:h-[360px] flex items-center justify-center my-1 z-10">
          
          {/* Subtle Herbal Silhouette Atmosphere */}
          {activeProduct.botanicalSvg && (
            <motion.img
              key={`atelier-herb-${activeProduct.id}-1`}
              src={activeProduct.botanicalSvg}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 0.16, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute -top-2 left-4 w-28 sm:w-36 h-28 sm:h-36 object-contain pointer-events-none filter blur-[0.4px]"
            />
          )}

          {/* Synchronized Crossfading Packaging Artwork */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center justify-center w-full z-20"
            >
              <Link 
                to={`/products/${activeProduct.id}`}
                className="relative block focus:outline-none group cursor-pointer"
                title={`Explore ${activeProduct.name}`}
              >
                {/* Large Prominent Packaging Artwork */}
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-auto h-[220px] sm:h-[260px] md:h-[290px] object-contain drop-shadow-xl select-none transition-transform duration-500 group-hover:scale-[1.025]"
                  loading="eager"
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* The Architectural Warm Ivory Stone Pedestal */}
          <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none z-10">
            {/* Top Surface of the Stone Plinth */}
            <div className="w-56 sm:w-72 md:w-80 h-7 rounded-[50%] bg-gradient-to-b from-[#FAF8F5] via-[#EFECE1] to-[#DDD7C8] border-t border-white/90 shadow-sm" />
            {/* Plinth Base Bevel */}
            <div className="w-60 sm:w-76 md:w-84 h-4 rounded-[50%] bg-[#D5CEC0]/70 -mt-2.5 shadow-inner" />
            {/* Soft Ambient Ground Contact Shadow */}
            <div className="w-64 sm:w-80 md:w-92 h-5 bg-[#1C251E]/18 blur-md rounded-[50%] -mt-1.5" />
          </div>

          {/* Subtle Carousel Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Botanical Formulation"
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#1C251E] hover:text-[#49614D] border border-warm-300 shadow-soft-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#49614D]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Botanical Formulation"
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#1C251E] hover:text-[#49614D] border border-warm-300 shadow-soft-sm flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#49614D]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3. Integrated Product Editorial Presentation (Unified in same composition) */}
        <div className="relative z-20 pt-4 sm:pt-5 border-t border-[#CBD5CD]/60 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`details-${activeProduct.id}`}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 8 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8 }
              }
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-3"
            >
              {/* Botanical Actives & Package Volume */}
              <div className="flex items-center justify-between text-[11px] font-sans text-earth-600">
                <span className="font-medium truncate max-w-[70%] text-[#49614D]">
                  {activeProduct.actives.join(' • ')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-earth-500 shrink-0 font-semibold">
                  {activeProduct.volume}
                </span>
              </div>

              {/* Title & Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1C251E] font-normal leading-tight">
                    {activeProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#1C251E]">
                      ₹{activeProduct.price}
                    </span>
                    <span className="text-[10px] text-earth-500 font-mono uppercase tracking-wider">
                      INR • Non-Prescription OTC
                    </span>
                  </div>
                </div>

                <Link to={`/products/${activeProduct.id}`} className="shrink-0">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#49614D] hover:bg-[#3D5240] text-white text-xs sm:text-sm font-semibold shadow-soft-sm transition-all cursor-pointer group"
                  >
                    <span>View Formulation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Atelier Navigation Formulation Selector Strip */}
        <div className="relative z-20 pt-4 mt-3 border-t border-[#CBD5CD]/40 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          {FEATURED_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#49614D] text-white shadow-soft-sm font-semibold'
                    : 'bg-white/70 hover:bg-white text-earth-700 hover:text-[#1C251E] border border-warm-300/80'
                }`}
                aria-label={`Select ${item.name}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#E83F35]' : 'bg-earth-300'}`} />
                <span>{item.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
