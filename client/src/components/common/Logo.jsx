import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Brand Logo Component for VALLABH CLINIC
 * Brand Rule: The entire brand name "VALLABH CLINIC" MUST appear in PURE WHITE (#FFFFFF)
 * wherever it is displayed on the botanical green background.
 */
export default function Logo({ className = '', onGreen = true, isLight = false, onClick }) {
  // Brand name is pure white by default on green headers and dark footers
  const isWhiteText = onGreen || isLight;

  return (
    <Link 
      to="/" 
      onClick={onClick}
      data-testid="navbar-brand-logo"
      className={`inline-flex items-center gap-3 group text-decoration-none ${className}`}
    >
      {/* Botanical Ginkgo / Leaf Emblem with Controlled Vermilion Red Accent */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-sm ${
        isWhiteText 
          ? 'bg-warm-100 text-vermilion-500 ring-2 ring-white/20' 
          : 'bg-botanical-500 text-warm-100'
      }`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-vermilion-500"
          aria-hidden="true"
        >
          {/* Stylized botanical leaf motif with vermilion accent */}
          <path d="M12 2C8.5 2 4 6 4 12c0 5 4 8 8 10 4-2 8-5 8-10 0-6-4.5-10-8-10z" stroke="#E83F35" fill="#E83F35" fillOpacity="0.18" />
          <path d="M12 7v10" stroke="#E83F35" strokeWidth="2" />
          <path d="M8 12h8" stroke="#E83F35" strokeWidth="2" />
        </svg>
      </div>

      {/* Brand Typography: Entire "VALLABH CLINIC" in Pure White #FFFFFF */}
      <div className="flex flex-col leading-tight">
        <span className={`font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase transition-colors ${
          isWhiteText ? 'text-white' : 'text-botanical-900 group-hover:text-botanical-700'
        }`} style={isWhiteText ? { color: '#FFFFFF' } : {}}>
          VALLABH CLINIC
        </span>
        <span className={`text-[10px] uppercase tracking-[0.22em] font-sans font-medium ${
          isWhiteText ? 'text-warm-100/90' : 'text-earth-600'
        }`}>
          Healthcare & Everyday Wellness
        </span>
      </div>
    </Link>
  );
}
