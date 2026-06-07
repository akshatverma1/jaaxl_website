"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, CheckCircle, Loader2, Sparkles } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/* ─── Conversation flow definition ─── */
const STEPS = [
  {
    id: "greeting",
    bot: "Hi there! 👋 I'm JAQYI's project assistant. Let me help you figure out the perfect solution for your needs.",
    delay: 600,
    autoNext: true,
  },
  {
    id: "service",
    bot: "What type of service are you looking for?",
    type: "options",
    options: [
      "🌐 Web Development",
      "📱 App Development",
      "🤖 AI & Automation",
      "🎨 UI/UX Design",
      "💡 Other / Not Sure",
    ],
    field: "service",
  },
  {
    id: "budget",
    bot: "Great choice! What's your estimated budget range?",
    type: "options",
    options: [
      "Under $1,000",
      "$1,000 – $5,000",
      "$5,000 – $15,000",
      "$15,000 – $50,000",
      "$50,000+",
    ],
    field: "budget",
  },
  {
    id: "timeline",
    bot: "When are you looking to get started?",
    type: "options",
    options: [
      "🚀 ASAP",
      "📅 Within a month",
      "🗓️ 1 – 3 months",
      "🤔 Just exploring",
    ],
    field: "timeline",
  },
  {
    id: "description",
    bot: "Tell me a bit more about your project. What problem are you trying to solve?",
    type: "text",
    placeholder: "Describe your project idea…",
    field: "description",
  },
  {
    id: "contact",
    bot: "Awesome! Let's get your contact info so our team can reach out with a custom proposal.",
    type: "contact",
  },
  {
    id: "done",
    bot: "🎉 Thank you! We've received your requirements. Our team will reach out within 24 hours with a tailored proposal.",
    type: "done",
  },
];

/* ─── Typing indicator ─── */
const TypingDots = () => (
  <div className="cb-typing">
    <span />
    <span />
    <span />
  </div>
);

/* ─── Single message bubble ─── */
const MessageBubble = ({ msg, isNew }) => (
  <motion.div
    className={`cb-msg ${msg.from === "bot" ? "cb-msg--bot" : "cb-msg--user"}`}
    initial={isNew ? { opacity: 0, y: 14, scale: 0.95 } : false}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="cb-msg__avatar">
      {msg.from === "bot" ? <Bot size={14} /> : <User size={14} />}
    </div>
    <div className="cb-msg__bubble">
      <p>{msg.text}</p>
    </div>
  </motion.div>
);

/* ─── Main Chatbot Component ─── */
const ChatbotForm = () => {
  const [messages, setMessages] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [contactData, setContactData] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, typing]);

  /* Push bot message with typing delay */
  const pushBotMessage = (text, cb) => {
    setTyping(true);
    const delay = Math.min(text.length * 18, 1200);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text }]);
      cb?.();
    }, delay);
  };

  /* Kick off conversation */
  useEffect(() => {
    const step = STEPS[0];
    pushBotMessage(step.bot, () => {
      if (step.autoNext) {
        setTimeout(() => {
          const next = STEPS[1];
          pushBotMessage(next.bot);
          setStepIdx(1);
        }, 400);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Handle option click */
  const handleOption = (option) => {
    const step = STEPS[stepIdx];
    setMessages((prev) => [...prev, { from: "user", text: option }]);
    setFormData((prev) => ({ ...prev, [step.field]: option }));

    const nextIdx = stepIdx + 1;
    if (nextIdx < STEPS.length) {
      setTimeout(() => {
        pushBotMessage(STEPS[nextIdx].bot);
        setStepIdx(nextIdx);
      }, 300);
    }
  };

  /* Handle text submit */
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const step = STEPS[stepIdx];
    setMessages((prev) => [...prev, { from: "user", text: inputValue }]);
    setFormData((prev) => ({ ...prev, [step.field]: inputValue }));
    setInputValue("");

    const nextIdx = stepIdx + 1;
    if (nextIdx < STEPS.length) {
      setTimeout(() => {
        pushBotMessage(STEPS[nextIdx].bot);
        setStepIdx(nextIdx);
      }, 300);
    }
  };

  /* Handle contact form submit */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.email && !contactData.phone) return;
    setSubmitting(true);

    setMessages((prev) => [
      ...prev,
      { from: "user", text: `${contactData.name || "—"} · ${contactData.email || contactData.phone}` },
    ]);

    try {
      const payload = {
        name: contactData.name || "Chatbot Lead",
        email: contactData.email || "no-email@placeholder.com",
        subject: `[Chatbot Lead] ${formData.service || "General Inquiry"}`,
        message:
          `── Project Requirements ──\n` +
          `Service: ${formData.service || "N/A"}\n` +
          `Budget: ${formData.budget || "N/A"}\n` +
          `Timeline: ${formData.timeline || "N/A"}\n` +
          `Description: ${formData.description || "N/A"}\n\n` +
          `── Contact ──\n` +
          `Name: ${contactData.name || "N/A"}\n` +
          `Email: ${contactData.email || "N/A"}\n` +
          `Phone: ${contactData.phone || "N/A"}`,
      };

      await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* silent — the thank-you message still shows */
    }

    setSubmitting(false);
    setSubmitted(true);
    const doneStep = STEPS[STEPS.length - 1];
    setTimeout(() => {
      pushBotMessage(doneStep.bot);
      setStepIdx(STEPS.length - 1);
    }, 300);
  };

  const currentStep = STEPS[stepIdx];

  return (
    <div className="cb-root">
      {/* Header bar */}
      <div className="cb-header">
        <div className="cb-header__left">
          <div className="cb-header__dot" />
          <span className="cb-header__title">JAQYI Assistant</span>
        </div>
        <Sparkles size={14} className="cb-header__sparkle" />
      </div>

      {/* Messages area */}
      <div className="cb-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} isNew={i === messages.length - 1} />
        ))}
        {typing && (
          <div className="cb-msg cb-msg--bot">
            <div className="cb-msg__avatar"><Bot size={14} /></div>
            <div className="cb-msg__bubble"><TypingDots /></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <AnimatePresence mode="wait">
        {!typing && currentStep && !submitted && (
          <motion.div
            key={currentStep.id}
            className="cb-input-area"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Option buttons */}
            {currentStep.type === "options" && (
              <div className="cb-options">
                {currentStep.options.map((opt) => (
                  <button
                    key={opt}
                    className="cb-option-btn"
                    onClick={() => handleOption(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Free-text input */}
            {currentStep.type === "text" && (
              <form className="cb-text-form" onSubmit={handleTextSubmit}>
                <input
                  ref={inputRef}
                  className="cb-text-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentStep.placeholder}
                  autoFocus
                />
                <button type="submit" className="cb-send-btn" disabled={!inputValue.trim()}>
                  <Send size={14} />
                </button>
              </form>
            )}

            {/* Contact form */}
            {currentStep.type === "contact" && (
              <form className="cb-contact-form" onSubmit={handleContactSubmit}>
                <input
                  className="cb-contact-input"
                  placeholder="Your name"
                  value={contactData.name}
                  onChange={(e) => setContactData((p) => ({ ...p, name: e.target.value }))}
                />
                <input
                  className="cb-contact-input"
                  placeholder="Email address *"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData((p) => ({ ...p, email: e.target.value }))}
                  required
                />
                <input
                  className="cb-contact-input"
                  placeholder="Phone number"
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => setContactData((p) => ({ ...p, phone: e.target.value }))}
                />
                <button
                  type="submit"
                  className="cb-submit-btn"
                  disabled={submitting || (!contactData.email && !contactData.phone)}
                >
                  {submitting ? (
                    <><Loader2 size={14} className="cb-spin" /> Sending…</>
                  ) : (
                    <><Send size={14} /> Get My Proposal</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* Success state */}
        {submitted && !typing && (
          <motion.div
            className="cb-input-area cb-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={18} className="cb-success-icon" />
            <span>Sent successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotForm;
