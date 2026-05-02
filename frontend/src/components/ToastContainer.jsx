import React from "react";

const typeStyles = {
  success: { background: "var(--success)",  color: "var(--bg-primary)" },
  error:   { background: "var(--danger)",   color: "#fff" },
  info:    { background: "var(--info)",      color: "#fff" },
};

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => onDismiss?.(t.id)}
          style={{
            padding: "12px 20px",
            borderRadius: 10,
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 14,
            minWidth: 260,
            maxWidth: 340,
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            animation: "slideInRight 0.3s ease",
            cursor: "pointer",
            pointerEvents: "auto",
            ...(typeStyles[t.type] || typeStyles.success),
          }}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
