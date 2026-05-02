export const API_BASE = "https://versatile-aqao.onrender.com/api/v1";
// export const API_BASE = " http://localhost:4000/api/v1";

export function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Auth ──────────────────────────────────────────────────────────────────

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function registerUser(userData) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function logoutUser() {
  const res = await fetch(`${API_BASE}/logout`, {
    method: "GET",
    credentials: "include",
  });
  return { ok: res.ok };
}

// ── Products ──────────────────────────────────────────────────────────────

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`, { headers: authHeaders() });
  return { ok: res.ok, data: await res.json() };
}

export async function fetchPermitLevels() {
  const res = await fetch(`${API_BASE}/permit-levels`, { headers: authHeaders() });
  return { ok: res.ok, data: await res.json() };
}

// ── Orders ────────────────────────────────────────────────────────────────

export async function placeOrder(orderData) {
  const res = await fetch(`${API_BASE}/order/new`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(orderData),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function fetchMyOrders() {
  const res = await fetch(`${API_BASE}/orders/me`, { headers: authHeaders() });
  return { ok: res.ok, data: await res.json() };
}

// ── Admin ─────────────────────────────────────────────────────────────────

export async function fetchAdminOrders() {
  const res = await fetch(`${API_BASE}/admin/orders`, { headers: authHeaders() });
  return { ok: res.ok, data: await res.json() };
}

export async function updateOrderStatus(orderId, status) {
  const res = await fetch(`${API_BASE}/admin/order/${orderId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  return { ok: res.ok, data: await res.json() };
}

export async function fetchAllUsers() {
  const res = await fetch(`${API_BASE}/admin/users`, { headers: authHeaders() });
  return { ok: res.ok, data: await res.json() };
}

export async function createLevel(levelData) {
  const res = await fetch(`${API_BASE}/admin/new-level`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(levelData),
  });
  return { ok: res.ok, data: await res.json() };
}
