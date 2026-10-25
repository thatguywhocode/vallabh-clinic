import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, User, Search, LogOut, ChevronRight } from 'lucide-react';
import Logo from '../common/Logo';
import { useCart } from '../../context/CartContext';
import { useDemoData } from '../../context/DemoDataContext';
import { useBrandIntro } from '../../context/BrandIntroContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();
  const { activeUser, logout } = useDemoData();
  const { playIntro } = useBrandIntro();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  // Base navigation links
  const baseNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/#about' },
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const hash = path.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    playIntro();
  };

  const activePortalPath = activeUser
    ? activeUser.role === 'doctor'
      ? '/doctor/dashboard'
      : activeUser.role === 'admin'
      ? '/admin/dashboard'
      : '/patient/dashboard'
    : null;

  const activePortalLabel = activeUser
    ? activeUser.role === 'doctor'
      ? 'Doctor Portal'
      : activeUser.role === 'admin'
      ? 'Admin Portal'
      : 'My Account'
    : null;

  return (
    <header className="sticky top-0 z-40 bg-[#49614D] border-b border-[#3D5240]/80 shadow-md backdrop-blur-md transition-all duration-300">
      {/* Full-width responsive container: positions logo exactly 32-40px from viewport edge on desktop */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4 lg:gap-6 w-full">
          {/* Zone 1 (Left): Brand Logo & Pure White #FFFFFF Typography */}
          <div className="shrink-0 flex items-center">
            <Logo
              onGreen={true}
              onClick={handleLogoClick}
              className="cursor-pointer"
            />
          </div>

          {/* Zone 2 (Center): Search & Primary Navigation */}
          <div className="hidden md:flex items-center justify-center gap-3 lg:gap-6 flex-1 max-w-xl lg:max-w-2xl mx-auto">
            {/* Desktop Search Bar */}
            <div className="w-full max-w-xs lg:max-w-sm">
              <form onSubmit={handleSearchSubmit} className="relative w-full group">
                <Search className="w-4 h-4 text-white/70 group-focus-within:text-[#49614D] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search botanical formulations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white placeholder:text-white/60 focus:bg-white focus:text-[#1C251E] focus:placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white transition-all shadow-inner"
                />
              </form>
            </div>

            {/* Desktop Primary Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
              {baseNavLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleNavClick(link.path)}
                    className={`text-xs font-semibold tracking-wider uppercase transition-all relative py-1 cursor-pointer ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Zone 3 (Right): User / Login / Register / Cart & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Authenticated Controls or Combined Login / Register Button */}
            {activeUser ? (
              <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                <button
                  type="button"
                  onClick={() => navigate(activePortalPath)}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer py-1 ${
                    location.pathname === activePortalPath ? 'text-white font-bold' : 'text-white/85 hover:text-white'
                  }`}
                >
                  {activePortalLabel}
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-xs font-semibold tracking-wider uppercase text-white/65 hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5"
                  title="Sign out from session (cart is preserved)"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Sign In or Create Account"
              >
                <User className="w-3.5 h-3.5 text-white/90" />
                <span>Login / Register</span>
              </button>
            )}

            {/* Cart Trigger Button with Animated Counter */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#E83F35] text-white hover:bg-[#D4271D] transition-all shadow-sm hover:shadow-md cursor-pointer font-sans"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide">Cart</span>
              <AnimatePresence mode="wait">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="w-5 h-5 rounded-full bg-white text-[#E83F35] text-[11px] font-bold flex items-center justify-center shadow-xs"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/15 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden border-t border-white/15"
            >
              <div className="py-4 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <Search className="w-4 h-4 text-[#49614D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search botanical products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-white/30 bg-white text-[#1C251E] placeholder:text-earth-400 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </form>

                <div className="flex flex-col gap-1 pb-2">
                  {baseNavLinks.map((link) => (
                    <button
                      key={link.name}
                      type="button"
                      onClick={() => handleNavClick(link.path)}
                      className="px-3 py-2.5 rounded-xl text-left text-sm font-medium text-white hover:bg-white/15 transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    </button>
                  ))}

                  {/* Mobile Combined Login / Register Button or User Session */}
                  {activeUser ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(activePortalPath);
                          setMobileMenuOpen(false);
                        }}
                        className="px-3 py-2.5 rounded-xl text-left text-sm font-semibold text-white hover:bg-white/15 transition-colors flex items-center justify-between"
                      >
                        <span>{activePortalLabel} ({activeUser.name})</span>
                        <ChevronRight className="w-4 h-4 text-white/50" />
                      </button>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="px-3 py-2.5 rounded-xl text-left text-sm font-medium text-white/80 hover:bg-white/15 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="mt-2 px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold text-white bg-white/15 hover:bg-white/20 border border-white/25 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-white" />
                        <span>Login / Register</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/50" />
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-white/80 px-2">
                  <span>Interactive Roles Demo:</span>
                  <Link
                    to="/demo-access"
                    onClick={() => setMobileMenuOpen(false)}
                    className="underline text-white font-semibold"
                  >
                    Demo Personas &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
