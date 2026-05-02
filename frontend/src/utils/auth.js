export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem("token") || null;
}

export function saveSession(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isAdmin(user) {
  return user?.role === "admin";
}

// Cart / Shipping helpers
export function saveCartItems(items) {
  localStorage.setItem("selectedCartItems", JSON.stringify(items));
}

export function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem("selectedCartItems") || "[]");
  } catch {
    return [];
  }
}

export function saveShippingInfo(info) {
  localStorage.setItem("shippingInfo", JSON.stringify(info));
}

export function getShippingInfo() {
  try {
    return JSON.parse(localStorage.getItem("shippingInfo") || "null");
  } catch {
    return null;
  }
}

export function clearOrderData() {
  localStorage.removeItem("selectedCartItems");
  localStorage.removeItem("shippingInfo");
}
