import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { registerUser } from "../utils/api";

const FIELDS = [
  { key: "name",     label: "Full Name",      type: "text",     placeholder: "John Doe" },
  { key: "email",    label: "Email Address",  type: "email",    placeholder: "you@example.com" },
  { key: "password", label: "Password",       type: "password", placeholder: "••••••••" },
  { key: "role",     label: "Role",           type: "text",     placeholder: "user  /  admin" },
];

export default function SignupPage({ setPage, toast }) {
  const [form, setForm]     = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.password || !form.role) {
      return toast.show("Please fill all fields", "error");
    }
    setLoading(true);
    try {
      const { ok, data } = await registerUser(form);
      if (ok) {
        toast.show("Account created! Please log in.");
        setPage("login");
      } else {
        toast.show(data.message || "Registration failed", "error");
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
            <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Create Account
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: 14 }}>
              Join VCS and start learning today
            </p>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {FIELDS.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label>{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              disabled={loading}
              fullWidth
              style={{ marginTop: 4 }}
            >
              {loading ? "Creating Account…" : "Create Account →"}
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
            Already have an account?{" "}
            <span
              onClick={() => setPage("login")}
              style={{
                color: "var(--accent)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Log in
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
}
