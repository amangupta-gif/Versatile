import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function ThankyouPage({ setPage }) {
  return (
    <div
      style={{
        paddingTop: 64,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 16px",
      }}
    >
      <Card
        style={{
          textAlign: "center",
          maxWidth: 440,
          width: "100%",
          animation: "fadeUp 0.6s ease",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            fontWeight: 800,
            color: "var(--success)",
            marginBottom: 12,
          }}
        >
          Thank You!
        </h1>

        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 8 }}>
          Your order has been placed successfully.
        </p>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 36 }}>
          You will receive a confirmation email shortly.
        </p>

        <Button onClick={() => setPage("products")} fullWidth>
          Continue Shopping →
        </Button>
      </Card>
    </div>
  );
}
