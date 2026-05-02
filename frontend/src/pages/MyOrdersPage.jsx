import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";
import OrderStatusBar from "../components/OrderStatusBar";
import { fetchMyOrders } from "../utils/api";

const STATUS_COLORS = {
  Processing: "#ffc107",
  Shipped:    "var(--info)",
  Delivered:  "var(--success)",
};

export default function MyOrdersPage({ toast }) {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { ok, data } = await fetchMyOrders();
        if (ok) setOrders([...(data.orders || [])].reverse());
        else toast.show("Failed to load orders", "error");
      } catch {
        toast.show("Network error", "error");
      }
      setLoading(false);
    })();
  }, [toast]);

  if (loading) {
    return (
      <div style={{ paddingTop: 100 }}>
        <Spinner />
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: 64,
        padding: "80px 24px",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 32,
        }}
      >
        My Orders
      </h2>

      {orders.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <p style={{ color: "var(--text-muted)" }}>No orders found yet.</p>
        </Card>
      ) : (
        orders.map((order) => {
          const statusColor = STATUS_COLORS[order.orderStatus] || "var(--accent)";

          return (
            <Card key={order._id} style={{ marginBottom: 24 }}>
              {/* Order header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    Order #{order._id.slice(-6).toUpperCase()}
                  </div>
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: statusColor + "22",
                      color: statusColor,
                      padding: "4px 12px",
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {order.orderStatus}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "var(--accent)",
                    }}
                  >
                    ₹{order.totalPrice}
                  </span>
                </div>
              </div>

              {/* Progress tracker */}
              <OrderStatusBar status={order.orderStatus} />

              {/* Items */}
              <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                {order.orderItems.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "rgba(255,140,0,0.04)",
                      borderRadius: 8,
                      borderLeft: "3px solid var(--accent)",
                      fontSize: 13,
                    }}
                  >
                    <span>
                      {item.product?.name || "N/A"} — Level {item.levelNumber} ×{" "}
                      {item.quantity}
                    </span>
                    <span style={{ fontWeight: 600 }}>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Shipping info */}
              <div
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "var(--text-muted)",
                }}
              >
                📍 {order.shippingInfo.house}, {order.shippingInfo.area},{" "}
                {order.shippingInfo.city} — {order.shippingInfo.pincode}
              </div>
            </Card>
          );
        })
      )}
    </div>
  );
}
