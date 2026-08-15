"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! 👋 I'm Prashant's AI assistant. Ask me about his skills, projects, hackathons, certifications, or how to get in touch!",
  timestamp: new Date(),
};

const MAX_MESSAGE_LENGTH = 500;
const COOLDOWN_MS = 2000;
const MAX_MESSAGES_PER_SESSION = 20;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSentAt, setLastSentAt] = useState(0);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Rate limiting checks
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      setError(`Message too long. Max ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }

    const now = Date.now();
    if (now - lastSentAt < COOLDOWN_MS) {
      setError("Please wait a moment before sending another message.");
      return;
    }

    if (userMessageCount >= MAX_MESSAGES_PER_SESSION) {
      setError(
        "You've reached the message limit for this session. Refresh the page to start a new session, or contact Prashant directly!"
      );
      return;
    }

    setError(null);
    setLastSentAt(now);
    setUserMessageCount((prev) => prev + 1);

    const userMessage: Message = {
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const botMessage: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get a response. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen
            ? "bg-surface border border-border rotate-0"
            : "bg-accent hover:bg-accent-light animate-pulse-glow"
        }`}
        aria-label={isOpen ? "Close chat" : "Open Ask Prashant chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-background"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Ask Prashant AI Chat"
      >
        <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/40 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border bg-surface/50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent-dim flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">Ask Prashant</h3>
              <p className="text-xs text-muted">AI-powered • Answers from real data</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[280px] max-h-[340px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-background rounded-br-md"
                      : "bg-surface border border-border text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="typing-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error message */}
          {error && (
            <div className="px-4 pb-2">
              <p className="text-xs text-error bg-error/10 rounded-lg px-3 py-2">
                {error}
              </p>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  userMessageCount >= MAX_MESSAGES_PER_SESSION
                    ? "Message limit reached"
                    : "Ask about Prashant..."
                }
                disabled={userMessageCount >= MAX_MESSAGES_PER_SESSION}
                maxLength={MAX_MESSAGE_LENGTH}
                className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors disabled:opacity-50"
                aria-label="Type your message"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim() || userMessageCount >= MAX_MESSAGES_PER_SESSION}
                className="w-10 h-10 rounded-xl bg-accent hover:bg-accent-light text-background flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-accent flex-shrink-0"
                aria-label="Send message"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-muted mt-1.5 text-right">
              {input.length}/{MAX_MESSAGE_LENGTH} •{" "}
              {MAX_MESSAGES_PER_SESSION - userMessageCount} messages left
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
