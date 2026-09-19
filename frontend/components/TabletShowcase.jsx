"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChatbotForm from "@/components/ChatbotForm";

/**
 * TabletShowcase — an iPad mockup housing an interactive chatbot
 * that rises from below the hero as the user scrolls.
 */
const TabletShowcase = () => {
  return (
    <section className="tablet-showcase-section">
      <div className="tablet-frame">
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
      </div>
    </section>
  );
};

export default TabletShowcase;
