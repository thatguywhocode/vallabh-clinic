import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Phone, Mail, MapPin } from 'lucide-react';
import Container from '../common/Container';
import Logo from '../common/Logo';
import { useBrandIntro } from '../../context/BrandIntroContext';

export default function Footer() {
  const { playIntro } = useBrandIntro();
  return (
    <footer className="bg-[#49614D] text-white border-t border-[#3D5240]/80 pt-16 pb-12 transition-colors">
      <Container>
        {/* Value Propositions Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-white/15">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wide">Pan-India Express Delivery</h5>
              <p className="text-[11px] text-warm-100/80">Free delivery on orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wide">Physician-Reviewed Formulations</h5>
              <p className="text-[11px] text-warm-100/80">100% genuine non-prescription botanicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wide">Quality Guarantee</h5>
              <p className="text-[11px] text-warm-100/80">Standardized botanical extracts & batch testing</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-200 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wide">Dedicated Support</h5>
              <p className="text-[11px] text-warm-100/80">support@vallabhclinic.com</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/15">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Logo
              onGreen={true}
              onClick={(e) => {
                e.preventDefault();
                playIntro();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer"
            />
            <p className="text-xs text-warm-100/85 leading-relaxed font-sans pt-1">
              <span className="font-semibold text-white">VALLABH CLINIC</span> is an integrative healthcare e-commerce and doctor-patient management platform. Delivering clinical-grade herbal essentials, everyday wellness, and verified doctor recommendations.
            </p>
            <div className="flex items-center gap-2 text-xs text-warm-100/80 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Registered Healthcare E-Commerce</span>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Healthcare Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-warm-100/85 font-sans">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Healthcare Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=vitality" className="hover:text-white transition-colors">
                  Immunity & Daily Vitality
                </Link>
              </li>
              <li>
                <Link to="/products?category=digestion" className="hover:text-white transition-colors">
                  Digestive & Gut Wellness
                </Link>
              </li>
              <li>
                <Link to="/products?category=stress" className="hover:text-white transition-colors">
                  Rest & Stress Balance
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition-colors">
                  All Wellness Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Patient & Doctor Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-warm-100/85 font-sans">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Patient & Doctor Registration
                </Link>
              </li>
              <li>
                <Link to="/demo-access" className="hover:text-white transition-colors">
                  Presentation Demo Personas
                </Link>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-white transition-colors">
                  How Physician Prescriptions Work
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-white tracking-wide mb-4">
              Fulfillment & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-warm-100/85 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F7A6A2] shrink-0 mt-0.5" />
                <span>Vallabh Healthcare Central Distribution, Suite 104, Mumbai, Maharashtra</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>+91 (0) 22 2456 7890 (Mon-Sat, 9AM-6PM)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>orders@vallabhclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-100/75 font-sans">
          <p>© {new Date().getFullYear()} <span className="text-white font-bold">VALLABH CLINIC</span>. All rights reserved. Prices displayed in Indian Rupees (₹ INR).</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={playIntro}
              className="text-warm-100 hover:text-white underline decoration-dotted text-[11px] cursor-pointer transition-colors"
              title="Replay the cinematic brand introduction"
            >
              Replay Brand Intro
            </button>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-emerald-200">Healthcare E-Commerce</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Non-Prescription OTC Wellness</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
