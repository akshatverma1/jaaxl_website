import React from 'react';
import { motion, useInView } from 'framer-motion';
import { servicesData } from '../data/mock';
import { 
  Search, Target, Share2, FileText, MapPin, 
  Smartphone, Tablet, Layers, Code, Grid, Globe,
  Monitor, Box, Cloud, Database, Cpu, Brain,
  MessageSquare, BarChart, ArrowRight
} from 'lucide-react';

const iconMap = {
  Search, Target, Share2, FileText, MapPin,
  Smartphone, Tablet, Layers, Code, Grid, Globe,
  Monitor, Box, Cloud, Database, Cpu, Brain,
  MessageSquare, BarChart
};

const ServiceCard = ({ service, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[service.icon];

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="service-icon-wrapper">
        <Icon className="service-icon" />
      </div>
      <h3 className="service-name">{service.name}</h3>
      <p className="service-description">{service.description}</p>
      <motion.div 
        className="service-arrow"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight size={20} />
      </motion.div>
    </motion.div>
  );
};

const ServiceCategory = ({ category, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="service-category"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="category-header">
        <h2 className="category-title">{category.category}</h2>
        <p className="category-description">{category.description}</p>
      </div>
      <div className="services-grid">
        {category.services.map((service, idx) => (
          <ServiceCard key={service.name} service={service} index={idx} />
        ))}
      </div>
    </motion.div>
  );
};

const Services = () => {
  const titleRef = React.useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <motion.div
          ref={titleRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">{servicesData.title}</h2>
          <p className="section-subtitle">{servicesData.subtitle}</p>
        </motion.div>

        <div className="categories-wrapper">
          {servicesData.categories.map((category, index) => (
            <ServiceCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
