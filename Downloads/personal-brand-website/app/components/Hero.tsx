"use client";

import { useEffect, useState, useRef } from "react";

const STATS = [
  { value: 10, suffix: "+", label: "Hackathons" },
  { value: 11, suffix: "", label: "Certifications" },
  { value: 2, suffix: "", label: "Live Apps" },
];

const CODE_LINES = [
  { indent: 0, text: "const prashant = {", color: "text-teal" },
  {
    indent: 1,
    text: 'role: "B.Tech CSE Student",',
    color: "text-accent-light",
  },
  {
    indent: 1,
    text: 'university: "VGU × NIAT, Jaipur",',
    color: "text-accent-light",
  },
  {
    indent: 1,
    text: "focus: [\"Systems\", \"Web Dev\", \"Applied AI\"],",
    color: "text-accent-light",
  },
  {
    indent: 1,
    text: 'motto: "Learns by shipping"',
    color: "text-accent-light",
  },
  { indent: 0, text: "};", color: "text-teal" },
  { indent: 0, text: "", color: "" },
  {
    indent: 0,
    text: "prashant.buildSomethingAwesome();",
    color: "text-success",
  },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [typedLines, setTypedLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedLines((prev) => {
        if (prev >= CODE_LINES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side — Text content */}
          <div className="space-y-8">
            {/* Academic Excellence Badge */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-dim border border-accent/30 text-accent text-sm font-medium">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Academic Excellence Award — The Achievers 2025–26
              </div>
            </div>

            {/* Name & Tagline */}
            <div className="space-y-4 animate-fade-in-up delay-100">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Hi, I&apos;m{" "}
                <span className="gradient-text">Prashant Singh</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted max-w-xl leading-relaxed">
                First-year computer science student who builds real products —
                event dashboards, AI agents, and booking systems.{" "}
                <span className="text-foreground font-medium">
                  Learns by shipping, not just by watching tutorials.
                </span>
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10 animate-fade-in-up delay-200">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-accent">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-sm text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-background font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                See My Work
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 17 5-5-5-5" />
                  <path d="m13 17 5-5-5-5" />
                </svg>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent/50 text-foreground font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right side — Code Editor */}
          <div className="animate-fade-in-up delay-400">
            <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error/80" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <span className="text-xs text-muted font-mono ml-2">
                  prashant.ts
                </span>
              </div>
              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-7 min-h-[260px]">
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${
                      i < typedLines
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{ paddingLeft: `${line.indent * 24}px` }}
                  >
                    {line.text ? (
                      <span className={line.color}>{line.text}</span>
                    ) : (
                      <br />
                    )}
                  </div>
                ))}
                {typedLines <= CODE_LINES.length && (
                  <span className="inline-block w-2 h-5 bg-accent animate-blink" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
