import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ShoppingBag, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';
import ProductImage from './ProductImage';
import QuickViewModal from './QuickViewModal';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });

  const prefersReducedMotion = useReducedMotion();
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  // Subtle 3D perspective tilt calculation (max 5-6 degrees)
  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return; // Skip tilt on touch devices
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = Number((((y - centerY) / centerY) * -5.5).toFixed(2));
    const rotateY = Number((((x - centerX) / centerX) * 5.5).toFixed(2));

    setTilt({ rotateX, rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  };

  return (
    <>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: prefersReducedMotion ? 0 : tilt.rotateX,
          rotateY: prefersReducedMotion ? 0 : tilt.rotateY,
          y: prefersReducedMotion ? 0 : tilt.isHovered ? -5 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 24,
          mass: 0.6,
        }}
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        className={`bg-white rounded-3xl p-4 sm:p-5 border transition-shadow duration-300 flex flex-col justify-between group h-full relative ${
          tilt.isHovered
            ? 'border-[#49614D]/40 shadow-[0_20px_35px_-10px_rgba(28,37,30,0.13)]'
            : 'border-[#CBD5CD]/80 shadow-soft-sm'
        }`}
      >
        <div className="space-y-3">
          {/* Visual Apothecary Container with 3D Depth Layer */}
          <div
            className="relative overflow-hidden rounded-2xl transition-transform duration-300"
            style={{
              transform: tilt.isHovered && !prefersReducedMotion ? 'translateZ(16px)' : 'translateZ(0px)',
            }}
          >
            <Link to={`/products/${product.id}`} className="block">
              <ProductImage product={product} className="h-48 sm:h-52" />
            </Link>

            {/* Quick View Button Hover Trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/95 backdrop-blur-xs hover:bg-white text-[#1C251E] hover:text-[#49614D] border border-warm-300 text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-md flex items-center gap-1.5 cursor-pointer z-20 pointer-events-auto"
              title="Quick view product formulation"
            >
              <Eye className="w-3.5 h-3.5 text-[#49614D]" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Category & Title */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] text-earth-500 font-bold uppercase tracking-wider">
              <span className="text-[#49614D]">{product.categoryName}</span>
              <span className="font-medium text-earth-400">{product.volume}</span>
            </div>

            <Link to={`/products/${product.id}`} className="block">
              <h3 className="font-serif text-lg font-bold text-[#1C251E] group-hover:text-[#49614D] transition-colors leading-snug line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-[#5D4F3F] line-clamp-2 leading-relaxed font-sans min-h-[2rem]">
              {product.description}
            </p>
          </div>
        </div>

        {/* Pricing, Availability & Actions */}
        <div className="pt-3.5 mt-3 border-t border-warm-200 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-earth-500 font-semibold block uppercase tracking-wide">
                Price:
              </span>
              <span className="font-serif text-2xl font-bold text-[#1C251E]">
                ₹{product.price}
              </span>
            </div>

            <div className="text-right">
              {isOutOfStock ? (
                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  Out of Stock
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>In Stock {product.stock ? `(${product.stock})` : ''}</span>
                </span>
              )}
            </div>
          </div>

          {/* Actions: View Details & Animated Add to Cart */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link to={`/products/${product.id}`} className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs py-2 px-2 justify-center"
              >
                Details
              </Button>
            </Link>

            <Button
              variant={justAdded ? 'secondary' : 'primary'}
              size="sm"
              icon={justAdded ? CheckCircle2 : ShoppingBag}
              iconPosition="left"
              disabled={isOutOfStock}
              className={`w-full text-xs py-2 px-2 justify-center transition-all ${
                justAdded ? 'bg-emerald-700 text-white border-emerald-700' : ''
              }`}
              onClick={handleAddToCart}
            >
              {justAdded ? 'Added ✓' : isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
