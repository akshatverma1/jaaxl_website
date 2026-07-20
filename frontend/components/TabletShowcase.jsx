"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChatbotForm from "@/components/ChatbotForm";

/**
 * MacbookShowcase — a realistic MacBook Pro mockup housing an interactive chatbot
 * that rises from below the hero as the user scrolls.
 */
const MacbookShowcase = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);

  return (
    <section ref={containerRef} className="tablet-showcase-section">
      <motion.div
        className="macbook-frame"
        style={{ y, opacity, scale }}
      >
        {/* ── Lid (screen) ─────────────────────────────────────── */}
        <div className="macbook-lid">
          {/* Notch */}
          <div className="macbook-notch" />

          {/* Screen bezel */}
          <div className="macbook-screen-bezel">
            {/* Menu-bar chrome strip */}
            <div className="macbook-menubar">
              <span className="macbook-menubar-logo">✦</span>
              <span className="macbook-menubar-title">JAQYI AI Assistant</span>
              <div className="macbook-menubar-dots">
                <span className="mac-dot mac-dot--red"   />
                <span className="mac-dot mac-dot--yellow"/>
                <span className="mac-dot mac-dot--green" />
              </div>
            </div>

            {/* Live chatbot */}
            <div className="macbook-screen-content">
              <ChatbotForm />
            </div>
          </div>
        </div>

        {/* ── Hinge ─────────────────────────────────────────────── */}
        <div className="macbook-hinge">
          <div className="macbook-hinge-inner" />
        </div>

        {/* ── Base (keyboard) ───────────────────────────────────── */}
        <div className="macbook-base">
          {/* Keyboard area (decorative) */}
          <div className="macbook-keyboard-area">
            <div className="macbook-keyboard-row">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="macbook-key" />
              ))}
            </div>
            <div className="macbook-keyboard-row">
              {Array.from({ length: 13 }).map((_, i) => (
                <div key={i} className="macbook-key" />
              ))}
            </div>
            <div className="macbook-keyboard-row">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="macbook-key" />
              ))}
            </div>
          </div>
          {/* Trackpad */}
          <div className="macbook-trackpad" />
        </div>
      </motion.div>
    </section>
  );
};

export default MacbookShowcase;
