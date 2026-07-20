"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChatbotForm from "@/components/ChatbotForm";

const MacbookShowcase = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y       = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale   = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  // Function-row keys
  const fnKeys = Array.from({ length: 13 });
  // Main keyboard rows
  const row1 = Array.from({ length: 13 });
  const row2 = Array.from({ length: 12 });
  const row3 = Array.from({ length: 11 });
  const row4 = Array.from({ length: 10 });

  return (
    <section ref={containerRef} className="tablet-showcase-section">
      <motion.div className="mac-wrap" style={{ y, opacity, scale }}>

        {/* ══════════ SCREEN LID ══════════ */}
        <div className="mac-lid">
          {/* outer aluminum frame */}
          <div className="mac-lid-inner">
            {/* camera notch */}
            <div className="mac-camera-notch">
              <div className="mac-camera-dot" />
            </div>

            {/* display */}
            <div className="mac-display">
              {/* macOS-style menu bar */}
              <div className="mac-menubar">
                <div className="mac-menubar-left">
                  <span className="mac-mb-apple">⌘</span>
                  <span className="mac-mb-item">JAQYI</span>
                  <span className="mac-mb-item">Services</span>
                </div>
                <div className="mac-menubar-right">
                  <div className="mac-traffic">
                    <span className="mac-t mac-t--r" />
                    <span className="mac-t mac-t--y" />
                    <span className="mac-t mac-t--g" />
                  </div>
                </div>
              </div>

              {/* chatbot */}
              <div className="mac-display-content">
                <ChatbotForm />
              </div>
            </div>

            {/* bottom chin */}
            <div className="mac-chin" />
          </div>
        </div>

        {/* ══════════ HINGE ══════════ */}
        <div className="mac-hinge">
          <div className="mac-hinge-shine" />
        </div>

        {/* ══════════ KEYBOARD BODY ══════════ */}
        <div className="mac-body">
          <div className="mac-body-inner">

            {/* Function row */}
            <div className="mac-key-row mac-key-row--fn">
              {fnKeys.map((_, i) => (
                <div key={i} className="mac-key mac-key--fn" />
              ))}
            </div>

            {/* Row 1: numbers */}
            <div className="mac-key-row">
              {row1.map((_, i) => (
                <div key={i} className="mac-key" />
              ))}
            </div>

            {/* Row 2: QWERTY */}
            <div className="mac-key-row">
              {row2.map((_, i) => (
                <div key={i} className="mac-key" />
              ))}
              <div className="mac-key mac-key--wide" /> {/* backspace */}
            </div>

            {/* Row 3: ASDF */}
            <div className="mac-key-row">
              <div className="mac-key mac-key--caps" />
              {row3.map((_, i) => (
                <div key={i} className="mac-key" />
              ))}
              <div className="mac-key mac-key--return" /> {/* return */}
            </div>

            {/* Row 4: ZXCV */}
            <div className="mac-key-row">
              <div className="mac-key mac-key--shift-l" />
              {row4.map((_, i) => (
                <div key={i} className="mac-key" />
              ))}
              <div className="mac-key mac-key--shift-r" />
            </div>

            {/* Bottom row: modifiers + spacebar */}
            <div className="mac-key-row mac-key-row--bottom">
              <div className="mac-key mac-key--mod" /> {/* fn */}
              <div className="mac-key mac-key--mod" /> {/* ctrl */}
              <div className="mac-key mac-key--mod" /> {/* opt */}
              <div className="mac-key mac-key--cmd" /> {/* cmd */}
              <div className="mac-key mac-key--space" /> {/* space */}
              <div className="mac-key mac-key--cmd" /> {/* cmd */}
              <div className="mac-key mac-key--mod" /> {/* opt */}
              <div className="mac-key mac-key--arrow" />
              <div className="mac-key mac-key--arrow" />
              <div className="mac-key mac-key--arrow" />
            </div>
          </div>

          {/* Trackpad */}
          <div className="mac-trackpad" />
        </div>

      </motion.div>
    </section>
  );
};

export default MacbookShowcase;
