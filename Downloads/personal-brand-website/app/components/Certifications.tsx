"use client";

import { useEffect, useRef, useState } from "react";

const CERTIFICATIONS = [
  {
    title: "Academic Excellence Award — The Achievers 2025–26",
    issuer: "VGU × NIAT",
    date: "August 2026",
    featured: true,
  },
  {
    title: "Generative AI Mastery Workshop",
    issuer: "OpenAI Academy × NxtWave",
    date: "",
    featured: false,
  },
  {
    title: "Base44 Hackathon Certificate",
    issuer: "Base44",
    date: "",
    featured: false,
  },
  {
    title: "India AI Impact Summit AI Hackathon",
    issuer: "JECC Jaipur",
    date: "",
    featured: false,
  },
  {
    title: "India AI Impact Buildathon",
    issuer: "GUVI × HCL (40,000+ participants)",
    date: "",
    featured: false,
  },
  {
    title: "Geoinformatics & AI Workshop",
    issuer: "IEEE × VGU",
    date: "",
    featured: false,
  },
  {
    title: "Text Embeddings in LLM Systems Masterclass",
    issuer: "",
    date: "",
    featured: false,
  },
  {
    title: "Hack the Human Signal Workshop",
    issuer: "",
    date: "",
    featured: false,
  },
  {
    title: "Murf.AI Hands-On App Building",
    issuer: "Murf.AI",
    date: "",
    featured: false,
  },
  {
    title: "AI Agents 201 Hands-On Workshop",
    issuer: "",
    date: "",
    featured: false,
  },
  {
    title: "Gesture Tech Workshop",
    issuer: "",
    date: "",
    featured: false,
  },
];

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredCerts = CERTIFICATIONS.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="certifications" className="relative">
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-accent font-mono text-sm mb-2">
                // credentials
              </p>
              <h2 className="section-heading">
                Certifications{" "}
                <span className="text-muted text-xl font-normal">
                  ({CERTIFICATIONS.length})
                </span>
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full mt-4" />
            </div>

            {/* Search */}
            <div className="relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
                aria-label="Search certifications"
              />
            </div>
          </div>

          {/* Featured Cert — Academic Excellence */}
          {filteredCerts.some((c) => c.featured) && (
            <div className="mb-8">
              {filteredCerts
                .filter((c) => c.featured)
                .map((cert) => (
                  <div
                    key={cert.title}
                    className="glass rounded-2xl p-6 border-accent/30 shadow-lg shadow-accent/5 relative overflow-hidden"
                  >
                    {/* Gold shimmer accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

                    <div className="flex items-start gap-4 relative">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-accent"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-accent text-background">
                            NEWEST
                          </span>
                          {cert.date && (
                            <span className="text-xs text-muted">
                              {cert.date}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-accent mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-muted">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Certification Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCerts
              .filter((c) => !c.featured)
              .map((cert, i) => (
                <div
                  key={cert.title}
                  className={`glass rounded-xl p-4 card-hover transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 60}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-teal"
                      >
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 leading-snug">
                        {cert.title}
                      </h4>
                      {cert.issuer && (
                        <p className="text-xs text-muted">{cert.issuer}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {filteredCerts.length === 0 && (
            <div className="text-center py-12 text-muted">
              <p>No certifications match &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
