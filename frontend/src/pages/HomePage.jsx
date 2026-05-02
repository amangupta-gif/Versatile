import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const FEATURES = [
  {
    icon: "🧠",
    title: "Students Section",
    badge: "Brain Development",
    desc: "Our Brain and Skill Development Programs designed to unlock the full potential of every student through a structured, world-class curriculum.",
  },
  {
    icon: "👨‍🏫",
    title: "Trainers Section",
    badge: "Teacher Training",
    desc: "Our Certified Teachers Training Programs equip educators with modern pedagogical tools and techniques for maximum classroom impact.",
  },
];

export default function HomePage({ setPage }) {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,140,0,0.10) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 700,
            animation: "fadeUp 0.8s ease both",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,140,0,0.12)",
              border: "1px solid rgba(255,140,0,0.3)",
              borderRadius: 100,
              padding: "6px 18px",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--accent)",
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            🏛 Proud Partnership with Government of Maharashtra
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 7vw, 76px)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 24,
              color: "var(--text-primary)",
            }}
          >
            Declining India's Future Through{" "}
            <span style={{ color: "var(--accent)" }}>Skills & Innovation</span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: 540,
              margin: "0 auto 40px",
            }}
          >
            Versatile Educare System delivers world-class brain development and
            skill training programs for students and educators across
            Maharashtra.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={() => setPage("login")}
              style={{ padding: "14px 36px", fontSize: 16 }}
            >
              Get Started →
            </Button>
            <Button
              variant="ghost"
              style={{ padding: "14px 36px", fontSize: 16 }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section
        style={{
          padding: "40px 32px 80px",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {FEATURES.map((c, i) => (
            <Card
              key={i}
              style={{
                animation: `fadeUp 0.6s ease ${i * 0.15}s both`,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(255,140,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{c.icon}</div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--accent)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                {c.badge}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {c.title}
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: 14 }}>
                {c.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px 32px",
          textAlign: "center",
          color: "var(--text-faint)",
          fontSize: 13,
        }}
      >
        © 2025 Versatile Educare System. All rights reserved.
      </footer>
    </div>
  );
}
