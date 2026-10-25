import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Moon, Sparkles, HeartHandshake, ArrowRight, Package } from 'lucide-react';
import Container from '../components/common/Container';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { CATEGORIES } from '../data/products';

const ICONS = {
  ShieldCheck,
  Leaf,
  Moon,
  Sparkles,
  HeartHandshake,
};

export default function CategoriesPage() {
  return (
    <div className="py-12 md:py-20 bg-warm-100 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <Badge variant="botanical">Browse Collections</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-botanical-900">
            Healthcare & Wellness Categories
          </h1>
          <p className="text-sm text-earth-600 font-sans">
            Explore physician-vetted botanical categories designed to restore and maintain daily physiological balance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICONS[cat.iconName] || Leaf;

            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-8 border border-botanical-100 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-botanical-50 border border-botanical-100 flex items-center justify-center text-botanical-600 group-hover:bg-botanical-500 group-hover:text-warm-50 transition-colors">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-botanical-700 uppercase tracking-wider block mb-1">
                      {cat.itemCount} Verified Essentials
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-botanical-900 group-hover:text-botanical-700 transition-colors">
                      {cat.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-earth-600 leading-relaxed font-sans">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-warm-100">
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-botanical-700 group-hover:text-botanical-900 transition-colors"
                  >
                    <span>Browse {cat.shortName} Catalog</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Doctor Recommendation info banner */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-botanical-100 shadow-soft-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-botanical-900">
              Need personalized guidance from a clinic practitioner?
            </h3>
            <p className="text-xs text-earth-600 font-sans">
              Our registered doctors review patient health profiles and configure custom botanical care packages.
            </p>
          </div>
          <Link to="/products">
            <Button variant="primary" size="md">
              View All Products (₹ INR)
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
