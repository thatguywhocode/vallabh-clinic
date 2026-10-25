import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DemoDataProvider } from './context/DemoDataContext';
import { CartProvider } from './context/CartContext';
import { BrandIntroProvider } from './context/BrandIntroContext';
import ScrollToTop from './components/common/ScrollToTop';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <BrandIntroProvider>
        <DemoDataProvider>
          <CartProvider>
            <ScrollToTop />
            <AppRoutes />
          </CartProvider>
        </DemoDataProvider>
      </BrandIntroProvider>
    </BrowserRouter>
  );
}
