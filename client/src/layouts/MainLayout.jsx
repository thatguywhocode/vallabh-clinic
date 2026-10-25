import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import BrandIntro from '../components/common/BrandIntro';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-100 text-earth-800 botanical-grain">
      <BrandIntro />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
