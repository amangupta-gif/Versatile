import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { saveShippingInfo } from "../utils/auth";

const STATES = [
  "MAHARASHTRA", "DELHI", "UTTAR PRADESH", "BIHAR",
  "TAMIL NADU", "KARNATAKA", "GUJARAT", "RAJASTHAN",
];

export default function ShippingPage({ setPage, toast }) {
  const [form, setForm] = useState({
    country:  "India",
    name:     "",
    phoneNo:  "",
    house:    "",
    area:     "",
    landmark: "",
    pincode:  "",
    city:     "",
    state:    "MAHARASHTRA",
  });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePay() {
    const required = ["name", "phoneNo", "house", "area", "pincode", "city"];
    for (const k of required) {
      if (!form[k]) return toast.show("Please fill all required fields", "error");
    }
    saveShippingInfo({ ...form, pincode: parseInt(form.pincode, 10) });
    setPage("payment");
  }

  const field = (key, label, type = "text", placeholder = "", required = true) => (
    <div key={key}>
      <label>
        {label} {required && <span style={{ color: "var(--danger)" }}>*</span>}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

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
      <div style={{ width: "100%", maxWidth: 520, animation: "fadeUp 0.5s ease" }}>
        <Card>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📦</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Shipping Details
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
              Where should we send your materials?
            </p>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {/* Country */}
            <div>
              <label>Country</label>
              <select value={form.country} onChange={(e) => update("country", e.target.value)}>
                <option>India</option>
              </select>
            </div>

            {field("name",    "Full Name",            "text", "First and Last name")}
            {field("phoneNo", "Mobile Number",        "tel",  "91XXXXXXXXXX")}
            {field("house",   "Flat / House / Building")}
            {field("area",    "Area / Street / Sector")}
            {field("landmark","Landmark", "text", "", false)}

            {/* Pincode + City */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {field("pincode", "Pincode", "number")}
              {field("city",    "City")}
            </div>

            {/* State */}
            <div>
              <label>State</label>
              <select
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
              >
                {STATES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <Button
              variant="secondary"
              onClick={() => setPage("products")}
              style={{ flex: 1 }}
            >
              ← Back
            </Button>
            <Button onClick={handlePay} style={{ flex: 1 }}>
              Proceed to Pay →
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
