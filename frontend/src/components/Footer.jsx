import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Web Development',
    'Mobile Development',
    'AI & Automation',
    'Digital Marketing',
    'SaaS Development'
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
                href="#"
                className="footer-social-link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="footer-social-link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="footer-social-link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="footer-social-link"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
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
                <li key={service}>
                  <span className="footer-link">{service}</span>
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
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-separator">•</span>
            <a href="#" className="footer-legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
