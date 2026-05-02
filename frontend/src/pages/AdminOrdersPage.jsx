import React, { useState, useEffect, useCallback } from "react";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { fetchAdminOrders, updateOrderStatus } from "../utils/api";

const COL_WIDTHS = "130px 155px 140px 150px 110px 1fr 110px 150px";

const STATUS_COLORS = {
  Processing: "#ffc107",
  Shipped:    "var(--info)",
  Delivered:  "var(--success)",
};

function HeaderCell({ children }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 11,
        color: "var(--accent)",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      {children}
    </div>
  );
}

export default function AdminOrdersPage({ setPage, toast }) {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    try {
      const { ok, data } = await fetchAdminOrders();
      if (ok) setOrders([...(data.orders || [])].reverse());
      else toast.show("Failed to load orders", "error");
    } catch {
      toast.show("Network error", "error");
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  async function handleStatusUpdate(orderId, status) {
    try {
      const { data } = await updateOrderStatus(orderId, status);
      if (data.success) {
        toast.show(`Order marked as ${status}`);
        loadOrders();
      } else {
        toast.show("Failed to update status", "error");
      }
    } catch {
      toast.show("Network error", "error");
    }
  }

  if (loading) return <div style={{ paddingTop: 100 }}><Spinner /></div>;

  return (
    <div style={{ paddingTop: 64, padding: "80px 24px" }}>
      {/* Page header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1260,
          margin: "0 auto 28px",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          Admin — All Orders
          <span
            style={{
              marginLeft: 12,
              fontSize: 14,
              color: "var(--text-muted)",
              fontFamily: "var(--font-body)",
              fontWeight: 400,
            }}
          >
            ({orders.length})
          </span>
        </h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button onClick={() => setPage("create-level")} style={{ padding: "9px 18px" }}>
            ➕ Add Level
          </Button>
          <Button variant="secondary" onClick={() => setPage("products")} style={{ padding: "9px 18px" }}>
            🛍 Programs
          </Button>
          <Button variant="secondary" onClick={() => setPage("signup")} style={{ padding: "9px 18px" }}>
            👤 Register User
          </Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth: 1260, margin: "0 auto", overflowX: "auto" }}>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            minWidth: 900,
          }}
        >
          {/* Table head */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: COL_WIDTHS,
              padding: "14px 18px",
              background: "rgba(255,140,0,0.08)",
              borderBottom: "1px solid var(--border)",
              gap: 12,
            }}
          >
            {["Order ID", "Date", "Customer", "Product", "Lvl × Qty", "Address", "Total", "Actions"].map(
              (h) => <HeaderCell key={h}>{h}</HeaderCell>
            )}
          </div>

          {/* Rows */}
          {orders.length === 0 && (
            <div style={{ textAlign: "center", padding: 48, color: "var(--text-muted)" }}>
              No orders found.
            </div>
          )}

          {orders.map((order) => {
            const isDelivered = order.orderStatus === "Delivered";
            const statusColor = STATUS_COLORS[order.orderStatus] || "var(--accent)";

            return (
              <div
                key={order._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: COL_WIDTHS,
                  padding: "14px 18px",
                  borderBottom: "1px solid var(--border)",
                  gap: 12,
                  fontSize: 13,
                  alignItems: "start",
                  background: isDelivered ? "rgba(46,213,115,0.04)" : "transparent",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = isDelivered
                    ? "rgba(46,213,115,0.07)"
                    : "rgba(255,140,0,0.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = isDelivered
                    ? "rgba(46,213,115,0.04)"
                    : "transparent")
                }
              >
                {/* Order ID */}
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    #{order._id.slice(-6).toUpperCase()}
                  </span>
                  <div
                    style={{
                      marginTop: 4,
                      display: "inline-block",
                      background: statusColor + "22",
                      color: statusColor,
                      padding: "2px 8px",
                      borderRadius: 100,
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {order.orderStatus}
                  </div>
                </div>

                {/* Date */}
                <div style={{ color: "var(--text-muted)", fontSize: 11, lineHeight: 1.5 }}>
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                {/* Customer */}
                <div style={{ fontWeight: 500 }}>
                  {order.user?.name || "Unknown"}
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    {order.user?.email}
                  </div>
                </div>

                {/* Product names */}
                <div style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.6 }}>
                  {[...new Set(order.orderItems.map((i) => i.product?.name).filter(Boolean))].join(", ")}
                </div>

                {/* Level × Qty */}
                <div>
                  {order.orderItems.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        marginBottom: 2,
                      }}
                    >
                      L{item.levelNumber} × {item.quantity}
                    </div>
                  ))}
                </div>

                {/* Address */}
                <div style={{ color: "var(--text-muted)", fontSize: 11, lineHeight: 1.6 }}>
                  {order.shippingInfo.house}, {order.shippingInfo.area},{" "}
                  {order.shippingInfo.city} — {order.shippingInfo.pincode}
                  <br />
                  📞 {order.shippingInfo.phoneNo}
                </div>

                {/* Total */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  ₹{order.totalPrice}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Button
                    variant="ghost"
                    onClick={() => handleStatusUpdate(order._id, "Shipped")}
                    style={{ padding: "6px 10px", fontSize: 12 }}
                  >
                    ✈ Shipped
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleStatusUpdate(order._id, "Delivered")}
                    style={{ padding: "6px 10px", fontSize: 12 }}
                  >
                    ✓ Delivered
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
