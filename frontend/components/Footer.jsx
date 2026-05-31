'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Careers', href: '/careers', isRoute: true }
  ];

  const services = [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'App Development', href: '/services/app-development' },
    { name: 'AI & Automation', href: '/services/ai-automation' },
    { name: 'SaaS Development', href: '/services/web-development' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-column">
            <h3 className="footer-brand">JAQYI</h3>
            <p className="footer-tagline">
              A creative software studio for ambitious businesses
            </p>
            <div className="footer-socials">
              <motion.a
                href="https://www.linkedin.com/company/jaqyi/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://x.com/jaqyi_com?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="footer-link"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="footer-link">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-heading">Get in Touch</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <Mail size={16} />
                <span>akshat@jaqyi.com</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+91 9109621850</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} JAQYI. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-separator">•</span>
            <Link href="/terms-of-service" className="footer-legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
