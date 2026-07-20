"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChatbotForm from "@/components/ChatbotForm";

/**
 * MacbookShowcase — front-facing MacBook Air style mockup (screen only),
 * matching the Apple product-page style screenshot provided.
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
        className="mba-outer"
        style={{ y, opacity, scale }}
      >
        {/* ── MacBook Air lid (front-facing) ───────────────────── */}
        <div className="mba-lid">

          {/* Top camera notch */}
          <div className="mba-notch" />

          {/* Screen area */}
          <div className="mba-screen">

            {/* Thin menu-bar strip */}
            <div className="mba-menubar">
              <span className="mba-apple">✦</span>
              <span className="mba-title">JAQYI AI Assistant</span>
              <div className="mba-dots">
                <span className="mba-dot mba-dot--r" />
                <span className="mba-dot mba-dot--y" />
                <span className="mba-dot mba-dot--g" />
              </div>
            </div>

            {/* Chatbot content */}
            <div className="mba-content">
              <ChatbotForm />
            </div>
          </div>

          {/* Bottom chin */}
          <div className="mba-chin" />
        </div>

        {/* ── Base strip (hinge / foot) ─────────────────────────── */}
        <div className="mba-base-strip">
          <div className="mba-base-line" />
        </div>
      </motion.div>
    </section>
  );
};

export default MacbookShowcase;
