"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChatbotForm from "@/components/ChatbotForm";

/**
 * TabletShowcase — an iPad mockup housing an interactive chatbot
 * that rises from below the hero as the user scrolls.
 */
const TabletShowcase = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <section ref={containerRef} className="tablet-showcase-section">
      <motion.div
        className="tablet-frame"
        style={{ y, opacity, scale }}
      >
        {/* iPad bezel */}
        <div className="ipad-bezel">
          {/* Camera notch (top center) */}
          <div className="ipad-camera" />

          {/* Screen area — interactive chatbot */}
          <div className="ipad-screen ipad-screen--chatbot">
            <ChatbotForm />
          </div>
        </div>

        {/* Subtle reflection */}
        <div className="ipad-reflection" />
      </motion.div>
    </section>
  );
};

export default TabletShowcase;
