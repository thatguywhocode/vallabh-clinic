import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
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

  // Display 6 to 8 products from demo catalog
  const filteredProducts = activeCategoryFilter === 'all'
    ? products.slice(0, 8)
    : products.filter((p) => p.category === activeCategoryFilter);

  return (
    <div className="relative overflow-hidden font-sans">
      {/* Subtle Warm Canvas Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#49614D]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Platform Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2"
              >
                <Badge variant="botanical" dot={true} dotColor="bg-[#E83F35]">
                  Integrative Botanical Healthcare
                </Badge>
                <span className="text-[11px] uppercase tracking-widest text-earth-600 font-bold">
                  Non-Prescription OTC
                </span>
              </motion.div>

              {/* Main Headline with Staggered Word Reveal */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#1C251E] tracking-tight leading-[1.12]"
              >
                Thoughtful Care.{' '}
                <span className="italic font-serif font-medium text-[#49614D] underline decoration-[#E83F35]/60 decoration-2 underline-offset-8">
                  Everyday Wellness.
                </span>
              </motion.h1>

              {/* Supporting Copy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-[#41382E] leading-relaxed font-sans max-w-xl"
              >
                Browse doctor-reviewed healthcare essentials, standardized botanical preparations, and daily wellness solutions. View transparent formulations, directions, and sample pricing in Indian Rupees.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2 flex flex-wrap items-center gap-4"
              >
                <Link to="/products">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={ArrowRight}
                    iconPosition="right"
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
                  >
                    Discover Our Story
                  </Button>
                </button>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="pt-6 border-t border-[#CBD5CD]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-earth-700"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#49614D] shrink-0" />
                  <span className="font-medium">Pan-India Express Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#49614D] shrink-0" />
                  <span className="font-medium">100% Non-Prescription Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#49614D] shrink-0" />
                  <span className="font-medium">Physician-Reviewed Protocols</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Auto-Rotating 3D Perspective Product Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0"
            >
              <RotatingProductShowcase />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE CATEGORY COLLECTIONS */}
      <section id="categories" className="py-16 bg-[#F3EFEA]/60 border-y border-[#CBD5CD]/60">
        <Container>
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
            {CATEGORIES.map((cat) => {
              const catImage = CATEGORY_IMAGES[cat.id] || '/products/triphala-cleanse.svg';

              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.id}`}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-[#CBD5CD]/80 shadow-soft-sm hover:shadow-soft-md hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. FEATURED HEALTHCARE PRODUCTS */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
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

          {/* 4 Columns Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
    </div>
  );
}
