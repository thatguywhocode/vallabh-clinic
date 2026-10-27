import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Sparkles, ArrowDown, ShieldCheck, SunMedium } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BotanicalScrollytelling() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const exitVeilRef = useRef(null);

  const [activeChapter, setActiveChapter] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activeChapterRef = useRef(1);

  useEffect(() => {
    activeChapterRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      // Recalculate ScrollTrigger measurements once all page assets (images, videos) have fully settled
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', handleLoad);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !pinRef.current) return;

    // Direct preview param check: ?preview_chapter=1|2|3
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const previewCh = params ? parseInt(params.get('preview_chapter') || params.get('chapter') || '0', 10) : 0;

    // Use gsap.context for clean React lifecycle management
    const ctx = gsap.context(() => {
      if (previewCh >= 1 && previewCh <= 3) {
        setActiveChapter(previewCh);
        if (previewCh === 2) {
          gsap.set(scene2Ref.current, { opacity: 1, pointerEvents: 'auto' });
          gsap.set(text1Ref.current, { opacity: 0 });
          gsap.set(text2Ref.current, { opacity: 1, y: 0 });
        } else if (previewCh === 3) {
          gsap.set(scene3Ref.current, { opacity: 1, pointerEvents: 'auto' });
          gsap.set(text1Ref.current, { opacity: 0 });
          gsap.set(text3Ref.current, { opacity: 1, y: 0 });
        }
        return; // Fixed static chapter presentation for screenshots and inspection
      }

      // Smooth GSAP ScrollTrigger timeline with calibrated scrub and pin spacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.28) {
              setActiveChapter(1);
              if (video1Ref.current && video1Ref.current.paused) {
                video1Ref.current.play().catch(() => {});
              }
            } else if (p >= 0.28 && p < 0.62) {
              setActiveChapter(2);
              if (video2Ref.current && video2Ref.current.paused) {
                video2Ref.current.play().catch(() => {});
              }
            } else {
              setActiveChapter(3);
            }
          },
        },
      });

      // Chapter 1 -> Chapter 2 Transition (Progress 0.22 - 0.46)
      tl.to(text1Ref.current, { opacity: 0, y: -25, duration: 0.2 }, 0.22)
        .to(scene2Ref.current, { opacity: 1, duration: 0.28, ease: 'power1.inOut' }, 0.24)
        .fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22 }, 0.32);

      // Chapter 2 -> Chapter 3 Transition (Progress 0.52 - 0.76)
      tl.to(text2Ref.current, { opacity: 0, y: -25, duration: 0.2 }, 0.52)
        .to(scene3Ref.current, { opacity: 1, duration: 0.28, ease: 'power1.inOut' }, 0.54)
        .fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.22 }, 0.60);

      // Subtle scale breath on the sacred leaf formation during Chapter 3 active reading
      tl.fromTo('.leaf-formation-img', { scale: 1.06 }, { scale: 1.0, duration: 0.24, ease: 'none' }, 0.56);

      // ================= PHASE 4: ORGANIC SETTLEMENT & SEAMLESS EXIT (0.80 - 1.00) =================
      // Solves the abrupt upward jump:
      // 1. Text 3 gently settles and lifts softly
      tl.to(text3Ref.current, { opacity: 0, y: -30, filter: 'blur(3px)', duration: 0.16 }, 0.82)
      // 2. The sacred leaf formation gently scales down and settles into the background
        .to('.leaf-formation-img', { scale: 0.94, y: 35, opacity: 0.35, duration: 0.18, ease: 'power1.out' }, 0.82)
      // 3. The organic warm ivory exit veil softly rises and bridges into #FAF8F5
        .to(exitVeilRef.current, { opacity: 1, duration: 0.18, ease: 'power2.inOut' }, 0.82)
      // 4. Chapter indicator fades out smoothly before unpinning
        .to('.chapter-progress-pill', { opacity: 0, duration: 0.12 }, 0.84);
    }, containerRef);

    // Pause offscreen videos when user scrolls away from this section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (video1Ref.current) video1Ref.current.pause();
            if (video2Ref.current) video2Ref.current.pause();
          } else {
            if (activeChapterRef.current === 1 && video1Ref.current) video1Ref.current.play().catch(() => {});
            if (activeChapterRef.current === 2 && video2Ref.current) video2Ref.current.play().catch(() => {});
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  // Reduced motion fallback: Static 3-column editorial grid
  if (prefersReducedMotion) {
    return (
      <section className="py-20 bg-[#1C251E] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E83F35]">
              Botanical Provenance & Synthesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              The Path from Earth to Formulation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-[#28362B] rounded-3xl p-6 border border-white/10 space-y-4">
              <img
                src="/cinematic/botanicals-floating-still.jpg"
                alt="Wild-harvested botanicals"
                className="w-full h-48 object-cover rounded-2xl"
                loading="lazy"
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Chapter 01</span>
              <h3 className="font-serif text-xl font-bold">Wild-Harvested Harvest</h3>
              <p className="text-xs text-warm-200/80 leading-relaxed">
                Whole holy basil, mature Amla, and high-altitude Ashwagandha gathered at peak active potency.
              </p>
            </div>

            {/* Story 2 */}
            <div className="bg-[#28362B] rounded-3xl p-6 border border-white/10 space-y-4">
              <img
                src="/cinematic/botanicals-swirling-still.jpg"
                alt="Ayurvedic extraction"
                className="w-full h-48 object-cover rounded-2xl"
                loading="lazy"
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Chapter 02</span>
              <h3 className="font-serif text-xl font-bold">Cold Phyto-Extraction</h3>
              <p className="text-xs text-warm-200/80 leading-relaxed">
                Preserving delicate polyphenols and withanolides without thermal degradation or harsh chemicals.
              </p>
            </div>

            {/* Story 3 */}
            <div className="bg-[#28362B] rounded-3xl p-6 border border-white/10 space-y-4">
              <img
                src="/cinematic/botanicals-leaf-formation-still.jpg"
                alt="Sacred leaf synthesis"
                className="w-full h-48 object-cover rounded-2xl"
                loading="lazy"
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Chapter 03</span>
              <h3 className="font-serif text-xl font-bold">Clinical Standardization</h3>
              <p className="text-xs text-warm-200/80 leading-relaxed">
                Every batch standardized to guaranteed active bio-marker concentrations and physician-approved.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="botanical-scrollytelling" ref={containerRef} className="relative w-full bg-[#1C251E] text-white">
      {/* Pinned Scrollytelling Viewport */}
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* ================= SCENE 1: FLOATING BOTANICALS ================= */}
        <div ref={scene1Ref} className="absolute inset-0 z-10 w-full h-full">
          <video
            ref={video1Ref}
            src="/cinematic/botanicals-floating.mp4"
            poster="/cinematic/botanicals-floating-still.jpg"
            muted
            playsInline
            loop
            autoPlay
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Cinematic Scrim & Sunlight Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C251E] via-[#1C251E]/60 to-[#1C251E]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,245,215,0.18)_0%,_transparent_60%)] pointer-events-none" />

          {/* Editorial Content 1 */}
          <div
            ref={text1Ref}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 sm:px-8 text-center max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 text-[#F7F5EF]">
              <SunMedium className="w-3.5 h-3.5 text-[#E83F35]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] font-semibold">
                Chapter 01 • The Provenance
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl font-normal text-white leading-tight mb-4 max-w-full">
              Wild-Harvested at{' '}
              <span className="italic font-serif text-emerald-300 block sm:inline">Biological Peak.</span>
            </h2>

            <p className="text-xs sm:text-base md:text-lg text-warm-200 font-sans max-w-xs sm:max-w-xl leading-relaxed">
              Whole Tulsi, Himalayan Ashwagandha roots, and sun-ripened Wild Amla. Gathered from ethical Indian micro-climates when botanical bio-actives reach their apex.
            </p>
          </div>
        </div>

        {/* ================= SCENE 2: SWIRLING EXTRACTION ================= */}
        <div ref={scene2Ref} className="absolute inset-0 z-10 w-full h-full opacity-0 pointer-events-none">
          <video
            ref={video2Ref}
            src="/cinematic/botanicals-swirling.mp4"
            poster="/cinematic/botanicals-swirling-still.jpg"
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          {/* Ambient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C251E] via-[#1C251E]/65 to-[#1C251E]/45" />

          {/* Editorial Content 2 */}
          <div
            ref={text2Ref}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 sm:px-8 text-center max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 text-[#F7F5EF]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] font-semibold">
                Chapter 02 • Phyto-Extraction
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl font-normal text-white leading-tight mb-4 max-w-full">
              Gentle Cold{' '}
              <span className="italic font-serif text-amber-200 block sm:inline">Cellular Extraction.</span>
            </h2>

            <p className="text-xs sm:text-base md:text-lg text-warm-200 font-sans max-w-xs sm:max-w-xl leading-relaxed">
              Preserving fragile withanolides, polyphenols, and essential bio-lipids without thermal breakdown or synthetic chemical solvents.
            </p>
          </div>
        </div>

        {/* ================= SCENE 3: SACRED LEAF FORMATION ================= */}
        <div ref={scene3Ref} className="absolute inset-0 z-10 w-full h-full opacity-0 pointer-events-none">
          <img
            src="/cinematic/botanicals-leaf-formation-still.jpg"
            alt="Sacred Botanical Synthesis"
            className="leaf-formation-img w-full h-full object-cover transition-transform"
            loading="lazy"
          />
          {/* Ambient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C251E] via-[#1C251E]/60 to-[#1C251E]/40" />

          {/* Editorial Content 3 */}
          <div
            ref={text3Ref}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 sm:px-8 text-center max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 text-[#F7F5EF]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] font-semibold">
                Chapter 03 • The Synthesis
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl font-normal text-white leading-tight mb-4 max-w-full">
              Clinical Synergy &{' '}
              <span className="italic font-serif text-emerald-300 block sm:inline">Standardization.</span>
            </h2>

            <p className="text-xs sm:text-base md:text-lg text-warm-200 font-sans max-w-xs sm:max-w-xl leading-relaxed mb-6">
              Ancient Ayurvedic rasayana wisdom verified by analytical chromatography. Every preparation standardized to guaranteed therapeutic marker potencies.
            </p>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('featured-products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1C251E] hover:bg-warm-100 font-semibold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer pointer-events-auto"
            >
              <span>Explore Formulations</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Organic Warm Ivory Exit Veil (Smooth bridge into Featured Products) */}
        <div
          ref={exitVeilRef}
          className="absolute inset-0 z-25 pointer-events-none opacity-0 bg-gradient-to-b from-[#1C251E]/0 via-[#F7F5EF]/85 to-[#FAF8F5]"
        />

        {/* Global Floating Scrollytelling Chapter Indicator */}
        <div className="chapter-progress-pill absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/15 backdrop-blur-md text-[11px] font-mono transition-opacity">
          <span className={activeChapter === 1 ? 'text-white font-bold' : 'text-white/40'}>01 HARVEST</span>
          <span className="text-white/30">•</span>
          <span className={activeChapter === 2 ? 'text-white font-bold' : 'text-white/40'}>02 EXTRACTION</span>
          <span className="text-white/30">•</span>
          <span className={activeChapter === 3 ? 'text-white font-bold' : 'text-white/40'}>03 SYNTHESIS</span>
        </div>
      </div>
    </section>
  );
}
