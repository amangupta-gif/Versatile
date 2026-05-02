import React from "react";

export default function Card({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: "linear-gradient(145deg, var(--bg-card), var(--bg-card-deep))",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
