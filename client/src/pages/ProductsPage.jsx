import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ShoppingBag, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import Container from '../components/common/Container';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import ProductCard from '../components/common/ProductCard';
import { CATEGORIES } from '../data/products';
import { useDemoData } from '../context/DemoDataContext';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('featured');

  const { products } = useDemoData();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default featured
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-10 md:py-16 bg-[#F7F5EF] min-h-screen font-sans">
      <Container>
        {/* Breadcrumb & Header */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-earth-600 font-sans">
            <Link to="/" className="hover:text-[#49614D]">Home</Link>
            <span>/</span>
            <span className="text-[#1C251E] font-medium">Healthcare & Botanical Essentials</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Badge variant="botanical" className="mb-2">Official Healthcare Catalog</Badge>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1C251E]">
                Healthcare & Wellness Shop
              </h1>
              <p className="text-xs sm:text-sm text-earth-600 font-sans mt-1 max-w-xl">
                Non-prescription botanical formulations, daily supplements, and physician-reviewed self-care essentials. Sample prices in Indian Rupees (₹ INR).
              </p>
            </div>

            <div className="text-xs text-earth-500 bg-white/80 border border-[#CBD5CD] px-3 py-2 rounded-xl">
              Showing <span className="font-semibold text-[#1C251E]">{filteredProducts.length}</span> verified products
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#CBD5CD] shadow-soft-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-earth-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, ingredients (e.g., Amla, Triphala, Ashwagandha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D] transition-all"
              />
            </div>

            {/* Sort Select */}
            <div className="md:col-span-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2.5 px-3 text-xs sm:text-sm rounded-xl border border-warm-300 bg-warm-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#49614D] text-[#1C251E]"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-warm-200">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#49614D] text-white shadow-soft-sm'
                  : 'bg-warm-100 text-earth-700 hover:bg-warm-200'
              }`}
            >
              All Essentials
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#49614D] text-white shadow-soft-sm'
                    : 'bg-warm-100 text-earth-700 hover:bg-warm-200'
                }`}
              >
                {cat.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#CBD5CD] p-8 space-y-4">
            <h3 className="font-serif text-2xl text-[#1C251E]">No matching healthcare products</h3>
            <p className="text-xs text-earth-600 max-w-sm mx-auto">
              We couldn't find items matching your search or category filters. Try clearing your search keyword or switching collections.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Doctor Recommendation Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#49614D] to-[#28362B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft-lg">
          <div className="space-y-2">
            <Badge variant="vermilion" className="bg-white/10 text-white border-white/20">
              Doctor Recommendations
            </Badge>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Looking for Doctor-Prescribed Botanical Protocols?
            </h3>
            <p className="text-xs sm:text-sm text-warm-200 max-w-xl">
              Clinic practitioners configure personalized OTC botanical regimens for linked patients, accessible with 1-click refills inside the patient portal.
            </p>
          </div>

          <Link to="/login">
            <Button variant="vermilion" size="md">
              Access Patient Portal &rarr;
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
