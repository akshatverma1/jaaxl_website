import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { contactData } from '../data/mock';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const iconMap = {
  Linkedin, Twitter, Github, Instagram
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const titleRef = React.useRef(null);
  const formRef = React.useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Mock submission - will be replaced with backend integration
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <motion.div
          ref={titleRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{contactData.title}</h2>
          <p className="section-subtitle">{contactData.subtitle}</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-info-item">
              <Mail className="contact-icon" />
              <div>
                <h3 className="contact-label">Email</h3>
                <p className="contact-value">{contactData.email}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <Phone className="contact-icon" />
              <div>
                <h3 className="contact-label">Phone</h3>
                <p className="contact-value">{contactData.phone}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <MapPin className="contact-icon" />
              <div>
                <h3 className="contact-label">Address</h3>
                <p className="contact-value">{contactData.address}</p>
              </div>
            </div>

            <div className="contact-socials">
              <h3 className="contact-label">Follow Us</h3>
              <div className="social-links">
                {contactData.socials.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="social-link"
                      whileHover={{ y: -3, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                className="form-textarea"
                rows={6}
              />
            </div>

            <Button type="submit" className="form-submit">
              Send Message
              <Send className="cta-icon" />
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
