import React, { useState } from "react";
import Button from "./ui/Button";
import { isAdmin } from "../utils/auth";

const NAV_LINKS = ["Home", "About", "Services", "Contact"];

const USER_MENU = [
  { label: "🛍 Products",  page: "products" },
  { label: "📦 My Orders", page: "my-orders" },
];

const ADMIN_MENU = [
  { label: "⚙️ Admin Orders", page: "admin-orders" },
  { label: "➕ Add Level",    page: "create-level" },
];

export default function Navbar({ page, setPage, user, onSignout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = user
    ? [...USER_MENU, ...(isAdmin(user) ? ADMIN_MENU : [])]
    : [];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(15, 14, 23, 0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <span
        onClick={() => setPage("home")}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 22,
          color: "var(--accent)",
          letterSpacing: -0.5,
          cursor: "pointer",
        }}
      >
        VCS
      </span>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {NAV_LINKS.map((n) => (
          <button
            key={n}
            onClick={() => setPage(n.toLowerCase())}
            style={{
              background: "none",
              border: "none",
              color:
                page === n.toLowerCase()
                  ? "var(--accent)"
                  : "var(--text-muted)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "var(--radius-sm)",
              transition: "color 0.2s",
            }}
          >
            {n}
          </button>
        ))}

        {user ? (
          <div style={{ position: "relative" }}>
            {/* Avatar button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                border: "none",
                borderRadius: 10,
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {user.name?.[0]?.toUpperCase() || "U"}
              </span>
              {user.name?.split(" ")[0]}
              <span style={{ fontSize: 10 }}>{menuOpen ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  minWidth: 190,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {/* User info */}
                <div
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {user.email}
                  </div>
                </div>

                {menuItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => {
                      setPage(item.page);
                      setMenuOpen(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 16px",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--border)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  onClick={() => {
                    onSignout();
                    setMenuOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 16px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    borderTop: "1px solid var(--border)",
                    color: "var(--danger)",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            onClick={() => setPage("login")}
            style={{ padding: "8px 20px" }}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
