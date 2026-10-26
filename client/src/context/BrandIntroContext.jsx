import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BrandIntroContext = createContext();

export function BrandIntroProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('intro') === 'true') return true;
      if (params.get('intro') === 'false') return false;

      // Automatically play intro on first visit/open of the browser session
      try {
        const hasPlayed = sessionStorage.getItem('vallabh_intro_played');
        return !hasPlayed;
      } catch (e) {
        return true;
      }
    }
    return false;
  });
  const navigate = useNavigate();
  const location = useLocation();

  const playIntro = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const closeIntro = useCallback(() => {
    setIsPlaying(false);
    try {
      sessionStorage.setItem('vallabh_intro_played', 'true');
    } catch (e) {
      // ignore storage access errors if in restricted mode
    }
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__playVallabhIntro = playIntro;
      window.__closeVallabhIntro = closeIntro;

      // Allow deterministic test trigger via ?intro=true parameter without affecting normal usage
      const params = new URLSearchParams(window.location.search);
      if (params.get('intro') === 'true') {
        setIsPlaying(true);
      }
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.__playVallabhIntro;
        delete window.__closeVallabhIntro;
      }
    };
  }, [playIntro, closeIntro]);

  return (
    <BrandIntroContext.Provider value={{ isPlaying, playIntro, closeIntro }}>
      {children}
    </BrandIntroContext.Provider>
  );
}

export function useBrandIntro() {
  const context = useContext(BrandIntroContext);
  if (!context) {
    throw new Error('useBrandIntro must be used within a BrandIntroProvider');
  }
  return context;
}
