import React from "react";

export default function LevelCard({ level, quantity, onIncrease, onDecrease, animationDelay = 0 }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, var(--bg-primary), var(--bg-card))",
        border: "1px solid var(--border)",
        borderRadius: 14,
        overflow: "hidden",
        animation: `fadeUp 0.4s ease ${animationDelay}s both`,
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(255,140,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Image */}
      {level.images?.[0]?.url && (
        <img
          src={level.images[0].url}
          alt={`Level ${level.levelNumber}`}
          style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
        />
      )}

      <div style={{ padding: 14 }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Level {level.levelNumber}
          </span>
          <span
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              fontSize: 15,
              fontFamily: "var(--font-display)",
            }}
          >
            ₹{level.price}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 12,
            lineHeight: 1.6,
            marginBottom: 12,
            maxHeight: 56,
            overflow: "hidden",
          }}
        >
          {level.description}
        </p>

        {/* Quantity control */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <button
            onClick={onDecrease}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              minWidth: 24,
              textAlign: "center",
            }}
          >
            {quantity}
          </span>
          <button
            onClick={onIncrease}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              color: "#fff",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
