"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, Bot, User, CheckCircle, Loader2, Sparkles } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

/* ─── Main AI Chatbot Component ─── */
const ChatbotForm = () => {
  const [messages, setMessages] = useState([]);        // { from: "bot"|"user", text }
  const [chatHistory, setChatHistory] = useState([]);   // OpenRouter format { role, content }
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const messagesRef = useRef(null);
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const isInView = useInView(rootRef, { once: true, amount: 0.3 });
  const userMsgCount = useRef(0); // track how many times user has messaged

  /* Auto-scroll within the chat container only */
  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming, showContactForm, scrollToBottom]);

  /* ─── Start greeting when iPad scrolls into view ─── */
  useEffect(() => {
    if (!isInView || started) return;
    setStarted(true);

    const greeting =
      "Hi there! 👋 I'm JAQYI's AI assistant. I can help you learn about our services, pricing, and how we can bring your idea to life. What can I help you with today?";

    // Simulate a short typing delay for the greeting
    setIsStreaming(true);
    setTimeout(() => {
      setMessages([{ from: "bot", text: greeting }]);
      setChatHistory([{ role: "assistant", content: greeting }]);
      setIsStreaming(false);
    }, 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  /* ─── Stream AI response from /api/chat ─── */
  const streamAIResponse = async (updatedHistory) => {
    setIsStreaming(true);
    let fullResponse = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      if (!res.ok) throw new Error("Chat API error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // Add a placeholder bot message that we'll update as tokens stream in
      setMessages((prev) => [...prev, { from: "bot", text: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              fullResponse += token;
              // Remove the hidden signal markers from displayed text
              const displayText = fullResponse
                .replace(/\[COLLECT_CONTACT\]/g, "")
                .replace(/\[CONTACT_SUBMITTED\]/g, "")
                .trim();

              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { from: "bot", text: displayText };
                return updated;
              });
            }
          } catch {
            /* skip non-JSON lines */
          }
        }
      }
    } catch (err) {
      console.error("Stream error:", err);
      fullResponse =
        "I'm having a moment — could you try again? Or feel free to reach out directly at akshat@jaqyi.com!";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { from: "bot", text: fullResponse };
        return updated;
      });
    }

    // Save to chat history
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: fullResponse },
    ]);

    // Check if the AI wants to collect contact info
    if (fullResponse.includes("[COLLECT_CONTACT]")) {
      setTimeout(() => setShowContactForm(true), 400);
    }

    setIsStreaming(false);
  };

  /* ─── Handle user message ─── */
  const handleSend = (e) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text || isStreaming) return;

    userMsgCount.current += 1;
    setInputValue("");

    // Add user message to UI
    setMessages((prev) => [...prev, { from: "user", text }]);

    // Build updated history
    const updatedHistory = [
      ...chatHistory,
      { role: "user", content: text },
    ];
    setChatHistory(updatedHistory);

    // Stream AI response
    streamAIResponse(updatedHistory);
  };

  /* ─── Handle contact form submit ─── */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactData.email && !contactData.phone) return;
    setSubmitting(true);

    // Show user's contact info as a message
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text: `${contactData.name || "—"} · ${contactData.email || contactData.phone}`,
      },
    ]);

    // Build conversation summary from chat history
    const conversationSummary = chatHistory
      .filter((m) => m.role !== "system")
      .map((m) => `${m.role === "user" ? "Visitor" : "JAQYI AI"}: ${m.content.replace(/\[COLLECT_CONTACT\]/g, "").replace(/\[CONTACT_SUBMITTED\]/g, "")}`)
      .join("\n");

    try {
      const payload = {
        name: contactData.name || "AI Chatbot Lead",
        email: contactData.email || "no-email@placeholder.com",
        subject: `[AI Chatbot Lead] New inquiry from ${contactData.name || "Website Visitor"}`,
        message:
          `── AI Chatbot Conversation ──\n${conversationSummary}\n\n` +
          `── Contact Information ──\n` +
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
      /* silent — thank-you message still shows */
    }

    // Tell the AI that contact was submitted
    const thankYou =
      "🎉 Thank you! I've sent your details to our team. Someone from JAQYI will reach out within 24 hours with a tailored proposal. Looking forward to working with you!";
    setMessages((prev) => [...prev, { from: "bot", text: thankYou }]);
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", content: thankYou },
    ]);

    setSubmitting(false);
    setSubmitted(true);
    setShowContactForm(false);
  };

  return (
    <div className="cb-root" ref={rootRef}>
      {/* Header bar */}
      <div className="cb-header">
        <div className="cb-header__left">
          <div className="cb-header__dot" />
          <span className="cb-header__title">JAQYI AI Assistant</span>
        </div>
        <Sparkles size={14} className="cb-header__sparkle" />
      </div>

      {/* Messages area */}
      <div className="cb-messages" ref={messagesRef}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} isNew={i === messages.length - 1} />
        ))}
        {isStreaming && messages[messages.length - 1]?.from !== "bot" && (
          <div className="cb-msg cb-msg--bot">
            <div className="cb-msg__avatar">
              <Bot size={14} />
            </div>
            <div className="cb-msg__bubble">
              <TypingDots />
            </div>
          </div>
        )}
      </div>

      {/* Input / Contact area */}
      <AnimatePresence mode="wait">
        {/* Contact form — shown when AI triggers it */}
        {showContactForm && !submitted && (
          <motion.div
            key="contact"
            className="cb-input-area"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <form className="cb-contact-form" onSubmit={handleContactSubmit}>
              <input
                className="cb-contact-input"
                placeholder="Your name"
                value={contactData.name}
                onChange={(e) =>
                  setContactData((p) => ({ ...p, name: e.target.value }))
                }
              />
              <input
                className="cb-contact-input"
                placeholder="Email address *"
                type="email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData((p) => ({ ...p, email: e.target.value }))
                }
                required
              />
              <input
                className="cb-contact-input"
                placeholder="Phone number"
                type="tel"
                value={contactData.phone}
                onChange={(e) =>
                  setContactData((p) => ({ ...p, phone: e.target.value }))
                }
              />
              <button
                type="submit"
                className="cb-submit-btn"
                disabled={submitting || (!contactData.email && !contactData.phone)}
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="cb-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={14} /> Get My Proposal
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Normal text input */}
        {!showContactForm && !submitted && started && (
          <motion.div
            key="input"
            className="cb-input-area"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <form className="cb-text-form" onSubmit={handleSend}>
              <input
                ref={inputRef}
                className="cb-text-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about our services…"
                disabled={isStreaming}
              />
              <button
                type="submit"
                className="cb-send-btn"
                disabled={!inputValue.trim() || isStreaming}
              >
                {isStreaming ? (
                  <Loader2 size={14} className="cb-spin" />
                ) : (
                  <Send size={14} />
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Success state */}
        {submitted && (
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
