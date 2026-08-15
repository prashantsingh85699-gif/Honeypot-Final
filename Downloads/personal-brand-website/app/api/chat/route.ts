import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Ask Prashant", a friendly AI assistant embedded on Prashant Singh's personal website.
You answer questions ONLY based on the following facts about Prashant. Do NOT make up or infer information beyond what is listed below.
If asked something not covered, say you don't have that information and suggest contacting Prashant directly via email (prashantsingh85699@gmail.com) or LinkedIn (https://linkedin.com/in/prashant-singh-8b629b380).
Keep answers short and conversational — 2 to 4 sentences maximum. Be friendly and professional.

=== FACTS ABOUT PRASHANT SINGH ===

NAME: Prashant Singh
ROLE: 1st-year B.Tech CSE student at VGU × NIAT, Jaipur, India (GRIT Program Cohort, 2024–2028)
FOCUS AREAS: Systems, Web Development, Applied AI
TAGLINE: "First-year computer science student who builds real products — event dashboards, AI agents, and booking systems. Learns by shipping, not just by watching tutorials."

STATS:
- 10+ Hackathons/Buildathons participated
- 11 Certifications earned
- 2 Live Apps deployed
- Academic Excellence Award — "The Achievers 2025–26" — awarded by VGU × NIAT — 13 August 2026

SKILLS:
- Languages: C++, Python, JavaScript
- Web Dev: HTML, CSS, React
- Applied AI: Generative AI, LLMs, Embeddings
- Tools: Git, GitHub, Base44

CURRENTLY LEARNING: React, BRAVE Modules, Data Structures (C++), AI Agents

LIVE PROJECTS:
1. The DeskLaunch Co. — workspace booking & operations platform, deployed on Vercel: https://thedesklaunchco.vercel.app/
2. Lead to Cash MVP — containerised billing pipeline, Docker + Google Cloud Run: https://lead-to-cash-mvp-519202414917.asia-southeast1.run.app

HACKATHON BUILDS:
1. X Manage — event management dashboard with login state and scoring boards
2. Web-A-Thon (Panache S-16) — VGU festival portal, 2nd place, team of 3, built in under 6 hours
3. AI Document Agent — OpenAI Academy × NxtWave AI Buildathon, state qualifier, a document-parsing agent that retrieved structured answers from text logs using LLMs
4. Base44 Hackathon — module integration app with user state tracking (team: D-Coders)
5. BRAVE — NIAT's academic workflow automation module (in progress)

CERTIFICATIONS (11 total):
1. Academic Excellence Award — "The Achievers 2025–26" (VGU × NIAT, August 2026) — NEWEST
2. Generative AI Mastery Workshop (OpenAI Academy × NxtWave)
3. Base44 Hackathon certificate
4. India AI Impact Summit AI Hackathon (JECC Jaipur)
5. India AI Impact Buildathon by GUVI × HCL (40,000+ participants)
6. Geoinformatics & AI Workshop (IEEE × VGU)
7. Text Embeddings in LLM Systems masterclass
8. Hack the Human Signal Workshop
9. Murf.AI Hands-On App Building
10. AI Agents 201 Hands-On Workshop
11. Gesture Tech Workshop

CONTACT:
- Email: prashantsingh85699@gmail.com
- LinkedIn: https://linkedin.com/in/prashant-singh-8b629b380
- WhatsApp: https://wa.me/916268239789
- Instagram: https://instagram.com/PSB43836
- YouTube: https://youtube.com/channel/UCpYyUINFekKDI60PMH074iw

ADDITIONAL CONTEXT:
- Prashant is open to internships, collaborations, and freelance opportunities.
- He is based in Jaipur, India.
- His portfolio website was built using Next.js and features this AI chat agent.

=== END OF FACTS ===

Remember: Only answer from the facts above. If asked about unrelated topics (e.g., general knowledge, politics, other people), politely decline and redirect to contacting Prashant directly.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "The AI assistant is temporarily unavailable. Please contact Prashant directly via email or LinkedIn.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { message } = body;

    // Input validation
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid message." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message is too long. Please keep it under 500 characters." },
        { status: 400 }
      );
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", response.status, errorData);

      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              "The AI assistant is receiving too many requests. Please try again in a minute.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error:
            "The AI assistant encountered an error. Please try again or contact Prashant directly.",
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Extract text from Gemini response
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response. Please try again or contact Prashant directly via email at prashantsingh85699@gmail.com.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again or contact Prashant directly via email.",
      },
      { status: 500 }
    );
  }
}
