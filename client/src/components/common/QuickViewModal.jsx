import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import ProductImage from './ProductImage';
import Button from './Button';
import Badge from './Badge';
import { useCart } from '../../context/CartContext';

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C251E]/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-white rounded-3xl border border-[#CBD5CD] shadow-2xl w-full max-w-3xl overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-warm-200 bg-warm-50/70">
            <div className="flex items-center gap-2">
              <Badge variant="botanical" className="text-[10px]">
                Quick View
              </Badge>
              <span className="text-xs text-earth-500 font-medium">
                {product.categoryName}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-earth-400 hover:text-[#1C251E] hover:bg-warm-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 items-start max-h-[80vh] overflow-y-auto">
            {/* Left: Product Artwork */}
            <div className="md:col-span-5 space-y-3">
              <div className="rounded-2xl border border-warm-200 p-2 bg-gradient-to-b from-[#FCFBF8] to-[#F7F5EF] flex items-center justify-center">
                <ProductImage product={product} className="h-64 sm:h-72 w-full" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-earth-600 px-1">
                <span>Pack: <strong>{product.volume}</strong></span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isOutOfStock ? 'Sold Out' : `In Stock (${product.stock || 40})`}
                </span>
              </div>
            </div>

            {/* Right: Formulation Details & Actions */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C251E] leading-tight">
                  {product.name}
                </h3>
                {product.subtitle && (
                  <p className="text-xs text-[#49614D] font-medium mt-1">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-warm-200">
                <span className="font-serif text-3xl font-bold text-[#1C251E]">
                  ₹{product.price}
                </span>
                <span className="text-xs text-earth-500">
                  Standard clinic sample price (incl. taxes)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#41382E] leading-relaxed">
                {product.description}
              </p>

              {/* Key Ingredients snippet */}
              {product.keyIngredients && product.keyIngredients.length > 0 && (
                <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#49614D] block tracking-wider">
                    Key Botanical Phyto-Nutrients:
                  </span>
                  <p className="text-[11px] text-earth-700 leading-normal">
                    {product.keyIngredients.slice(0, 3).join(' • ')}
                  </p>
                </div>
              )}

              {/* Actions & Quantity */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-warm-300 rounded-xl bg-warm-50 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-xs font-bold text-earth-700 hover:bg-warm-200 transition-colors"
                    >
                      –
                    </button>
                    <span className="px-3 text-xs font-bold text-[#1C251E]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-xs font-bold text-earth-700 hover:bg-warm-200 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <Button
                    variant={justAdded ? 'secondary' : 'vermilion'}
                    size="md"
                    className="flex-1 justify-center transition-all"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    icon={justAdded ? CheckCircle2 : ShoppingBag}
                    iconPosition="left"
                  >
                    {justAdded ? 'Added to Cart ✓' : isOutOfStock ? 'Sold Out' : `Add to Cart (₹${product.price * quantity})`}
                  </Button>
                </div>

                {/* View Full Details Link */}
                <div className="flex items-center justify-between pt-2 text-xs border-t border-warm-100">
                  <div className="flex items-center gap-1.5 text-earth-500 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Non-Prescription OTC Formulation</span>
                  </div>

                  <Link
                    to={`/products/${product.id}`}
                    onClick={onClose}
                    className="font-bold text-[#49614D] hover:underline flex items-center gap-1"
                  >
                    <span>Full Product Specification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
