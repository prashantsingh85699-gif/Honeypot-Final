"use client";

import { useEffect, useRef, useState } from "react";

const CURRENTLY_LEARNING = [
  "React",
  "BRAVE Modules",
  "Data Structures (C++)",
  "AI Agents",
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative">
      <div ref={ref} className="section-container">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-accent font-mono text-sm mb-2">// who I am</p>
            <h2 className="section-heading">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Left — Bio */}
            <div className="space-y-6">
              <p className="text-lg text-muted leading-relaxed">
                I&apos;m a <span className="text-foreground font-medium">1st-year B.Tech CSE student</span> at{" "}
                <span className="text-accent">VGU × NIAT, Jaipur</span>, part
                of the{" "}
                <span className="text-foreground font-medium">
                  GRIT Program Cohort (2024–2028)
                </span>
                .
              </p>
              <p className="text-muted leading-relaxed">
                My focus areas span{" "}
                <span className="text-foreground">Systems</span>,{" "}
                <span className="text-foreground">Web Development</span>, and{" "}
                <span className="text-foreground">Applied AI</span>. I believe
                the best way to learn is by building — real products that solve
                real problems, not just tutorial follow-alongs.
              </p>
              <p className="text-muted leading-relaxed">
                From booking platforms deployed on Vercel to AI document agents
                and containerised billing pipelines on Google Cloud Run, every
                project I ship teaches me something new. I thrive in hackathon
                environments and love collaborating with driven teams.
              </p>
            </div>

            {/* Right — Currently Learning */}
            <div>
              <div className="glass rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-dim flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Currently Learning</h3>
                </div>

                <div className="space-y-3">
                  {CURRENTLY_LEARNING.map((item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-surface-hover transition-all duration-300 ${
                        isVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                      style={{
                        transitionDelay: `${300 + i * 100}ms`,
                      }}
                    >
                      <div className="w-6 h-6 rounded-md bg-accent-dim flex items-center justify-center flex-shrink-0">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-accent"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-foreground font-medium text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick info card */}
              <div className="glass rounded-2xl p-5 mt-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center flex-shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-muted">Based in</p>
                  <p className="font-medium">Jaipur, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
