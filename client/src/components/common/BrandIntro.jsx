import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useBrandIntro } from '../../context/BrandIntroContext';

// Primary botanical ingredients + supporting apothecary accents
const BOTANICAL_ITEMS = [
  {
    id: 'tulsi-1',
    name: 'Tulsi Leaf (Holy Basil)',
    src: '/botanicals/tulsi-leaf.svg',
    y0: -130,
    rBase: 220,
    theta0: 0,
    speed: 1.25,
    updraft: 22,
    size: 72,
    baseScale: 1.0,
    phaseOffset: 0.2,
    stagger: 0.1,
    glow: 'rgba(114, 176, 99, 0.45)',
  },
  {
    id: 'ashwagandha-1',
    name: 'Ashwagandha Root',
    src: '/botanicals/ashwagandha-root.svg',
    y0: 80,
    rBase: 200,
    theta0: (Math.PI * 2) / 6,
    speed: 1.15,
    updraft: 18,
    size: 76,
    baseScale: 1.05,
    phaseOffset: 1.1,
    stagger: 0.2,
    glow: 'rgba(212, 175, 55, 0.5)',
  },
  {
    id: 'amla-1',
    name: 'Amla Fruit (Indian Gooseberry)',
    src: '/botanicals/amla-fruit.svg',
    y0: -50,
    rBase: 240,
    theta0: (Math.PI * 4) / 6,
    speed: 1.35,
    updraft: 26,
    size: 68,
    baseScale: 0.95,
    phaseOffset: 2.3,
    stagger: 0.3,
    glow: 'rgba(155, 201, 56, 0.5)',
  },
  {
    id: 'brahmi-1',
    name: 'Brahmi Leaf',
    src: '/botanicals/brahmi-leaf.svg',
    y0: 130,
    rBase: 180,
    theta0: Math.PI,
    speed: 1.2,
    updraft: 20,
    size: 70,
    baseScale: 1.0,
    phaseOffset: 3.5,
    stagger: 0.15,
    glow: 'rgba(85, 176, 102, 0.45)',
  },
  {
    id: 'chamomile-1',
    name: 'Chamomile Flower',
    src: '/botanicals/chamomile-flower.svg',
    y0: -170,
    rBase: 215,
    theta0: (Math.PI * 8) / 6,
    speed: 1.3,
    updraft: 24,
    size: 74,
    baseScale: 1.0,
    phaseOffset: 4.8,
    stagger: 0.25,
    glow: 'rgba(255, 224, 102, 0.55)',
  },
  {
    id: 'saffron-1',
    name: 'Saffron Strands',
    src: '/botanicals/saffron-threads.svg',
    y0: 25,
    rBase: 255,
    theta0: (Math.PI * 10) / 6,
    speed: 1.4,
    updraft: 28,
    size: 68,
    baseScale: 1.0,
    phaseOffset: 5.6,
    stagger: 0.35,
    glow: 'rgba(232, 63, 53, 0.5)',
  },
  {
    id: 'tulsi-2',
    name: 'Fresh Tulsi',
    src: '/botanicals/tulsi-leaf.svg',
    y0: 95,
    rBase: 165,
    theta0: Math.PI / 4,
    speed: 1.45,
    updraft: 23,
    size: 58,
    baseScale: 0.85,
    phaseOffset: 1.8,
    stagger: 0.4,
    glow: 'rgba(114, 176, 99, 0.4)',
  },
  {
    id: 'amla-2',
    name: 'Juicy Amla',
    src: '/botanicals/amla-fruit.svg',
    y0: -105,
    rBase: 185,
    theta0: (5 * Math.PI) / 4,
    speed: 1.28,
    updraft: 22,
    size: 56,
    baseScale: 0.85,
    phaseOffset: 3.2,
    stagger: 0.45,
    glow: 'rgba(155, 201, 56, 0.4)',
  },
  {
    id: 'chamomile-2',
    name: 'Chamomile Bloom',
    src: '/botanicals/chamomile-flower.svg',
    y0: 45,
    rBase: 235,
    theta0: (7 * Math.PI) / 4,
    speed: 1.22,
    updraft: 21,
    size: 60,
    baseScale: 0.88,
    phaseOffset: 4.1,
    stagger: 0.5,
    glow: 'rgba(255, 224, 102, 0.45)',
  },
  {
    id: 'apothecary-1',
    name: 'Triphala Cleanse',
    src: '/products/triphala-cleanse.svg',
    y0: -15,
    rBase: 270,
    theta0: Math.PI / 2,
    speed: 1.1,
    updraft: 16,
    size: 66,
    baseScale: 0.9,
    phaseOffset: 0.8,
    stagger: 0.3,
    glow: 'rgba(255, 255, 255, 0.4)',
  },
  {
    id: 'apothecary-2',
    name: 'Kumkumadi Radiance',
    src: '/products/kumkumadi-face-oil.svg',
    y0: -145,
    rBase: 205,
    theta0: (3 * Math.PI) / 2,
    speed: 1.32,
    updraft: 25,
    size: 62,
    baseScale: 0.88,
    phaseOffset: 2.7,
    stagger: 0.4,
    glow: 'rgba(255, 255, 255, 0.4)',
  },
  {
    id: 'saffron-2',
    name: 'Vibrant Saffron',
    src: '/botanicals/saffron-threads.svg',
    y0: -70,
    rBase: 220,
    theta0: Math.PI / 3,
    speed: 1.5,
    updraft: 30,
    size: 58,
    baseScale: 0.85,
    phaseOffset: 5.1,
    stagger: 0.55,
    glow: 'rgba(232, 63, 53, 0.45)',
  },
];

export default function BrandIntro() {
  const { isPlaying, closeIntro } = useBrandIntro();
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);
  const startTimeRef = useRef(null);
  const itemElementsRef = useRef([]);
  const sceneRef = useRef('awaken');

  // Scene state: 'awaken' | 'tornado' | 'transform' | 'reveal' | 'portal'
  const [scene, setScene] = useState('awaken');

  useEffect(() => {
    if (!isPlaying) {
      setScene('awaken');
      sceneRef.current = 'awaken';
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      return;
    }

    // Accessibility: Reduced Motion Check
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      closeIntro();
      return;
    }

    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const forcedScene = params ? params.get('scene') : null;
    const initialOffset = params && params.get('t') ? parseFloat(params.get('t')) : 0;
    startTimeRef.current = performance.now() - initialOffset * 1000;

    // 140+ ambient vortex particles for canvas rendering
    const particleColors = [
      '#FFD700', // Gold
      '#F5A623', // Amber
      '#72B063', // Tulsi green
      '#90D880', // Leaf sprout
      '#E83F35', // Vermilion accent
      '#F7F5EF', // Warm ivory
      '#FFFFFF', // Starlight white
    ];

    const particles = Array.from({ length: 140 }, () => ({
      r: 60 + Math.random() * 260,
      theta: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * 500,
      vTheta: 0.8 + Math.random() * 1.6,
      vy: 20 + Math.random() * 45,
      size: 1.5 + Math.random() * 3.5,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: 0.25 + Math.random() * 0.7,
    }));

    // High performance render loop: directly writes DOM transforms (0 state lag)
    const render = (now) => {
      let elapsed = (now - startTimeRef.current) / 1000;

      // Determine active scene
      let currentScene = 'awaken';
      if (forcedScene) {
        currentScene = forcedScene;
        if (forcedScene === 'tornado') elapsed = 2.4;
        else if (forcedScene === 'transform') elapsed = 4.0;
        else if (forcedScene === 'reveal') elapsed = 5.0;
        else if (forcedScene === 'portal') elapsed = 5.8;
      } else {
        if (elapsed >= 5.5) {
          currentScene = 'portal';
        } else if (elapsed >= 4.5) {
          currentScene = 'reveal';
        } else if (elapsed >= 3.5) {
          currentScene = 'transform';
        } else if (elapsed >= 1.2) {
          currentScene = 'tornado';
        }

        // Finish intro at 6.2s
        if (elapsed >= 6.2) {
          closeIntro();
          return;
        }
      }

      // Update React scene state ONLY when transition occurs (preserves 60 FPS)
      if (sceneRef.current !== currentScene) {
        sceneRef.current = currentScene;
        setScene(currentScene);
      }

      // --- 1. Compute 3D Coordinates and Update DOM Elements Directly ---
      const cameraDistance = 900;

      BOTANICAL_ITEMS.forEach((item, idx) => {
        const el = itemElementsRef.current[idx];
        if (!el) return;

        let x = 0;
        let y = item.y0;
        let z = 0;
        let scale = 1.0;
        let opacity = 0;
        let rotX = 0;
        let rotY = 0;
        let rotZ = 0;

        if (elapsed < 1.2) {
          // Scene 1: Nature Awakens (0–1.2s)
          const emergeProgress = Math.min(1, Math.max(0, (elapsed - item.stagger) / 0.75));
          const eased = Math.sin((emergeProgress * Math.PI) / 2);

          const r = item.rBase * (1.2 - 0.2 * eased);
          const theta = item.theta0 + item.speed * 0.4 * elapsed;
          x = Math.cos(theta) * r;
          z = 320 * (1 - eased) + Math.sin(theta) * r * 0.4;
          y = item.y0 + (1 - eased) * 40;

          scale = (0.4 + 0.6 * eased) * item.baseScale;
          opacity = eased * 0.95;

          rotX = Math.sin(theta * 1.5 + item.phaseOffset) * 20;
          rotY = (theta * 180) / Math.PI;
          rotZ = Math.cos(theta + item.phaseOffset) * 15;
        } else if (elapsed >= 1.2 && elapsed < 3.5) {
          // Scene 2: The Botanical Tornado (1.2–3.5s) - Full 3D logarithmic whirlwind
          const tornadoTime = elapsed - 1.2;
          const progress = tornadoTime / 2.3;

          const currentY = item.y0 - item.updraft * tornadoTime;
          const wrappedY = ((((currentY + 240) % 480) + 480) % 480) - 240;

          const conicalRadiusFactor = 0.7 + ((wrappedY + 240) / 480) * 0.65;
          const funnelContraction = 1.0 - progress * 0.15;
          const currentRadius = item.rBase * conicalRadiusFactor * funnelContraction;

          const accel = 1.0 + progress * 0.9;
          const theta = item.theta0 + item.speed * tornadoTime * 1.6 * accel;

          x = Math.cos(theta) * currentRadius;
          z = Math.sin(theta) * currentRadius;
          y = wrappedY;

          const persp = cameraDistance / (cameraDistance + z);
          scale = persp * item.baseScale * (0.95 + Math.sin(theta + item.phaseOffset) * 0.1);
          opacity = Math.min(1, Math.max(0.4, 0.45 + 0.55 * persp));

          rotX = Math.sin(theta * 1.8 + item.phaseOffset) * 35;
          rotY = (theta * 180) / Math.PI + 90;
          rotZ = Math.cos(theta * 1.4 + item.phaseOffset) * 40;
        } else if (elapsed >= 3.5 && elapsed < 4.5) {
          // Scene 3: Botanical Transformation (3.5–4.5s) - Rapid centripetal convergence
          const contractTime = elapsed - 3.5;
          const progress = contractTime / 1.0;
          const contraction = Math.max(0, 1 - Math.pow(progress, 1.8));

          const fastTheta = item.theta0 + item.speed * 2.3 * 1.6 * 1.9 + progress * 6 * item.speed;
          const r = item.rBase * 0.85 * contraction;

          x = Math.cos(fastTheta) * r;
          z = Math.sin(fastTheta) * r;
          y = item.y0 * contraction;

          scale = item.baseScale * contraction * 0.9;
          opacity = Math.max(0, (1 - progress * 1.25) * 0.9);

          rotX = Math.sin(fastTheta * 2) * 45;
          rotY = (fastTheta * 180) / Math.PI + 90;
          rotZ = Math.cos(fastTheta * 2) * 50;
        } else {
          // Scenes 4 & 5: Invisible during brand reveal & portal
          opacity = 0;
          scale = 0;
        }

        const persp = cameraDistance / (cameraDistance + z);
        const projX = x * persp;
        const projY = y * persp;
        const zIndex = Math.round(500 - z);

        if (opacity <= 0.01) {
          el.style.opacity = '0';
          el.style.display = 'none';
        } else {
          el.style.display = 'flex';
          el.style.opacity = opacity.toString();
          el.style.zIndex = zIndex.toString();
          el.style.transform = `translate3d(${projX}px, ${projY}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
        }
      });

      // --- 2. Render Canvas Volumetric Lighting & Swirling Particle Field ---
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const w = (canvas.width = canvas.offsetWidth);
        const h = (canvas.height = canvas.offsetHeight);
        const cx = w / 2;
        const cy = h / 2;

        ctx.fillStyle = 'rgba(40, 56, 42, 0.35)';
        ctx.fillRect(0, 0, w, h);

        // Volumetric Directional Lighting
        if (elapsed < 4.5) {
          const rayGrad = ctx.createLinearGradient(0, 0, w * 0.85, h * 0.85);
          rayGrad.addColorStop(0, 'rgba(255, 235, 180, 0.09)');
          rayGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)');
          rayGrad.addColorStop(1, 'rgba(40, 56, 42, 0)');
          ctx.fillStyle = rayGrad;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(w * 0.5, 0);
          ctx.lineTo(w, h * 0.9);
          ctx.lineTo(0, h * 0.65);
          ctx.closePath();
          ctx.fill();
        }

        // Particle Whirlwind Simulation
        particles.forEach((p) => {
          let pRadius = p.r;
          let pTheta = p.theta;
          let pY = p.y;
          let pAlpha = p.alpha;

          if (elapsed < 1.2) {
            pTheta += p.vTheta * 0.02;
            pAlpha = Math.min(p.alpha, (elapsed / 1.2) * p.alpha);
          } else if (elapsed >= 1.2 && elapsed < 3.5) {
            const tTime = elapsed - 1.2;
            const progress = tTime / 2.3;
            pTheta += p.vTheta * 0.055 * (1 + progress * 0.8);
            pY -= p.vy * 0.04;
            if (pY < -h / 2) pY = h / 2;
            pRadius = p.r * (0.7 + ((pY + h / 2) / h) * 0.6);
          } else if (elapsed >= 3.5 && elapsed < 4.5) {
            const cTime = elapsed - 3.5;
            const contraction = Math.max(0, 1 - Math.pow(cTime, 1.5));
            pRadius = p.r * contraction * 0.6;
            pTheta += p.vTheta * 0.15;
            pY *= contraction;
            pAlpha = Math.max(0, (1 - cTime) * p.alpha);
          } else {
            pAlpha = 0;
          }

          p.theta = pTheta;
          p.y = pY;

          if (pAlpha > 0.02) {
            const px = cx + Math.cos(pTheta) * pRadius;
            const py = cy + pY;

            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = pAlpha;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = p.size * 2;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        });

        // Expanding Circular Shockwaves during transformation (3.7s - 4.7s)
        if (elapsed >= 3.6 && elapsed < 4.7) {
          const waveAge = elapsed - 3.6;
          const waveRadius = waveAge * 300;
          const waveAlpha = Math.max(0, 0.5 - waveAge * 0.45);

          ctx.strokeStyle = '#E83F35';
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = waveAlpha;
          ctx.beginPath();
          ctx.arc(cx, cy, waveRadius, 0, Math.PI * 2);
          ctx.stroke();

          const wave2Radius = Math.max(0, (waveAge - 0.2) * 270);
          if (wave2Radius > 0) {
            ctx.strokeStyle = '#F5A623';
            ctx.lineWidth = 1.8;
            ctx.globalAlpha = Math.max(0, 0.4 - (waveAge - 0.2) * 0.4);
            ctx.beginPath();
            ctx.arc(cx, cy, wave2Radius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1.0;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, closeIntro]);

  if (!isPlaying) return null;

  // Staggered letters for pure white brand name
  const brandLetters = 'VALLABH CLINIC'.split('');

  return (
    <AnimatePresence>
      <motion.div
        key="brand-intro-cinematic"
        initial={{ opacity: 0 }}
        animate={{
          opacity: scene === 'portal' ? 0.95 : 1,
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] bg-[#49614D] overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label="VALLABH CLINIC Cinematic Botanical Brand Presentation"
      >
        {/* Dark Botanical Vignette & Volumetric Radial Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(85,115,90,0.45)_0%,_rgba(35,50,38,0.85)_65%,_rgba(18,28,20,0.98)_100%)] pointer-events-none" />

        {/* Ambient Subtle Mist Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08)_0%,_transparent_60%)] pointer-events-none" />

        {/* Full-Screen Canvas for God Rays, Particle Vortex, & Energy Ripples */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* 3D Spatial Container for Botanical Ingredients (Tornado Funnel) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {BOTANICAL_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => (itemElementsRef.current[idx] = el)}
              style={{
                position: 'absolute',
                width: `${item.size}px`,
                height: `${item.size}px`,
                opacity: 0,
                transform: 'translate3d(0, 0, 0)',
                filter: `drop-shadow(0 8px 16px ${item.glow})`,
                willChange: 'transform, opacity',
              }}
              className="flex items-center justify-center pointer-events-none"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                loading="eager"
              />
            </div>
          ))}
        </div>

        {/* Central Luminous Swirl & Botanical Insignia Transformation (Scenes 3, 4, 5) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale:
                scene === 'transform'
                  ? [0, 1.25, 1.0]
                  : scene === 'reveal'
                  ? 1.05
                  : scene === 'portal'
                  ? 22
                  : 0,
              opacity:
                scene === 'awaken' || scene === 'tornado'
                  ? 0
                  : scene === 'portal'
                  ? 0
                  : 1,
            }}
            transition={{
              duration: scene === 'portal' ? 0.8 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center justify-center text-center px-4 max-w-4xl w-full"
          >
            {/* Luminous Central Ginkgo Leaf Emblem with Vermilion Red #E83F35 Accent */}
            <motion.div
              animate={{
                rotate: scene === 'transform' ? 360 : 0,
                boxShadow:
                  scene === 'reveal'
                    ? '0 0 45px rgba(232, 63, 53, 0.4), 0 0 90px rgba(255, 215, 0, 0.3)'
                    : '0 0 25px rgba(255, 255, 255, 0.3)',
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/15 border-2 border-white/40 backdrop-blur-md flex items-center justify-center text-white mb-6 relative shadow-2xl"
            >
              {/* Spinning Golden Accent Ring */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-6px] rounded-full border border-dashed border-warm-100/40 pointer-events-none"
              />

              {/* Botanical Insignia SVG with Vermilion Red Accent */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                aria-hidden="true"
              >
                <path
                  d="M12 2C8.5 2 4 6 4 12c0 5 4 8 8 10 4-2 8-5 8-10 0-6-4.5-10-8-10z"
                  stroke="#FFFFFF"
                  fill="#E83F35"
                  fillOpacity="0.85"
                />
                <path d="M12 7v10" stroke="#FFFFFF" strokeWidth="2.2" />
                <path d="M8 12h8" stroke="#FFFFFF" strokeWidth="2.2" />
              </svg>
            </motion.div>

            {/* Scene 4: Staggered Pure White #FFFFFF Typography Reveal in Cormorant Garamond */}
            {(scene === 'reveal' || scene === 'transform') && (
              <div className="flex flex-col items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: scene === 'reveal' ? 1 : 0,
                    y: scene === 'reveal' ? 0 : 12,
                  }}
                  transition={{ duration: 0.5 }}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.14em] uppercase text-white drop-shadow-lg flex items-center justify-center whitespace-nowrap"
                  style={{ color: '#FFFFFF' }}
                >
                  <span className="inline-flex items-center gap-1 sm:gap-2 mr-3 sm:mr-6">
                    {'VALLABH'.split('').map((char, idx) => (
                      <motion.span
                        key={`v-${idx}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                          opacity: scene === 'reveal' ? 1 : 0,
                          y: scene === 'reveal' ? 0 : 15,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: 0.05 + idx * 0.035,
                          ease: 'easeOut',
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                  <span className="inline-flex items-center gap-1 sm:gap-2">
                    {'CLINIC'.split('').map((char, idx) => (
                      <motion.span
                        key={`c-${idx}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{
                          opacity: scene === 'reveal' ? 1 : 0,
                          y: scene === 'reveal' ? 0 : 15,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: 0.32 + idx * 0.035,
                          ease: 'easeOut',
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </motion.h1>

                {/* Subtitle: Healthcare & Everyday Wellness */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: scene === 'reveal' ? 1 : 0,
                    y: scene === 'reveal' ? 0 : 10,
                  }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="font-serif italic text-base sm:text-xl md:text-2xl text-warm-100 tracking-wider mt-3 font-medium"
                >
                  Healthcare &bull; Everyday Wellness
                </motion.p>

                {/* Subtle Divider Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: scene === 'reveal' ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent mt-4 mb-2"
                />

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: scene === 'reveal' ? 0.85 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.35em] text-white/80"
                >
                  Authentic Ayurvedic Formulations
                </motion.span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Scene 5: Seamless Circular Portal Reveal Transitioning into Warm Ivory Homepage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: scene === 'portal' ? 1 : 0,
          }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#F7F5EF] pointer-events-none z-40 flex items-center justify-center"
          style={{
            clipPath:
              scene === 'portal'
                ? 'circle(150% at 50% 50%)'
                : 'circle(0% at 50% 50%)',
            transition: 'clip-path 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="text-center opacity-40">
            <span className="font-serif text-3xl sm:text-4xl font-bold tracking-widest text-[#49614D] uppercase">
              VALLABH CLINIC
            </span>
          </div>
        </motion.div>

        {/* Skip Intro Button: High Contrast, Accessible, Unobtrusive */}
        <button
          type="button"
          onClick={closeIntro}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white border border-white/25 hover:border-white/50 text-xs font-sans font-semibold tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-white/60"
          aria-label="Skip Brand Introduction"
        >
          <span>Skip Intro</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}