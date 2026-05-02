import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { loginUser } from "../utils/api";

export default function LoginPage({ setPage, onLogin, toast }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit() {
    if (!email || !password) return toast.show("Please fill all fields", "error");
    setLoading(true);
    try {
      const { ok, data } = await loginUser(email, password);
      if (ok) {
        toast.show(`Welcome back, ${data.user.name}!`);
        onLogin(data.token, data.user);
        setPage(data.user.role === "admin" ? "admin-orders" : "products");
      } else {
        toast.show(data.message || "Login failed", "error");
      }
    } catch {
      toast.show("Network error. Please try again.", "error");
    }
    setLoading(false);
  }

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
      <div style={{ width: "100%", maxWidth: 420, animation: "fadeUp 0.5s ease" }}>
        <Card>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Welcome Back
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: 14 }}>
              Sign in to your VCS account
            </p>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>

            <div>
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                    fontSize: 16,
                  }}
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  color: "var(--accent)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </span>
            </div>

            <Button onClick={handleSubmit} disabled={loading} fullWidth>
              {loading ? "Signing In…" : "Sign In →"}
            </Button>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 24,
              fontSize: 14,
              color: "var(--text-muted)",
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => setPage("signup")}
              style={{
                color: "var(--accent)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Sign up
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
