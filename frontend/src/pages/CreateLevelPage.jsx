import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { fetchAllUsers, createLevel } from "../utils/api";
import { getBase64 } from "../utils/api";

const PROGRAMS = [
  "Abacus",
  "Handwriting",
  "Vedic Maths",
  "Phonics Garden",
  "Rubik's Cube",
  "Ride and Rise",
];

const LEVEL_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function CreateLevelPage({ setPage, toast }) {
  const [form, setForm] = useState({
    levelNumber: "",
    description: "",
    price:       "",
    stock:       "",
    product:     PROGRAMS[0],
  });
  const [imageFile, setImageFile]         = useState(null);
  const [imagePreview, setImagePreview]   = useState(null);
  const [users, setUsers]                 = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [loading, setLoading]             = useState(false);

  // Load all users for permission assignment
  useEffect(() => {
    (async () => {
      try {
        const { ok, data } = await fetchAllUsers();
        if (ok && data.success) setUsers(data.users);
      } catch {
        // non-critical — admin user list just won't show
      }
    })();
  }, []);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function toggleUser(userId) {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }

  async function handleSubmit() {
    if (!form.levelNumber || !form.price || !form.stock || !form.description) {
      return toast.show("Please fill all required fields", "error");
    }
    if (!imageFile) return toast.show("Please select a level image", "error");

    setLoading(true);
    try {
      const imageBase64 = await getBase64(imageFile);
      const { ok, data } = await createLevel({
        ...form,
        images:         imageBase64,
        permittedUsers: selectedUserIds,
      });

      if (ok) {
        toast.show("Level created successfully! ✨");
        setPage("admin-orders");
      } else {
        toast.show(data.message || "Creation failed", "error");
      }
    } catch {
      toast.show("Network error", "error");
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
      <div style={{ width: "100%", maxWidth: 540, animation: "fadeUp 0.5s ease" }}>
        <Card>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>➕</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Create New Level
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 6 }}>
              Add a new level to any program
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Level Number */}
            <div>
              <label>Level Number <span style={{ color: "var(--danger)" }}>*</span></label>
              <input
                list="level-numbers"
                value={form.levelNumber}
                onChange={(e) => update("levelNumber", e.target.value)}
                placeholder="1 – 10"
              />
              <datalist id="level-numbers">
                {LEVEL_NUMBERS.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>

            {/* Description */}
            <div>
              <label>Level Description <span style={{ color: "var(--danger)" }}>*</span></label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe what students will learn in this level…"
                style={{ resize: "vertical" }}
              />
            </div>

            {/* Price + Stock */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label>Price (₹) <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label>Stock <span style={{ color: "var(--danger)" }}>*</span></label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => update("stock", e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>

            {/* Program */}
            <div>
              <label>Program <span style={{ color: "var(--danger)" }}>*</span></label>
              <select value={form.product} onChange={(e) => update("product", e.target.value)}>
                {PROGRAMS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Image upload */}
            <div>
              <label>Level Image <span style={{ color: "var(--danger)" }}>*</span></label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ cursor: "pointer" }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    marginTop: 10,
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border)",
                  }}
                />
              )}
            </div>

            {/* Permitted Users */}
            {users.length > 0 && (
              <div>
                <label>Permitted Users</label>
                <div
                  style={{
                    background: "var(--bg-input)",
                    border: "1.5px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    maxHeight: 160,
                    overflowY: "auto",
                    padding: "6px 0",
                  }}
                >
                  {users.map((u) => (
                    <label
                      key={u._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "7px 14px",
                        cursor: "pointer",
                        textTransform: "none",
                        letterSpacing: 0,
                        fontSize: 13,
                        color: "var(--text-primary)",
                        fontWeight: 400,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(u._id)}
                        onChange={() => toggleUser(u._id)}
                        style={{ width: "auto", accentColor: "var(--accent)" }}
                      />
                      <span>
                        {u.name}{" "}
                        <span style={{ color: "var(--text-muted)", fontSize: 11 }}>
                          ({u.email})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
                {selectedUserIds.length > 0 && (
                  <p style={{ fontSize: 11, color: "var(--accent)", marginTop: 6 }}>
                    {selectedUserIds.length} user{selectedUserIds.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <Button
                variant="secondary"
                onClick={() => setPage("admin-orders")}
                style={{ flex: 1 }}
              >
                ← Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} style={{ flex: 1 }}>
                {loading ? "Creating…" : "Create Level →"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
