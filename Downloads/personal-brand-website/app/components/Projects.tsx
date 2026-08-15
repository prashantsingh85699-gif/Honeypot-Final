"use client";

import { useEffect, useRef, useState } from "react";

const LIVE_PROJECTS = [
  {
    title: "The DeskLaunch Co.",
    description:
      "Workspace booking & operations platform for co-working spaces. Full-stack application deployed on Vercel.",
    url: "https://thedesklaunchco.vercel.app/",
    tech: ["Vercel", "Full-Stack", "Operations"],
    featured: true,
  },
  {
    title: "Lead to Cash MVP",
    description:
      "Containerised billing pipeline running on Docker + Google Cloud Run. End-to-end lead management and invoicing.",
    url: "https://lead-to-cash-mvp-519202414917.asia-southeast1.run.app",
    tech: ["Docker", "Google Cloud Run", "Billing"],
    featured: true,
  },
];

const HACKATHON_PROJECTS = [
  {
    title: "X Manage",
    description:
      "Event management dashboard with login state and scoring boards.",
    tech: ["Dashboard", "Auth", "Scoring"],
  },
  {
    title: "Web-A-Thon Portal",
    description: "VGU festival portal — 2nd place, built in under 6 hours.",
    tech: ["Festival", "2nd Place"],
  },
  {
    title: "AI Document Agent",
    description:
      "Document-parsing agent using LLMs — state qualifier at OpenAI Academy × NxtWave Buildathon.",
    tech: ["LLMs", "Parsing", "AI"],
  },
  {
    title: "BRAVE Module",
    description:
      "NIAT's academic workflow automation module (in progress).",
    tech: ["Automation", "In Progress"],
  },
];

export default function Projects() {
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
    <section id="projects" className="relative">
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
              // things I&apos;ve built
            </p>
            <h2 className="section-heading">
              Live <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mt-4" />
          </div>

          {/* Live Projects — Featured */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {LIVE_PROJECTS.map((project, i) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group glass rounded-2xl p-6 card-hover block transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                {/* Live Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                    </span>
                    <span className="text-xs font-medium text-success uppercase tracking-wider">
                      Live
                    </span>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-accent-dim text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {/* Hackathon Builds */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-muted mb-6">
              Hackathon Builds
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {HACKATHON_PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className={`glass rounded-xl p-5 card-hover transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal"
                    >
                      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed mb-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-xs bg-surface text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
