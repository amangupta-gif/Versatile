import React from "react";

const variants = {
  primary: {
    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
    color: "#fff",
    border: "none",
    boxShadow: "0 4px 15px rgba(255, 140, 0, 0.35)",
  },
  secondary: {
    background: "var(--bg-card)",
    color: "var(--text-primary)",
    border: "1.5px solid var(--border)",
  },
  danger: {
    background: "linear-gradient(135deg, var(--danger), #c0392b)",
    color: "#fff",
    border: "none",
  },
  success: {
    background: "linear-gradient(135deg, var(--success), #1abc9c)",
    color: "var(--bg-primary)",
    border: "none",
  },
  ghost: {
    background: "transparent",
    color: "var(--accent)",
    border: "1.5px solid var(--accent)",
  },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  style = {},
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        fontSize: 14,
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        padding: "12px 24px",
        transition: "all 0.2s",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? "100%" : "auto",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
