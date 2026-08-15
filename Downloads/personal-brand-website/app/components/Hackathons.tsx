"use client";

import { useEffect, useRef, useState } from "react";

const HACKATHONS = [
  {
    title: "Web-A-Thon — Panache S-16",
    description:
      "VGU festival portal built in under 6 hours. Took 2nd place as a team of 3.",
    tags: ["2nd Place", "Team of 3", "6 Hours"],
    highlight: true,
  },
  {
    title: "AI Document Agent — OpenAI Academy × NxtWave",
    description:
      "Document-parsing agent that retrieved structured answers from text logs using LLMs. State qualifier at the AI Buildathon.",
    tags: ["State Qualifier", "LLMs", "Document Parsing"],
    highlight: true,
  },
  {
    title: "X Manage",
    description:
      "Event management dashboard with login state and scoring boards for organizing and tracking events.",
    tags: ["Dashboard", "Login State", "Scoring"],
    highlight: false,
  },
  {
    title: "India AI Impact Summit — JECC Jaipur",
    description:
      "AI Hackathon at the India AI Impact Summit, exploring cutting-edge AI applications and solutions.",
    tags: ["AI Hackathon", "JECC Jaipur"],
    highlight: false,
  },
  {
    title: "India AI Impact Buildathon — GUVI × HCL",
    description:
      "Competed among 40,000+ participants in a national-level AI buildathon organized by GUVI and HCL.",
    tags: ["40,000+ Participants", "National Level"],
    highlight: true,
  },
  {
    title: "Base44 Hackathon — D-Coders",
    description:
      "Module integration app with user state tracking, built with team D-Coders.",
    tags: ["Module Integration", "Team D-Coders"],
    highlight: false,
  },
  {
    title: "BRAVE — NIAT Academic Workflow",
    description:
      "NIAT's academic workflow automation module. Currently in progress.",
    tags: ["In Progress", "Automation", "NIAT"],
    highlight: false,
  },
];

export default function Hackathons() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hackathons" className="relative">
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
            <p className="text-accent font-mono text-sm mb-2">
              // competitions & builds
            </p>
            <h2 className="section-heading">
              Hackathon <span className="gradient-text">Timeline</span>
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="timeline-line hidden md:block" />

            <div className="space-y-8 md:space-y-12">
              {HACKATHONS.map((hack, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={hack.title}
                    className={`relative flex flex-col md:flex-row items-start md:items-center transition-all duration-600 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${200 + i * 100}ms` }}
                  >
                    {/* Mobile timeline dot */}
                    <div className="absolute left-[1.25rem] top-6 md:hidden">
                      <div className="timeline-dot" />
                    </div>

                    {/* Content */}
                    <div
                      className={`w-full md:w-[calc(50%-2rem)] ${
                        isLeft
                          ? "md:pr-8 md:text-right md:mr-auto"
                          : "md:pl-8 md:ml-auto"
                      } pl-12 md:pl-0`}
                    >
                      <div
                        className={`glass rounded-2xl p-5 card-hover ${
                          hack.highlight
                            ? "border-accent/30 shadow-lg shadow-accent/5"
                            : ""
                        }`}
                      >
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {hack.title}
                        </h3>
                        <p className="text-sm text-muted mb-3 leading-relaxed">
                          {hack.description}
                        </p>
                        <div
                          className={`flex flex-wrap gap-2 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          {hack.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                tag === "2nd Place" ||
                                tag === "State Qualifier" ||
                                tag === "40,000+ Participants"
                                  ? "bg-accent-dim text-accent"
                                  : tag === "In Progress"
                                  ? "bg-teal-dim text-teal"
                                  : "bg-surface text-muted"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Desktop timeline dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                      <div className="timeline-dot" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
