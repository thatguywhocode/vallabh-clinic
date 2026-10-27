import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures every route transition (especially to /products/:id) reliably starts at the top.
 * Preserves intentional anchor scrolling (e.g. /#about or /#categories).
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // Disable browser automatic scroll restoration to avoid conflicting restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // If an in-page anchor hash is specified, allow browser to scroll to that section
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
        return;
      }
    }

    // For all other page transitions, scroll immediately to top (0, 0)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, search, hash]);

  return null;
}
