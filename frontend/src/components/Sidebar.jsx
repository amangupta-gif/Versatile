import React from "react";
import Button from "./ui/Button";
import { isAdmin } from "../utils/auth";

export default function Sidebar({ open, onToggle, user, setPage }) {
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        style={{
          position: "fixed",
          top: 80,
          left: open ? 268 : 16,
          background: "var(--accent)",
          border: "none",
          borderRadius: 8,
          color: "#fff",
          width: 36,
          height: 36,
          cursor: "pointer",
          zIndex: 51,
          fontSize: 18,
          transition: "left 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Sidebar panel */}
      <div
        style={{
          position: "fixed",
          left: open ? 0 : -280,
          top: 64,
          bottom: 0,
          width: 260,
          background: "linear-gradient(180deg, var(--bg-card), var(--bg-primary))",
          borderRight: "1px solid var(--border)",
          transition: "left 0.3s ease",
          zIndex: 50,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* User avatar */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{user?.name || "User"}</div>
          <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4 }}>
            {user?.email}
          </div>
        </div>

        {/* Navigation links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Button
            variant="secondary"
            onClick={() => setPage("my-orders")}
            style={{ justifyContent: "flex-start", padding: "10px 14px", width: "100%" }}
          >
            📦 My Orders
          </Button>

          {isAdmin(user) && (
            <>
              <Button
                variant="secondary"
                onClick={() => setPage("admin-orders")}
                style={{ justifyContent: "flex-start", padding: "10px 14px", width: "100%" }}
              >
                ⚙️ Admin Orders
              </Button>
              <Button
                variant="secondary"
                onClick={() => setPage("create-level")}
                style={{ justifyContent: "flex-start", padding: "10px 14px", width: "100%" }}
              >
                ➕ Add Level
              </Button>
              <Button
                variant="secondary"
                onClick={() => setPage("signup")}
                style={{ justifyContent: "flex-start", padding: "10px 14px", width: "100%" }}
              >
                👤 Register User
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
