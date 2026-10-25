import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Phone, Mail, MapPin } from 'lucide-react';
import Container from '../common/Container';
import Logo from '../common/Logo';
import { useBrandIntro } from '../../context/BrandIntroContext';

export default function Footer() {
  const { playIntro } = useBrandIntro();
  return (
    <footer className="bg-botanical-900 text-warm-100 border-t border-botanical-800 pt-16 pb-12 transition-colors">
      <Container>
        {/* Value Propositions Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-botanical-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-botanical-800 flex items-center justify-center text-botanical-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-warm-50 uppercase tracking-wide">Pan-India Express Delivery</h5>
              <p className="text-[11px] text-warm-400">Free delivery on orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-botanical-800 flex items-center justify-center text-botanical-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-warm-50 uppercase tracking-wide">Physician-Reviewed Formulations</h5>
              <p className="text-[11px] text-warm-400">100% genuine non-prescription botanicals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-botanical-800 flex items-center justify-center text-botanical-300 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-warm-50 uppercase tracking-wide">Quality Guarantee</h5>
              <p className="text-[11px] text-warm-400">Standardized botanical extracts & batch testing</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-botanical-800 flex items-center justify-center text-botanical-300 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-warm-50 uppercase tracking-wide">Dedicated Support</h5>
              <p className="text-[11px] text-warm-400">support@vallabhclinic.com</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-botanical-800/80">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Logo onGreen={true} />
            <p className="text-xs text-warm-300 leading-relaxed font-sans pt-1">
              <span className="font-semibold text-white">VALLABH CLINIC</span> is an integrative healthcare e-commerce and doctor-patient management platform. Delivering clinical-grade herbal essentials, everyday wellness, and verified doctor recommendations.
            </p>
            <div className="flex items-center gap-2 text-xs text-warm-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Registered Healthcare E-Commerce</span>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-warm-50 tracking-wide mb-4">
              Healthcare Shop
            </h4>
            <ul className="space-y-2.5 text-xs text-warm-300 font-sans">
              <li>
                <Link to="/products" className="hover:text-vermilion-400 transition-colors">
                  All Healthcare Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=vitality" className="hover:text-vermilion-400 transition-colors">
                  Immunity & Daily Vitality
                </Link>
              </li>
              <li>
                <Link to="/products?category=digestion" className="hover:text-vermilion-400 transition-colors">
                  Digestive & Gut Wellness
                </Link>
              </li>
              <li>
                <Link to="/products?category=stress" className="hover:text-vermilion-400 transition-colors">
                  Rest & Stress Balance
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-vermilion-400 transition-colors">
                  All Wellness Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Features */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-warm-50 tracking-wide mb-4">
              Patient & Doctor Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-warm-300 font-sans">
              <li>
                <Link to="/login" className="hover:text-vermilion-400 transition-colors">
                  Account Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-vermilion-400 transition-colors">
                  Patient & Doctor Registration
                </Link>
              </li>
              <li>
                <Link to="/demo-access" className="hover:text-vermilion-400 transition-colors">
                  Presentation Demo Personas
                </Link>
              </li>
              <li>
                <a href="#recommendations" className="hover:text-vermilion-400 transition-colors">
                  How Physician Prescriptions Work
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-warm-50 tracking-wide mb-4">
              Fulfillment & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-warm-300 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-vermilion-400 shrink-0 mt-0.5" />
                <span>Vallabh Healthcare Central Distribution, Suite 104, Mumbai, Maharashtra</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-botanical-400 shrink-0" />
                <span>+91 (0) 22 2456 7890 (Mon-Sat, 9AM-6PM)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-botanical-400 shrink-0" />
                <span>orders@vallabhclinic.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-400 font-sans">
          <p>© {new Date().getFullYear()} <span className="text-white font-medium">VALLABH CLINIC</span>. All rights reserved. Prices displayed in Indian Rupees (₹ INR).</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={playIntro}
              className="text-warm-300 hover:text-white underline decoration-dotted text-[11px] cursor-pointer transition-colors"
              title="Replay the cinematic brand introduction"
            >
              Replay Brand Intro
            </button>
            <span className="w-1 h-1 rounded-full bg-botanical-600" />
            <span className="text-botanical-300">Healthcare E-Commerce</span>
            <span className="w-1 h-1 rounded-full bg-botanical-600" />
            <span>Non-Prescription OTC Wellness</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
