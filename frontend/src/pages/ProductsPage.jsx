import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LevelCard from "../components/LevelCard";
import CartFooter from "../components/CartFooter";
import Spinner from "../components/ui/Spinner";
import { fetchProducts, fetchPermitLevels } from "../utils/api";
import { saveCartItems } from "../utils/auth";

export default function ProductsPage({ setPage, user, toast }) {
  const [products, setProducts]               = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [levels, setLevels]                   = useState([]);
  const [cart, setCart]                       = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingLevels, setLoadingLevels]     = useState(false);
  const [sidebarOpen, setSidebarOpen]         = useState(false);

  // Load product list on mount
  useEffect(() => {
    (async () => {
      try {
        const { ok, data } = await fetchProducts();
        if (ok) setProducts(data.products || []);
        else toast.show("Failed to load products", "error");
      } catch {
        toast.show("Network error", "error");
      }
      setLoadingProducts(false);
    })();
  }, [toast]);

  // Select a product and load its levels
  async function handleSelectProduct(product) {
    setSelectedProduct(product);
    setLevels([]);
    setLoadingLevels(true);
    try {
      const { ok, data } = await fetchPermitLevels();
      if (!ok) throw new Error();

      const all = data.permittedLevels || {};
      const productLevels = [];
      for (const subject in all) {
        productLevels.push(
          ...all[subject].filter((l) => l.product._id === product._id)
        );
      }

      setLevels(productLevels);

      // Initialise cart entry for this product if not already present
      if (!cart[product._id]) {
        setCart((prev) => ({
          ...prev,
          [product._id]: {
            quantities:  Array(productLevels.length).fill(0),
            levelPrices: productLevels.map((l) => l.price),
            levels:      productLevels.map((l) => l.levelNumber),
          },
        }));
      }
    } catch {
      toast.show("Failed to load levels", "error");
    }
    setLoadingLevels(false);
  }

  function updateQty(productId, index, delta) {
    setCart((prev) => {
      const entry = prev[productId];
      const newQty = [...entry.quantities];
      newQty[index] = Math.max(0, newQty[index] + delta);
      return { ...prev, [productId]: { ...entry, quantities: newQty } };
    });
  }

  const total = Object.values(cart).reduce(
    (sum, p) =>
      sum + p.quantities.reduce((s, q, i) => s + q * p.levelPrices[i], 0),
    0
  );

  function handleBuyNow() {
    const items = [];
    for (const pid in cart) {
      const { quantities, levelPrices, levels: lvls } = cart[pid];
      for (let i = 0; i < quantities.length; i++) {
        if (quantities[i] > 0) {
          items.push({
            productId:   pid,
            quantity:    quantities[i],
            price:       levelPrices[i],
            levelNumber: lvls[i],
          });
        }
      }
    }
    if (!items.length) return toast.show("Add items to cart first", "info");
    saveCartItems(items);
    setPage("shipping");
  }

  return (
    <div style={{ paddingTop: 64, display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
        user={user}
        setPage={setPage}
      />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
            padding: "16px 16px 0",
          }}
        >
          {/* Product list panel */}
          <div
            style={{
              width: 200,
              flexShrink: 0,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 16,
              overflowY: "auto",
              marginRight: 16,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 14,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Programs
            </h3>

            {loadingProducts ? (
              <Spinner size={24} style={{ padding: 16 }} />
            ) : (
              products.map((p) => (
                <div
                  key={p._id}
                  onClick={() => handleSelectProduct(p)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    cursor: "pointer",
                    marginBottom: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    background:
                      selectedProduct?._id === p._id
                        ? "linear-gradient(135deg, var(--accent), var(--accent-dark))"
                        : "transparent",
                    color:
                      selectedProduct?._id === p._id
                        ? "#fff"
                        : "var(--text-primary)",
                    border:
                      selectedProduct?._id === p._id
                        ? "none"
                        : "1px solid var(--border)",
                    transition: "all 0.2s",
                  }}
                >
                  {p.name}
                </div>
              ))
            )}
          </div>

          {/* Levels grid */}
          <div
            style={{
              flex: 1,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: 20,
              overflowY: "auto",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 20,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {selectedProduct
                ? `${selectedProduct.name} — Levels`
                : "Select a Program"}
            </h3>

            {loadingLevels ? (
              <Spinner />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 16,
                }}
              >
                {levels.map((level, i) => (
                  <LevelCard
                    key={level._id}
                    level={level}
                    quantity={cart[selectedProduct?._id]?.quantities[i] || 0}
                    onIncrease={() => updateQty(selectedProduct._id, i, 1)}
                    onDecrease={() => updateQty(selectedProduct._id, i, -1)}
                    animationDelay={i * 0.07}
                  />
                ))}

                {/* Empty states */}
                {!levels.length && !loadingLevels && selectedProduct && (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: 40,
                      color: "var(--text-muted)",
                      fontSize: 14,
                    }}
                  >
                    No levels found for this program.
                  </div>
                )}

                {!selectedProduct && (
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      textAlign: "center",
                      padding: 60,
                      color: "var(--text-muted)",
                    }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 16 }}>👈</div>
                    <p>Select a program from the left to view its levels</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cart Footer */}
        <CartFooter total={total} onBuyNow={handleBuyNow} />
      </div>
    </div>
  );
}
