import React from "react";
import Button from "./ui/Button";

export default function CartFooter({ total, onBuyNow }) {
  return (
    <div
      style={{
        background: "rgba(26, 26, 46, 0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--border)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        <span style={{ color: "var(--text-muted)", fontSize: 13 }}>Cart Total</span>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 22,
            color: "var(--accent)",
          }}
        >
          ₹{total}
        </div>
      </div>

      <Button
        onClick={onBuyNow}
        variant={total > 0 ? "primary" : "secondary"}
        style={{ padding: "12px 32px" }}
      >
        {total > 0 ? "Proceed to Buy →" : "Add Items to Cart"}
      </Button>
    </div>
  );
}
