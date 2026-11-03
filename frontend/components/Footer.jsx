import Link from 'next/link';
import { Linkedin, Twitter, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { company } from '@/data/site';
import { products } from '@/data/products';

const studioLinks = [
  { name: 'All Services', href: '/services' },
  { name: 'Web Development', href: '/services/web-development' },
  { name: 'App Development', href: '/services/app-development' },
  { name: 'AI & Automation', href: '/services/ai-automation' },
  { name: 'Our Work', href: '/portfolio' },
];

const companyLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Careers', href: '/careers' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact', href: '/#contact' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid footer-grid--5">
          {/* Company Info */}
          <div className="footer-column">
            <Link href="/" className="footer-brand">JAQYI</Link>
            <p className="footer-tagline">
              Software studio &amp; product company. We build software for businesses — and for the world.
            </p>
            <div className="footer-socials">
              <a href={company.socials.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="JAQYI on LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={company.socials.x} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="JAQYI on X (Twitter)">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Studio */}
          <nav className="footer-column" aria-label="JAQYI Studio">
            <h4 className="footer-heading">JAQYI Studio</h4>
            <ul className="footer-links">
              {studioLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav className="footer-column" aria-label="JAQYI Products">
            <h4 className="footer-heading">JAQYI Products</h4>
            <ul className="footer-links">
              <li><Link href="/products" className="footer-link">All Products</Link></li>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="footer-link">
                    {p.name} — {p.category}
                  </Link>
                </li>
              ))}
              {products.map((p) => (
                <li key={`${p.slug}-app`}>
                  <a href={p.appUrl} className="footer-link" target="_blank" rel="noopener">
                    Open {p.name} <ArrowUpRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav className="footer-column" aria-label="Company">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-link">{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-heading">Get in Touch</h4>
            <address className="footer-contact">
              <a href={`mailto:${company.email}`} className="footer-contact-item">
                <Mail size={16} />
                <span>{company.email}</span>
              </a>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="footer-contact-item">
                <Phone size={16} />
                <span>{company.phone}</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>{company.address.addressLocality}, {company.address.addressRegion}, India</span>
              </div>
            </address>
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
