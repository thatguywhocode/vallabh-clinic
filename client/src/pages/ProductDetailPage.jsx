import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Leaf, 
  Clock, 
  Info,
  Plus,
  Minus
} from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import ProductImage from '../components/common/ProductImage';
import ProductCard from '../components/common/ProductCard';
import { useDemoData } from '../context/DemoDataContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products } = useDemoData();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Find product from shared demo data (which has live stock from Admin) or static catalog
  const product = products.find((p) => p.id === id) || PRODUCTS.find((p) => p.id === id);

  // Guarantee product details always open immediately at the top
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setQuantity(1);
  }, [id]);

  // If ID is invalid / product not found
  if (!product) {
    return (
      <div className="py-20 bg-[#F7F5EF] min-h-[70vh]">
        <Container size="narrow">
          <div className="bg-white rounded-3xl p-10 border border-warm-300 text-center space-y-4 shadow-soft-sm">
            <div className="w-16 h-16 rounded-full bg-warm-200 text-earth-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 opacity-60" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#1C251E]">
              Product Not Found
            </h2>
            <p className="text-xs sm:text-sm text-earth-600 max-w-sm mx-auto">
              The requested formulation could not be located in our catalog. It may have been archived or the ID is incorrect.
            </p>
            <div className="pt-2">
              <Link to="/products">
                <Button variant="primary" icon={ArrowLeft} iconPosition="left">
                  Return to Healthcare Shop
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Related products from the same category (excluding current)
  const relatedProducts = (products.length > 0 ? products : PRODUCTS)
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="py-10 md:py-16 bg-[#F7F5EF] min-h-screen font-sans">
      <Container>
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center gap-2 text-xs text-earth-600">
          <Link to="/" className="hover:text-[#49614D]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#49614D]">Shop</Link>
          <span>/</span>
          <span className="text-[#1C251E] font-medium truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Main Showcase */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#CBD5CD]/80 shadow-soft-sm mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Visual Product Packaging */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-[#CBD5CD] p-3 sm:p-4 bg-gradient-to-b from-[#FAF8F5] to-warm-100 flex items-center justify-center shadow-soft-xs">
                <ProductImage product={product} className="h-80 sm:h-96 w-full" />
              </div>

              {/* Quality & Origin Metadata Box */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200">
                  <span className="text-[10px] uppercase font-bold text-[#49614D] block">Classification</span>
                  <span className="font-semibold text-[#1C251E]">Non-Prescription OTC</span>
                </div>
                <div className="p-3 rounded-2xl bg-warm-50 border border-warm-200">
                  <span className="text-[10px] uppercase font-bold text-[#49614D] block">Volume / Pack</span>
                  <span className="font-semibold text-[#1C251E]">{product.volume}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Name, Pricing, Actions & Detailed Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <Badge variant="botanical" className="mb-2">
                  {product.categoryName}
                </Badge>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C251E] leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-earth-600 font-sans mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Price & Stock Display */}
              <div className="p-4 rounded-2xl bg-[#F4F6F4] border border-botanical-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-earth-500 block tracking-wide">
                    Standard Retail Sample Price
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#1C251E]">
                    ₹{product.price}
                  </span>
                  <span className="text-[11px] text-earth-500 block">
                    All taxes included &bull; Free express delivery above ₹499
                  </span>
                </div>

                <div className="text-right">
                  {isOutOfStock ? (
                    <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>In Stock {product.stock !== undefined ? `(${product.stock} available)` : ''}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Factual Product Description */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#1C251E] uppercase tracking-wider block">
                  Product Overview:
                </span>
                <p className="text-xs sm:text-sm text-earth-700 leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>

              {/* Quantity & Add to Cart Controls */}
              <div className="pt-2 border-t border-warm-200 space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-warm-300 rounded-xl bg-warm-50 overflow-hidden">
                    <button
                      type="button"
                      disabled={quantity <= 1 || isOutOfStock}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 hover:bg-warm-200 text-earth-700 disabled:opacity-40 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-[#1C251E]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2.5 hover:bg-warm-200 text-earth-700 disabled:opacity-40 transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add Button */}
                  <Button
                    variant="primary"
                    size="md"
                    icon={ShoppingBag}
                    iconPosition="left"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className="flex-1 min-w-[200px]"
                  >
                    {isOutOfStock ? 'Sold Out' : `Add ${quantity} to Cart (₹${product.price * quantity})`}
                  </Button>
                </div>

                {addedNotice && (
                  <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Added {quantity} unit(s) of "{product.name}" to your cart!</span>
                  </div>
                )}
              </div>

              {/* Informational Accordion / Sections */}
              <div className="space-y-4 pt-4 border-t border-warm-200 text-xs">
                {/* Ingredients */}
                {product.keyIngredients && product.keyIngredients.length > 0 && (
                  <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
                    <span className="font-bold text-[#1C251E] uppercase tracking-wide block flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-[#49614D]" />
                      Key Botanical Ingredients:
                    </span>
                    <ul className="space-y-1 text-earth-700 list-disc list-inside">
                      {product.keyIngredients.map((ing, idx) => (
                        <li key={idx} className="leading-relaxed">{ing}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Traditional Use */}
                {product.traditionalUse && (
                  <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-1">
                    <span className="font-bold text-[#1C251E] uppercase tracking-wide block flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#49614D]" />
                      Traditional Intended Use (Ayurvedic Reference):
                    </span>
                    <p className="text-earth-700 leading-relaxed font-sans">
                      {product.traditionalUse}
                    </p>
                  </div>
                )}

                {/* Directions */}
                {product.usage && (
                  <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-1">
                    <span className="font-bold text-[#1C251E] uppercase tracking-wide block flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#49614D]" />
                      Verified Directions of Use:
                    </span>
                    <p className="text-earth-700 leading-relaxed font-sans">
                      {product.usage}
                    </p>
                  </div>
                )}

                {/* Precautions */}
                {product.precautions && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1 text-amber-900">
                    <span className="font-bold uppercase tracking-wide block flex items-center gap-1.5 text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                      Precautions & Guidance:
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {product.precautions}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Formulations in Same Category */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#49614D]">Complementary Formulations</span>
                <h3 className="font-serif text-2xl font-bold text-[#1C251E]">
                  More from {product.categoryName}
                </h3>
              </div>
              <Link to={`/products?category=${product.category}`} className="text-xs font-semibold text-[#49614D] underline hover:text-black">
                View Full Collection &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
