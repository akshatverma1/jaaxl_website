"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import ChatbotForm from "@/components/ChatbotForm";

/**
 * TabletShowcase — an iPad mockup housing an interactive chatbot.
 * It animates smoothly into view once scrolled into the viewport
 * and remains stable so users can type and click without layout jitter.
 */
const TabletShowcase = () => {
  return (
    <section className="tablet-showcase-section">
      <motion.div
        className="tablet-frame"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth custom ease-out
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
