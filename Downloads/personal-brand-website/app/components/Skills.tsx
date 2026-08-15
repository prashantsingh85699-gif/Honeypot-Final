"use client";

import { useEffect, useRef, useState } from "react";

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "accent",
    skills: ["C++", "Python", "JavaScript"],
  },
  {
    title: "Web Dev",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    color: "teal",
    skills: ["HTML", "CSS", "React"],
  },
  {
    title: "Applied AI",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2a4 4 0 0 0 8 0v-2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" />
      </svg>
    ),
    color: "accent",
    skills: ["Generative AI", "LLMs", "Embeddings"],
  },
  {
    title: "Tools",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    color: "teal",
    skills: ["Git", "GitHub", "Base44"],
  },
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div ref={ref} className="section-container">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-accent font-mono text-sm mb-2">// what I work with</p>
            <h2 className="section-heading">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4" />
          </div>

          {/* Skill Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {SKILL_GROUPS.map((group, groupIdx) => (
              <div
                key={group.title}
                className={`glass rounded-2xl p-6 card-hover transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + groupIdx * 100}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      group.color === "accent"
                        ? "bg-accent-dim text-accent"
                        : "bg-teal-dim text-teal"
                    }`}
                  >
                    {group.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIdx) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-default ${
                        group.color === "accent"
                          ? "bg-accent-dim text-accent hover:bg-accent/25"
                          : "bg-teal-dim text-teal hover:bg-teal/25"
                      } ${
                        isVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-90"
                      }`}
                      style={{
                        transitionDelay: `${
                          400 + groupIdx * 100 + skillIdx * 60
                        }ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
