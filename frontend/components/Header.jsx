'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// Real URLs (not bare #hashes) so every link works from every page and is crawlable.
const navItems = [
  { name: 'Services', href: '/services', match: '/services' },
  { name: 'Products', href: '/products', match: '/products' },
  { name: 'Work', href: '/portfolio', match: '/portfolio' },
  { name: 'About', href: '/#about' },
  { name: 'Careers', href: '/careers', match: '/careers' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu after navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (item) => item.match && pathname?.startsWith(item.match);

  return (
    <motion.header
      className={`header ${isScrolled || isMobileMenuOpen ? 'header-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-container">
        <Link href="/" className="header-logo" aria-label="JAQYI home">
          JAQYI
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${isActive(item) ? 'nav-link--active' : ''}`}
              aria-current={isActive(item) ? 'page' : undefined}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/#contact" className="nav-cta">
            Start a project <ArrowUpRight size={14} />
          </Link>
        </nav>

        <div className="header-actions">
          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav" aria-label="Mobile">
              {[...navItems, { name: 'Contact', href: '/#contact' }].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
