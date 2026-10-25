import React, { useState, useEffect } from 'react';
import { Leaf, Moon, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../../data/products.js';

const CATEGORY_ICONS = {
  digestion: Leaf,
  stress: Moon,
  vitality: ShieldCheck,
  skin: Sparkles,
  joint: HeartHandshake,
};

export default function ProductImage({ product, className = 'h-48' }) {
  const [imgError, setImgError] = useState(false);
  const IconComponent = CATEGORY_ICONS[product?.category] || Leaf;

  // Reset image error state whenever product identity or image changes
  useEffect(() => {
    setImgError(false);
  }, [product?.id, product?.image]);

  // Priority: 1. product.image, 2. catalog match from PRODUCTS, 3. fallback path by ID
  const catalogMatch = PRODUCTS.find((p) => p.id === product?.id);
  const imageSrc = product?.image || catalogMatch?.image || (product?.id ? `/products/${product.id}.svg` : null);

  const hasImage = Boolean(imageSrc) && !imgError;

  return (
    <div className={`w-full ${className} rounded-2xl bg-gradient-to-b from-[#FCFBF8] via-[#F7F5EF] to-[#EDE9DF] border border-[#CBD5CD]/60 p-3 flex flex-col items-center justify-between relative overflow-hidden group-hover:border-[#49614D]/40 transition-colors`}>
      {/* Background Botanical Grain / Ambient Halo */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#49614D]/5 blur-xl pointer-events-none" />

      {/* Top Header Tag */}
      <div className="w-full flex items-center justify-between z-10 shrink-0">
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#49614D] bg-white/90 px-2 py-0.5 rounded-full border border-[#CBD5CD]/60 shadow-2xs">
          Non-Rx OTC
        </span>
        <span className="text-[10px] text-[#5D4F3F] font-semibold tracking-tight">
          {product?.volume || catalogMatch?.volume || 'Standard Pack'}
        </span>
      </div>

      {/* Center Image or Apothecary Visual (75-85% prominent height) */}
      <div className="my-auto relative flex flex-col items-center justify-center z-10 w-full h-[78%] transition-transform duration-300 group-hover:scale-105">
        {hasImage ? (
          <img
            src={imageSrc}
            alt={product?.name || catalogMatch?.name || 'Botanical formulation'}
            onError={() => {
              console.warn(`[ProductImage] Failed to load image: ${imageSrc}`);
              setImgError(true);
            }}
            className="w-full h-full max-h-full max-w-[85%] object-contain drop-shadow-sm select-none"
            loading="eager"
          />
        ) : (
          <div className="w-20 h-24 rounded-2xl bg-white shadow-soft-md border border-[#CBD5CD] p-2 flex flex-col items-center justify-between relative">
            {/* Label Header */}
            <div className="w-full bg-[#49614D] rounded-t-lg py-1 px-1.5 text-center">
              <span className="font-serif text-[8px] font-bold tracking-wider text-white uppercase block leading-none">
                VALLABH CLINIC
              </span>
            </div>

            {/* Botanical Emblem */}
            <div className="w-9 h-9 rounded-full bg-[#F4F6F4] flex items-center justify-center text-[#49614D] my-1">
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Volume info */}
            <div className="text-center w-full border-t border-warm-200 pt-0.5">
              <span className="text-[8px] font-mono font-semibold text-[#5D4F3F] block truncate">
                {product?.botanicalType || catalogMatch?.botanicalType || 'Botanical Formula'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Category Tag */}
      <div className="w-full text-center z-10 shrink-0">
        <span className="text-[10px] font-semibold text-[#49614D] tracking-wide">
          {product?.categoryName || catalogMatch?.categoryName || 'Integrative Formulation'}
        </span>
      </div>
    </div>
  );
}
