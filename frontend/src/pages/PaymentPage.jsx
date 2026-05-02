import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { placeOrder } from "../utils/api";
import { getCartItems, getShippingInfo, clearOrderData } from "../utils/auth";

export default function PaymentPage({ setPage, toast }) {
  const [loading, setLoading] = useState(false);

  const cartItems   = getCartItems();
  const itemsPrice  = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax         = +(itemsPrice * 0.18).toFixed(2);
  const shipping    = itemsPrice > 500 ? 0 : 50;
  const total       = +(itemsPrice + tax + shipping).toFixed(2);

  async function confirmOrder() {
    const shippingInfo = getShippingInfo();
    if (!shippingInfo || !cartItems.length)
      return toast.show("Missing order details", "error");

    setLoading(true);
    try {
      const { ok, data } = await placeOrder({
        shippingInfo,
        orderItems: cartItems.map((i) => ({
          price:       i.price,
          quantity:    i.quantity,
          image:       "",
          product:     i.productId,
          levelNumber: i.levelNumber,
        })),
        paymentInfo:   { id: "FAKE_PAYMENT_ID_123", status: "Paid" },
        itemsPrice,
        taxPrice:      tax,
        shippingPrice: shipping,
        totalPrice:    total,
      });

      if (data.success) {
        clearOrderData();
        toast.show("Order placed successfully! 🎉");
        setPage("thankyou");
      } else {
        toast.show(data.message || "Order failed", "error");
      }
    } catch {
      toast.show("Network error", "error");
    }
    setLoading(false);
  }

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "var(--text-muted)",
  };

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
      <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp 0.5s ease" }}>
        <Card>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>💳</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Order Summary
            </h2>
          </div>

          {/* Line items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {cartItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>
                  Level {item.levelNumber} × {item.quantity}
                </span>
                <span style={{ fontWeight: 600 }}>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div style={rowStyle}>
              <span>Subtotal</span>
              <span>₹{itemsPrice}</span>
            </div>
            <div style={rowStyle}>
              <span>GST (18 %)</span>
              <span>₹{tax}</span>
            </div>
            <div style={rowStyle}>
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
                paddingTop: 10,
                borderTop: "1px solid var(--border)",
              }}
            >
              <span>Total</span>
              <span style={{ color: "var(--accent)" }}>₹{total}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Button
              variant="secondary"
              onClick={() => setPage("shipping")}
              style={{ flex: 1 }}
            >
              ← Back
            </Button>
            <Button onClick={confirmOrder} disabled={loading} style={{ flex: 1 }}>
              {loading ? "Placing…" : "Confirm & Pay ✓"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
