import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Leaf, 
  Stethoscope, 
  CheckCircle2, 
  ChevronRight,
  Clock,
  HeartHandshake,
  Moon
} from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import ProductCard from '../components/common/ProductCard';
import RotatingProductShowcase from '../components/home/RotatingProductShowcase';
import BotanicalScrollytelling from '../components/home/BotanicalScrollytelling';
import { CATEGORIES } from '../data/products';
import { useDemoData } from '../context/DemoDataContext';

// Category thumbnail mapping using actual SVG mockups
const CATEGORY_IMAGES = {
  vitality: '/products/amla-tulsi-drops.svg',
  digestion: '/products/triphala-cleanse.svg',
  stress: '/products/ashwagandha-capsules.svg',
  skin: '/products/kumkumadi-face-oil.svg',
  joint: '/products/shallaki-joint-balm.svg',
};

export default function HomePage() {
  const { products } = useDemoData();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const heroVideoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Display 6 to 8 products from demo catalog
  const filteredProducts = activeCategoryFilter === 'all'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === activeCategoryFilter);

  // Performance: Pause hero video when out of viewport
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause();
          } else {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Support direct isolated preview for visual testing and inspection
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const isScrollyPreview = searchParams && searchParams.has('preview_scrolly');
  const previewSection = searchParams ? searchParams.get('preview_section') : null;

  if (isScrollyPreview) {
    return (
      <div className="w-full min-h-screen bg-[#1C251E]">
        <BotanicalScrollytelling />
      </div>
    );
  }

  if (previewSection === 'featured-products') {
    return (
      <div className="w-full min-h-screen bg-[#FAF8F5] pt-8">
        <section id="featured-products" className="py-12 md:py-16 relative bg-[#FAF8F5] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,_rgba(73,97,77,0.045)_0%,_transparent_60%)] pointer-events-none" />
          <div className="absolute -left-10 top-16 w-56 h-56 pointer-events-none opacity-[0.15] z-0 overflow-hidden">
            <img src="/cinematic/botanical-dark-green-bg.jpg" alt="" className="w-full h-full object-cover rounded-full mix-blend-multiply" />
          </div>
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-[0.14] z-0 overflow-hidden">
            <img src="/cinematic/botanicals-leaf-formation-still.jpg" alt="" className="w-full h-full object-cover rounded-full mix-blend-multiply" />
          </div>
          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <Badge variant="botanical" className="mb-2">Verified Formulations</Badge>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C251E]">
                  Featured Botanical Essentials
                </h2>
                <p className="text-xs sm:text-sm text-earth-700 font-sans mt-1 max-w-xl">
                  Physician-reviewed non-prescription formulations with verified botanical ingredients, directions, and Indian Rupee sample prices.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      </div>
    );
  }

  if (previewSection === 'philosophy') {
    return (
      <div className="w-full min-h-screen bg-[#1C251E] pt-12">
        <section id="philosophy" className="py-20 relative bg-gradient-to-b from-[#1C251E] via-[#243327] to-[#1C251E] text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none select-none opacity-20 overflow-hidden">
            <img src="/cinematic/botanicals-leaf-formation-still.jpg" alt="" className="w-full h-full object-cover scale-110 filter blur-[0.6px]" />
          </div>
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E83F35]" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#F7F5EF] font-bold">
                  Clinical Botanical Philosophy
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white leading-tight">
                Rooted in Earth.{' '}
                <span className="italic font-serif text-emerald-300 block sm:inline">Verified by Science.</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-warm-200/90 font-sans leading-relaxed max-w-2xl mx-auto">
                Every preparation at VALLABH CLINIC begins with whole Indian botanicals harvested in peak micro-climates. We apply analytical chromatography to ensure guaranteed therapeutic active potencies with zero chemical fillers or artificial excipients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-14">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-3.5 text-left">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-serif text-lg font-bold">01</div>
                <h3 className="font-serif text-xl text-white font-normal">Standardized Active Markers</h3>
                <p className="text-xs text-warm-200/80 leading-relaxed font-sans">Every batch is standardized to verified bioactive concentrations &mdash; including withanolides in Ashwagandha, curcuminoids in Turmeric, and emblicanins in Wild Amla.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-3.5 text-left">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-serif text-lg font-bold">02</div>
                <h3 className="font-serif text-xl text-white font-normal">Cold Phyto-Extraction</h3>
                <p className="text-xs text-warm-200/80 leading-relaxed font-sans">Gentle aqueous and grain extraction methods protect delicate phytonutrients, polyphenols, and aromatic botanical essences from thermal degradation.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-3.5 text-left">
                <div className="w-10 h-10 rounded-2xl bg-[#E83F35]/20 text-rose-300 flex items-center justify-center font-serif text-lg font-bold">03</div>
                <h3 className="font-serif text-xl text-white font-normal">Physician-Supervised Regimens</h3>
                <p className="text-xs text-warm-200/80 leading-relaxed font-sans">Enjoy independent non-prescription checkout, or connect directly with clinic doctors for tailored botanical regimens and personalized patient portal care.</p>
              </div>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  if (previewSection === 'footer') {
    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-[#F7F5EF] via-[#384C3C] to-[#49614D] pt-12">
        <section className="relative pt-12 pb-20 text-white overflow-hidden">
          <Container className="relative z-10 text-center">
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white font-semibold">
                  Botanical Care Rituals
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
                Begin Your Daily Restorative Ritual
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-warm-100/90 font-sans leading-relaxed max-w-xl mx-auto">
                Join households across India receiving seasonal Ayurvedic wellness guidance, clinical herbal insights, and physician formulation dispatches.
              </p>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden font-sans">
      {/* Subtle Warm Canvas Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#49614D]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* 1. HERO SECTION: Editorial Botanical Staging with Ambient Floating Botanicals Video */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#CBD5CD]/50 overflow-hidden bg-[#FAF8F5]">
        {/* Ambient Floating Botanicals Video Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <video
            ref={heroVideoRef}
            src="/cinematic/botanicals-floating.mp4"
            poster="/cinematic/botanicals-floating-still.jpg"
            muted
            playsInline
            loop
            autoPlay={!prefersReducedMotion}
            className="w-full h-full object-cover opacity-35 md:opacity-40 transition-opacity duration-1000 scale-105"
            aria-hidden="true"
          />
          {/* Natural Studio Light Scrim: Guarantees 100% Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/96 via-[#FAF8F5]/90 to-[#FAF8F5]/70" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#49614D]/4 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-10 w-[500px] h-[350px] bg-[#E83F35]/3 blur-[140px] rounded-full" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
            {/* Left Column: Editorial Headline & Narrative */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-6 text-left">
              {/* Archival Dispensary Tag */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2.5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-warm-300 shadow-soft-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E83F35]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#49614D] font-bold">
                    Pure Phyto-Therapeutics • OTC
                  </span>
                </div>
              </motion.div>

              {/* Main Headline with Editorial Serif Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C251E] tracking-tight leading-[1.1]"
              >
                Thoughtful Care.{' '}
                <span className="italic font-serif font-normal text-[#49614D] block sm:inline">
                  Everyday Wellness.
                </span>
              </motion.h1>

              {/* Editorial Narrative */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="text-sm sm:text-base lg:text-lg text-[#41382E] leading-relaxed font-sans max-w-xl font-normal"
              >
                Doctor-formulated botanical preparations, standardized Ayurvedic extracts, and restorative daily rituals. Physician-reviewed for clinical purity, transparent sourcing, and everyday biological harmony.
              </motion.p>

              {/* Curated Botanical Standards (Editorial 3-Column Pill Bar) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 border-y border-[#CBD5CD]/60 text-left"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#49614D] block">
                    Standardized
                  </span>
                  <p className="text-xs text-earth-700 font-medium">Guaranteed active herbal marker potency</p>
                </div>
                <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[#CBD5CD]/60 pt-2 sm:pt-0 sm:pl-3">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#49614D] block">
                    100% Non-Prescription
                  </span>
                  <p className="text-xs text-earth-700 font-medium">Gentle daily OTC wellness formulations</p>
                </div>
                <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-[#CBD5CD]/60 pt-2 sm:pt-0 sm:pl-3">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#49614D] block">
                    Physician-Reviewed
                  </span>
                  <p className="text-xs text-earth-700 font-medium">Clinical herbal wisdom & zero filler</p>
                </div>
              </motion.div>

              {/* Primary Call-to-Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="pt-1 flex flex-wrap items-center gap-4"
              >
                <Link to="/products">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
                    className="bg-[#49614D] text-white hover:bg-[#3D5240] shadow-soft-sm"
                  >
                    Explore Collection
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('story');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="cursor-pointer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    icon={Stethoscope}
                    iconPosition="left"
                    className="border-[#49614D]/40 text-[#49614D] hover:bg-[#49614D]/5"
                  >
                    Our Clinical Story
                  </Button>
                </button>
              </motion.div>

              {/* Climate-Controlled Pan-India Dispatch Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-2 flex items-center gap-2 text-[11px] text-earth-600 font-mono"
              >
                <Truck className="w-3.5 h-3.5 text-[#49614D] shrink-0" />
                <span>Pan-India express dispatch • Free shipping on orders over ₹499</span>
              </motion.div>
            </div>

            {/* Right Column: Grand Editorial Studio Showcase Stage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center pt-4 lg:pt-0"
            >
              <RotatingProductShowcase />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. PINNED BOTANICAL SCROLLYTELLING: Floating -> Swirling -> Sacred Leaf Synthesis */}
      <BotanicalScrollytelling />

      {/* 3. FEATURED HEALTHCARE PRODUCTS (Directly Revealed from Scrollytelling's Warm Ivory Threshold) */}
      <section id="featured-products" className="py-20 md:py-28 relative bg-[#FAF8F5] overflow-hidden">
        {/* Subtle Botanical Shadows & Background Foliage Accents (Outer Edges Only, Never Covering Cards) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,_rgba(73,97,77,0.045)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,_rgba(232,63,53,0.025)_0%,_transparent_55%)] pointer-events-none" />

        {/* Delicate Botanical Leaf Entering Left Margin */}
        <div className="absolute -left-16 sm:-left-10 lg:-left-6 top-16 w-48 sm:w-64 h-48 sm:h-64 pointer-events-none select-none opacity-[0.14] z-0 overflow-hidden">
          <img
            src="/cinematic/botanical-dark-green-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover rounded-full mix-blend-multiply filter blur-[0.3px] rotate-45 transform"
          />
        </div>

        {/* Delicate Botanical Leaf Entering Right Margin */}
        <div className="absolute -right-16 sm:-right-10 lg:-right-6 top-1/2 -translate-y-1/2 w-56 sm:w-72 h-56 sm:h-72 pointer-events-none select-none opacity-[0.12] z-0 overflow-hidden">
          <img
            src="/cinematic/botanicals-leaf-formation-still.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover rounded-full mix-blend-multiply filter blur-[0.4px] -rotate-12 transform"
          />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge variant="botanical" className="mb-2">Verified Formulations</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C251E]">
                Featured Botanical Essentials
              </h2>
              <p className="text-xs sm:text-sm text-earth-700 font-sans mt-1 max-w-xl">
                Physician-reviewed non-prescription formulations with verified botanical ingredients, directions, and Indian Rupee sample prices.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-warm-200/60 rounded-2xl border border-warm-300">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategoryFilter === 'all'
                    ? 'bg-[#49614D] text-white shadow-soft-sm'
                    : 'text-earth-700 hover:text-[#1C251E]'
                }`}
              >
                All (8)
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryFilter(cat.id)}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                    activeCategoryFilter === cat.id
                      ? 'bg-[#49614D] text-white shadow-soft-sm'
                      : 'text-earth-700 hover:text-[#1C251E]'
                  }`}
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Staggered Product Grid Reveals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Catalog Link Banner */}
          <div className="mt-12 text-center space-y-2">
            <Link to="/products">
              <Button variant="outline" size="lg" icon={ArrowRight} iconPosition="right">
                Explore Full Healthcare Catalog (All Prices in ₹ INR)
              </Button>
            </Link>
            <p className="text-[11px] text-earth-500 font-sans">
              All listed items are non-prescription OTC wellness formulations. Complete ingredients and traditional Ayurvedic uses documented.
            </p>
          </div>
        </Container>
      </section>

      {/* 4. INTERACTIVE CATEGORY COLLECTIONS */}
      <section id="categories" className="py-20 bg-[#F4F1EA] border-y border-[#CBD5CD]/60 relative overflow-hidden">
        {/* Subtle Ambient Leaf Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#49614D]/4 blur-[100px] rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="botanical" className="mb-2">Care Collections</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C251E]">
                Explore by Botanical Category
              </h2>
              <p className="text-xs sm:text-sm text-earth-700 mt-1 max-w-lg">
                Targeted therapeutic herbal preparations formulated for balance, vitality, and cellular harmony.
              </p>
            </div>
            <Link
              to="/categories"
              className="text-xs font-bold text-[#49614D] hover:underline flex items-center gap-1 group shrink-0"
            >
              <span>View All Categories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {CATEGORIES.map((cat, idx) => {
              const catImage = CATEGORY_IMAGES[cat.id] || '/products/triphala-cleanse.svg';

              return (
                <motion.div
                  key={cat.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="bg-white rounded-3xl p-4 sm:p-5 border border-[#CBD5CD]/80 shadow-soft-sm hover:shadow-soft-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden relative h-full"
                  >
                    {/* Category Thumbnail Art */}
                    <div className="w-full h-28 sm:h-32 rounded-2xl bg-gradient-to-b from-[#FCFBF8] to-[#F7F5EF] border border-warm-200/80 p-2 flex items-center justify-center mb-3 group-hover:border-[#49614D]/40 transition-colors">
                      <img
                        src={catImage}
                        alt={cat.name}
                        className="max-h-full max-w-[80%] object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Title & Count */}
                    <div className="space-y-1">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#1C251E] group-hover:text-[#49614D] transition-colors leading-snug">
                        {cat.shortName}
                      </h3>
                      <p className="text-[11px] text-earth-500 line-clamp-1">
                        {cat.description}
                      </p>
                    </div>

                    {/* Footer Arrow */}
                    <div className="pt-3 mt-3 border-t border-warm-100 flex items-center justify-between text-[11px] font-semibold text-[#49614D]">
                      <span>{cat.itemCount} Formulations</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#49614D] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. BRAND PHILOSOPHY & BOTANICAL PARALLAX SECTION */}
      <section id="philosophy" className="py-24 md:py-32 relative bg-gradient-to-b from-[#1C251E] via-[#243327] to-[#1C251E] text-white overflow-hidden">
        {/* Large Botanical Leaf Silhouette Parallax Background */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20 overflow-hidden">
          <img
            src="/cinematic/botanicals-leaf-formation-still.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-110 filter blur-[0.6px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1C251E] via-transparent to-[#1C251E]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C251E] via-transparent to-[#1C251E]" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E83F35]" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#F7F5EF] font-bold">
                Clinical Botanical Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-white leading-tight">
              Rooted in Earth.{' '}
              <span className="italic font-serif text-emerald-300 block sm:inline">
                Verified by Science.
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-warm-200/90 font-sans leading-relaxed max-w-2xl mx-auto">
              Every preparation at VALLABH CLINIC begins with whole Indian botanicals harvested in peak micro-climates. We apply analytical chromatography to ensure guaranteed therapeutic active potencies with zero chemical fillers or artificial excipients.
            </p>
          </div>

          {/* 3 Editorial Philosophy Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-14">
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-3.5 text-left hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <h3 className="font-serif text-xl text-white font-normal">
                Standardized Active Markers
              </h3>
              <p className="text-xs text-warm-200/80 leading-relaxed font-sans">
                Every batch is standardized to verified bioactive concentrations &mdash; including withanolides in Ashwagandha, curcuminoids in Turmeric, and emblicanins in Wild Amla.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-3.5 text-left hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <h3 className="font-serif text-xl text-white font-normal">
                Cold Phyto-Extraction
              </h3>
              <p className="text-xs text-warm-200/80 leading-relaxed font-sans">
                Gentle aqueous and grain extraction methods protect delicate phytonutrients, polyphenols, and aromatic botanical essences from thermal degradation.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 space-y-3.5 text-left hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#E83F35]/20 text-rose-300 flex items-center justify-center font-serif text-lg font-bold">
                03
              </div>
              <h3 className="font-serif text-xl text-white font-normal">
                Physician-Supervised Regimens
              </h3>
              <p className="text-xs text-warm-200/80 leading-relaxed font-sans">
                Enjoy independent non-prescription checkout, or connect directly with clinic doctors for tailored botanical regimens and personalized patient portal care.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. CONNECTED CARE STORYTELLING — HOW IT WORKS */}
      <section id="story" className="py-16 md:py-24 bg-gradient-to-b from-[#F7F5EF] to-warm-200/60 border-t border-[#CBD5CD]/60">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <Badge variant="vermilion">Connected Healthcare Architecture</Badge>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C251E] font-normal">
              Connected Botanical Care &mdash; How It Works
            </h2>
            <p className="text-sm sm:text-base text-earth-700 font-sans leading-relaxed">
              Designed for independent shoppers and physician-guided patients alike. Bridge self-care e-commerce with clinical physician oversight.
            </p>
          </div>

          {/* 3 Step Interactive Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card hoverEffect={true} className="space-y-4 relative bg-white border-[#CBD5CD]/80 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-serif font-bold text-[#CBD5CD]">
                  01
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Open to All
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-botanical-50 text-[#49614D] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                Explore Botanical Essentials
              </h3>
              <p className="text-xs text-earth-600 leading-relaxed font-sans">
                Browse our non-prescription herbal formulations at your own pace. Inspect transparent ingredients, traditional Ayurvedic uses, and clear dosage instructions without needing a prior doctor visit.
              </p>
            </Card>

            <Card hoverEffect={true} className="space-y-4 relative bg-white border-[#CBD5CD]/80 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-serif font-bold text-[#CBD5CD]">
                  02
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#E83F35] bg-vermilion-50 px-2.5 py-0.5 rounded-full border border-vermilion-200">
                  Optional Clinical Link
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-vermilion-50 text-[#E83F35] flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                Receive Doctor Recommendations
              </h3>
              <p className="text-xs text-earth-600 leading-relaxed font-sans">
                When you seek personalized physician guidance, clinic doctors prescribe customized botanical regimens directly into your patient portal with clinical dosage notes and intake schedules.
              </p>
            </Card>

            <Card hoverEffect={true} className="space-y-4 relative bg-white border-[#CBD5CD]/80 p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-serif font-bold text-[#CBD5CD]">
                  03
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#49614D] bg-[#F4F6F4] px-2.5 py-0.5 rounded-full border border-botanical-200">
                  Doorstep Dispatch
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-botanical-50 text-[#49614D] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1C251E]">
                1-Click Refills & Delivery Tracking
              </h3>
              <p className="text-xs text-earth-600 leading-relaxed font-sans">
                Refill recommended products or purchase daily wellness formulations in 1 click. Orders are verified by the central pharmacy and dispatched with live doorstep tracking.
              </p>
            </Card>
          </div>

          {/* Independent Shopping Reassurance Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#49614D]/30 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
            <div className="space-y-1.5 text-left">
              <span className="text-xs font-bold text-[#49614D] block uppercase tracking-wide">
                Independent Shopping &bull; No Consultation Required
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1C251E]">
                Ready to Experience Thoughtful Wellness?
              </h4>
              <p className="text-xs text-earth-600">
                You can add any formulation to your cart and complete checkout immediately without a doctor.
              </p>
            </div>
            <Link to="/products" className="shrink-0">
              <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                Shop Catalog
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 5. ABOUT VALLABH CLINIC SECTION */}
      <section id="about" className="py-16 md:py-24 border-t border-[#CBD5CD]/60 bg-[#F7F5EF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <Badge variant="botanical">About Vallabh Clinic</Badge>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C251E] font-normal">
                Standardized Botanicals, Zero Compromise
              </h2>
              <p className="text-sm text-earth-700 leading-relaxed font-sans">
                At VALLABH CLINIC, our healthcare e-commerce platform curates non-prescription botanical supplements formulated in compliance with Ayurvedic and modern botanical pharmacopeias.
              </p>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#49614D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C251E] block">Standardized Active Phyto-Markers</span>
                    <span className="text-xs text-earth-600">Guaranteed bioactive markers like withanolides in Ashwagandha and boswellic acids in Shallaki.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#49614D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C251E] block">Purity & Heavy Metal Clearance</span>
                    <span className="text-xs text-earth-600">Every production batch undergoes analytical screening for contaminants, microbial load, and safety.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#49614D] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1C251E] block">Physician-Reviewed Formulations</span>
                    <span className="text-xs text-earth-600">Developed in collaboration with licensed integrative healthcare practitioners.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-warm-200/70 rounded-3xl p-8 border border-[#CBD5CD] space-y-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#49614D] block">
                  Healthcare Mission
                </span>
                <p className="font-serif text-2xl text-[#1C251E] leading-snug">
                  "Empowering everyday wellness by making genuine botanical healthcare transparent, accessible, and physician-supported."
                </p>
                <div className="pt-4 border-t border-warm-300 text-xs text-earth-700 space-y-0.5">
                  <span className="font-bold text-[#1C251E] block">VALLABH CLINIC Team</span>
                  <span>Integrative Healthcare Practitioners & Botanical Specialists</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. BOTANICAL DISPATCH & FOOTER TRANSITION THRESHOLD */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-[#F7F5EF] via-[#384C3C] to-[#49614D] text-white overflow-hidden">
        {/* Botanical Branch Foliage Composition Threshold */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 pointer-events-none select-none opacity-20 overflow-hidden">
          <img
            src="/cinematic/botanical-dark-green-bg.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover mix-blend-overlay filter blur-[0.4px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5EF] via-transparent to-[#49614D]" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white font-semibold">
                Botanical Care Rituals
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
              Begin Your Daily Restorative Ritual
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-warm-100/90 font-sans leading-relaxed max-w-xl mx-auto">
              Join households across India receiving seasonal Ayurvedic wellness guidance, clinical herbal insights, and physician formulation dispatches.
            </p>

            {/* Newsletter Dispatch Subscription Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the VALLABH CLINIC Botanical Dispatch.');
              }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="w-full px-5 py-3 rounded-2xl bg-white/15 border border-white/25 text-white placeholder:text-white/60 text-xs sm:text-sm focus:bg-white focus:text-[#1C251E] focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner backdrop-blur-md transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-[#49614D] hover:bg-warm-100 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-soft-sm shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>

            <p className="text-[10px] font-mono uppercase tracking-wider text-warm-200/60 pt-2">
              Non-commercial botanical care notes • Unsubscribe at any time
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
