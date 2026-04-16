import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Briefcase, Sparkles, Users, Zap, Star, ChevronLeft } from 'lucide-react';

const perks = [
  {
    icon: Zap,
    title: 'Work that matters',
    description: 'Every project you bring in will have a real impact. You are not filling a quota — you are building a business.'
  },
  {
    icon: Users,
    title: 'Small, elite team',
    description: 'No bureaucracy. No pointless meetings. You work with sharp people who move fast and care about quality.'
  },
  {
    icon: Star,
    title: 'High rewards',
    description: 'Uncapped commissions with competitive retainers. If you close, you earn. It is that simple.'
  }
];

const openRoles = [
  {
    id: 'sales-person',
    title: 'Sales Person',
    location: 'Remote',
    type: 'Full-time',
    badge: 'Hiring Now',
    description: 'Hunt, pitch, and close high-value digital and software service deals with SMBs and enterprises globally. Own the entire sales cycle.'
  }
];

const Careers = () => {
  const heroRef = React.useRef(null);
  const perksRef = React.useRef(null);
  const jobsRef = React.useRef(null);

  const isPerksInView = useInView(perksRef, { once: true, margin: '-80px' });
  const isJobsInView = useInView(jobsRef, { once: true, margin: '-80px' });

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Animated background orbs */}
        <motion.div
          style={{
            position: 'absolute', top: '20%', right: '15%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 25, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <motion.div
          style={{
            position: 'absolute', bottom: '10%', left: '10%',
            width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.04)'
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 48px', position: 'relative', zIndex: 2 }}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', marginBottom: '72px', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              <ChevronLeft size={16} />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '32px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            <Sparkles size={13} />
            We are hiring
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              fontSize: '96px',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: '0 0 24px 0',
              maxWidth: '900px'
            }}
          >
            Build the future.<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>At JAQYI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: '20px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
              maxWidth: '560px',
              margin: '0 0 56px 0'
            }}
          >
            We don't hire job-seekers. We partner with people who take ownership, move with urgency, and care deeply about doing excellent work.
          </motion.p>

          <motion.a
            href="#open-roles"
            onClick={e => { e.preventDefault(); document.querySelector('#open-roles')?.scrollIntoView({ behavior: 'smooth' }); }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              backgroundColor: '#ffffff', color: '#000000',
              padding: '16px 32px', borderRadius: '8px',
              fontSize: '16px', fontWeight: 400,
              textDecoration: 'none',
              transition: 'background-color 0.2s ease'
            }}
          >
            See Open Roles
            <ArrowRight size={20} />
          </motion.a>
        </div>

        {/* Scroll line indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1, duration: 0.6 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
        </motion.div>
      </section>

      {/* ─── PERKS ─────────────────────────────────────────────────────────── */}
      <section ref={perksRef} style={{ backgroundColor: '#ffffff', padding: '96px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isPerksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '60px', fontWeight: 300, letterSpacing: '-0.02em', color: '#000000', margin: '0 0 16px 0' }}>
              Why join us?
            </h2>
            <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(0,0,0,0.6)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
              The short answer: we do real work, with real outcomes, for real companies.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {perks.map((perk, index) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isPerksInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ y: -4 }}
                  style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '16px',
                    padding: '40px 36px',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ebebeb'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                >
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#000000',
                    borderRadius: '10px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '24px'
                  }}>
                    <Icon size={22} color="#ffffff" />
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: 400, color: '#000000', margin: '0 0 12px 0' }}>
                    {perk.title}
                  </h3>
                  <p style={{ fontSize: '15px', fontWeight: 400, color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, margin: 0 }}>
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── OPEN ROLES ─────────────────────────────────────────────────────── */}
      <section id="open-roles" ref={jobsRef} style={{ backgroundColor: '#000000', padding: '96px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: '72px' }}
          >
            <h2 style={{ fontSize: '60px', fontWeight: 300, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 16px 0' }}>
              Open Positions
            </h2>
            <p style={{ fontSize: '18px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              Carefully crafted roles for exceptional people.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {openRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isJobsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={`/careers/${role.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <motion.div
                    whileHover={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.04)' }}
                    style={{
                      padding: '48px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      transition: 'border-color 0.3s ease, background-color 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Subtle top glow line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '280px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                          <h3 style={{ fontSize: '32px', fontWeight: 300, letterSpacing: '-0.01em', color: '#ffffff', margin: 0 }}>
                            {role.title}
                          </h3>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '4px 12px',
                            backgroundColor: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 400,
                            color: 'rgba(255,255,255,0.7)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            whiteSpace: 'nowrap'
                          }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4ade80', display: 'inline-block' }} />
                            {role.badge}
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                          {[
                            { icon: MapPin, label: role.location },
                            { icon: Clock, label: role.type },
                            { icon: Briefcase, label: 'Sales' }
                          ].map(({ icon: Icon, label }) => (
                            <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                              <Icon size={15} />
                              {label}
                            </span>
                          ))}
                        </div>

                        <p style={{ fontSize: '16px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0, maxWidth: '580px' }}>
                          {role.description}
                        </p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                          flexShrink: 0,
                          width: '56px', height: '56px',
                          borderRadius: '50%',
                          border: '1px solid rgba(255,255,255,0.15)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#ffffff',
                          alignSelf: 'center'
                        }}
                      >
                        <ArrowRight size={22} />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No-more roles hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isJobsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ marginTop: '72px', paddingTop: '48px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}
          >
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.35)', margin: '0 0 8px 0' }}>
              Don't see the right role?
            </p>
            <a
              href="mailto:akshat@jaqyi.com"
              style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '2px' }}
            >
              Reach out directly — akshat@jaqyi.com
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
