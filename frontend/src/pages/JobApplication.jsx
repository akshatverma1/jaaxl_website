import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, Send, CheckCircle, AlertCircle, Loader2, UploadCloud, X } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ─── Data ─────────────────────────────────────────────────────────────────
const sections = [
  {
    id: 'basic',
    label: '01',
    title: 'Basic Info',
    color: '#ffffff',
    fields: [
      { name: 'fullName',    label: 'Full Name',                         type: 'input',    placeholder: 'John Doe',                  required: true },
      { name: 'email',       label: 'Email Address',                     type: 'email',    placeholder: 'you@example.com',            required: true },
      { name: 'phone',       label: 'Phone Number',                      type: 'input',    placeholder: '+91 98765 43210',            required: true },
      { name: 'location',    label: 'City / Location',                   type: 'input',    placeholder: 'Mumbai, India',              required: true },
      { name: 'linkedin',    label: 'LinkedIn / Portfolio URL',          type: 'url',      placeholder: 'https://linkedin.com/in/…',  required: true },
      { name: 'experience',  label: 'Years of Experience in Sales',      type: 'number',   placeholder: 'e.g. 5',                    required: true },
    ]
  },
  {
    id: 'background',
    label: '02',
    title: 'Sales Background',
    color: '#ffffff',
    fields: [
      { name: 'recentRole',      label: 'What is your current or most recent role? Describe what you sold and to whom.',                                                                                      type: 'textarea', rows: 3, required: true },
      { name: 'achievement',     label: 'What is your highest sales achievement? Give numbers — deal size, revenue generated, quota %, team rank.',                                                          type: 'textarea', rows: 3, required: true },
      { name: 'techSales',       label: 'Have you sold software development, digital marketing, or tech services before? If yes, describe the services and average deal size.',                              type: 'textarea', rows: 3, required: true },
      { name: 'clientsClosed',   label: 'How many new clients did you close in the last 6 months? What was the average sales cycle length?',                                                                 type: 'textarea', rows: 2, required: true },
      { name: 'process',         label: 'Walk us through your personal sales process — from first contact to close. Be specific.',                                                                           type: 'textarea', rows: 4, required: true },
      { name: 'international',   label: 'Have you worked with international clients (US, UK, UAE, Australia, Canada)? If yes, which markets and how did you reach them?',                                   type: 'textarea', rows: 3, required: true },
    ]
  },
  {
    id: 'mindset',
    label: '03',
    title: 'Mindset & Market Thinking',
    color: '#ffffff',
    fields: [
      { name: 'agencyThinking',  label: 'As a startup, what do you think an agency actually does? Share your own thoughts — not GPT or copied research.',                                                                                                                                                                              type: 'textarea', rows: 4, required: true },
      { name: 'servicesHandled', label: 'From our listed services, which ones can you personally handle end-to-end without core team support? Also mention services you can manage via your network — include contact names, role, background, and how they add value.',                                                                  type: 'textarea', rows: 4, required: true },
      { name: 'idealCustomer',   label: 'Who do you believe is our ideal customer? Be specific — industry, company size, decision-maker role, and pain points we solve better than others.',                                                                                                                                            type: 'textarea', rows: 3, required: true },
      { name: 'boomingServices', label: 'Which of our services do you believe are currently booming in the market — and why? Base this on observation, not hype.',                                                                                                                                                                     type: 'textarea', rows: 3, required: true },
    ]
  },
  {
    id: 'execution',
    label: '04',
    title: 'Execution Ability',
    color: '#ffffff',
    fields: [
      { name: 'marketingMethods', label: 'Which marketing methods can you execute immediately (not just theoretically)? Explain your skill level for each. (e.g. cold email, LinkedIn, cold calling, WhatsApp, Upwork, CRM…)', type: 'textarea', rows: 4, required: true },
      { name: 'practicalWays',    label: 'How many practical ways can you think of to find and reach our ideal customers? Explain the channel and your specific approach for each.',                                            type: 'textarea', rows: 4, required: true },
      { name: 'toolsUsed',        label: 'What tools and software do you currently use for sales and outreach?',                                                                                                               type: 'textarea', rows: 2, required: true },
    ]
  },
  {
    id: 'closing',
    label: '05',
    title: 'Closing & Communication',
    color: '#ffffff',
    fields: [
      { name: 'pitch',          label: 'Do you believe you can confidently sell our services? If yes, write a 30-second pitch as if you are on a real sales call.',                                      type: 'textarea', rows: 4, required: true },
      { name: 'lostDeal',       label: 'Describe a time you lost a deal. What happened and what did you learn?',                                                                                          type: 'textarea', rows: 3, required: true },
      { name: 'priceResponse',  label: 'How do you handle a prospect who says "your price is too high"? Write your actual response.',                                                                     type: 'textarea', rows: 3, required: true },
      { name: 'compensation',   label: 'What is your expected monthly revenue target you can commit to — and what monthly compensation are you expecting?',                                               type: 'textarea', rows: 2, required: true },
      { name: 'whyJaqyi',       label: 'Why Jaqyi specifically — and why now? What about this role excites you beyond just a paycheck?',                                                                 type: 'textarea', rows: 3, required: true },
    ]
  }
];

const allFieldNames = sections.flatMap(s => s.fields.map(f => f.name));
const initialForm = Object.fromEntries(allFieldNames.map(n => [n, '']));

// ─── Sub-components ───────────────────────────────────────────────────────

const FieldInput = ({ field, value, onChange, disabled }) => {
  const baseStyle = {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: 300,
    fontFamily: 'inherit',
    padding: '14px 16px',
    outline: 'none',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    resize: 'vertical',
    boxSizing: 'border-box',
  };

  const props = {
    name: field.name,
    value: value,
    onChange: onChange,
    disabled: disabled,
    required: field.required,
    placeholder: field.placeholder || '',
    style: baseStyle,
    onFocus: e => { e.target.style.borderColor = 'rgba(255,255,255,0.35)'; e.target.style.backgroundColor = 'rgba(255,255,255,0.07)'; },
    onBlur:  e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)';  e.target.style.backgroundColor = 'rgba(255,255,255,0.04)'; },
  };

  if (field.type === 'textarea') {
    return <textarea {...props} rows={field.rows || 3} />;
  }
  return <input {...props} type={field.type === 'input' ? 'text' : field.type} />;
};

// ─── Main Component ───────────────────────────────────────────────────────
const JobApplication = () => {
  const [formData, setFormData]   = useState(initialForm);
  const [resume, setResume]       = useState(null);
  const [status, setStatus]       = useState('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleFileChange = e => {
    if (e.target.files?.[0]) setResume(e.target.files[0]);
  };

  const clearResume = () => setResume(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!resume) { setStatus('error'); setStatusMsg('Please attach your resume before submitting.'); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    setStatus('loading');
    setStatusMsg('');

    try {
      const fd = new FormData();
      fd.append('answers', JSON.stringify(formData));
      fd.append('resume', resume);

      const res  = await fetch(`${API_BASE_URL}/api/careers/apply`, { method: 'POST', body: fd });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus('error');
        setStatusMsg(data.message || 'Something went wrong. Please try again.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      setStatus('error');
      setStatusMsg('Unable to reach the server. Check your connection and try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── Success screen ────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div style={{ backgroundColor: '#000000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '600px' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{
              width: '96px', height: '96px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.15)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 40px auto'
            }}
          >
            <CheckCircle size={44} color="rgba(255,255,255,0.9)" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '56px', fontWeight: 300, letterSpacing: '-0.02em', color: '#ffffff', margin: '0 0 20px 0', lineHeight: 1.1 }}
          >
            Application<br />Received.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 48px 0' }}
          >
            Thank you for applying to the <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>Sales Person</strong> role at JAQYI. We have received your responses and resume. A confirmation email is on its way to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                backgroundColor: '#ffffff', color: '#000000',
                padding: '16px 32px', borderRadius: '8px',
                fontSize: '16px', fontWeight: 400,
                textDecoration: 'none'
              }}
            >
              Return to JAQYI
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ── Form screen ───────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── Top bar ── */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            <ChevronLeft size={16} />
            Back to Careers
          </Link>
          <span style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Sales Person Application
          </span>
        </div>
      </div>

      {/* ── Page header ── */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '160px 48px 80px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p style={{ fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 20px 0' }}>
            JAQYI · Sales Person
          </p>
          <h1 style={{ fontSize: '72px', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff', margin: '0 0 24px 0' }}>
            Apply Now.
          </h1>
          <p style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '540px', margin: 0 }}>
            Take your time. Your answers reveal how you think, how you sell, and whether you are a true fit for JAQYI. Be honest. Be specific.
          </p>
        </motion.div>
      </div>

      {/* ── Error banner ── */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              maxWidth: '960px', margin: '0 auto 32px', padding: '0 48px'
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 20px',
              backgroundColor: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '10px',
              color: 'rgba(252,165,165,0.9)', fontSize: '14px'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              {statusMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 48px 120px' }}>

          {sections.map((section, sIdx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.05 }}
              style={{ marginBottom: '80px' }}
            >
              {/* Section header */}
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '20px',
                paddingBottom: '28px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                marginBottom: '48px'
              }}>
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>
                  {section.label}
                </span>
                <h2 style={{ fontSize: '36px', fontWeight: 300, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
                  {section.title}
                </h2>
              </div>

              {/* Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {/* First section: 2-col grid */}
                {section.id === 'basic' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 32px' }}>
                    {section.fields.map((field, fIdx) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: fIdx * 0.07 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                      >
                        <label style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.02em' }}>
                          {field.label}
                        </label>
                        <FieldInput field={field} value={formData[field.name]} onChange={handleChange} disabled={status === 'loading'} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  section.fields.map((field, fIdx) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: fIdx * 0.06 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                    >
                      <label style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                        {field.label}
                      </label>
                      <FieldInput field={field} value={formData[field.name]} onChange={handleChange} disabled={status === 'loading'} />
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          ))}

          {/* ── Resume upload ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: '80px' }}
          >
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '20px',
              paddingBottom: '28px',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              marginBottom: '48px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em' }}>06</span>
              <h2 style={{ fontSize: '36px', fontWeight: 300, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>Resume</h2>
            </div>

            {!resume ? (
              <label style={{ cursor: 'pointer', display: 'block' }}>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} style={{ display: 'none' }} required />
                <motion.div
                  whileHover={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.03)' }}
                  style={{
                    border: '1px dashed rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '64px 48px',
                    textAlign: 'center',
                    transition: 'border-color 0.3s ease, background-color 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px auto'
                  }}>
                    <UploadCloud size={24} color="rgba(255,255,255,0.5)" />
                  </div>
                  <p style={{ fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', margin: '0 0 8px 0' }}>
                    Upload your resume
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                    PDF, DOC, or DOCX — max 5MB
                  </p>
                </motion.div>
              </label>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 28px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <UploadCloud size={18} color="#000000" />
                  </div>
                  <div>
                    <p style={{ margin: '0 0 2px 0', fontSize: '15px', fontWeight: 400, color: '#ffffff' }}>{resume.name}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{(resume.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearResume}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >
                  <X size={20} />
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* ── Submit ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              paddingTop: '48px',
              borderTop: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px'
            }}
          >
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0, maxWidth: '380px', lineHeight: 1.6 }}>
              By submitting, your responses and resume will be emailed directly to the JAQYI team.
            </p>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={status !== 'loading' ? { y: -2 } : {}}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                backgroundColor: status === 'loading' ? 'rgba(255,255,255,0.6)' : '#ffffff',
                color: '#000000',
                padding: '18px 40px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 400,
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                transition: 'background-color 0.2s ease'
              }}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <Send size={18} />
                </>
              )}
            </motion.button>
          </motion.div>

        </div>
      </form>
    </div>
  );
};

export default JobApplication;
