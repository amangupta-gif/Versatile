import React from "react";

const STEPS = ["Processing", "Shipped", "Delivered"];

export default function OrderStatusBar({ status }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "8px 0" }}>
      {STEPS.map((step, i) => {
        const active = currentIndex >= i;
        const isLast = i === STEPS.length - 1;

        return (
          <div
            key={step}
            style={{ display: "flex", alignItems: "center", flex: isLast ? "none" : 1 }}
          >
            {/* Circle + Label */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: active ? "var(--accent)" : "var(--border)",
                  border: `2px solid ${active ? "var(--accent)" : "var(--border)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.3s",
                }}
              >
                {active && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#fff",
                    }}
                  />
                )}
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: active ? "var(--accent)" : "var(--text-faint)",
                  marginTop: 4,
                  fontWeight: active ? 700 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: currentIndex > i ? "var(--accent)" : "var(--border)",
                  margin: "0 8px",
                  marginBottom: 14,
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
