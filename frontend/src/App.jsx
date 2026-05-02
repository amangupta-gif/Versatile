import React, { useState } from "react";

// Layout
import Navbar          from "./components/Navbar";
import ToastContainer  from "./components/ToastContainer";

// Pages
import HomePage        from "./pages/HomePage";
import LoginPage       from "./pages/LoginPage";
import SignupPage      from "./pages/SignupPage";
import ProductsPage    from "./pages/ProductsPage";
import ShippingPage    from "./pages/ShippingPage";
import PaymentPage     from "./pages/PaymentPage";
import ThankyouPage    from "./pages/ThankyouPage";
import MyOrdersPage    from "./pages/MyOrdersPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import CreateLevelPage from "./pages/CreateLevelPage";

// Hooks
import useToast from "./hooks/useToast";
import useAuth  from "./hooks/useAuth";

export default function App() {
  const [page, setPage] = useState("home");
  const toast           = useToast();
  const { user, login, logout } = useAuth();

  async function handleSignout() {
    await logout();
    toast.show("Signed out successfully");
    setPage("home");
  }

  // ── Page registry ──────────────────────────────────────────────────────
  const pages = {
    home:          <HomePage        setPage={setPage} />,
    login:         <LoginPage       setPage={setPage} onLogin={login} toast={toast} />,
    signup:        <SignupPage      setPage={setPage} toast={toast} />,
    products:      <ProductsPage    setPage={setPage} user={user} toast={toast} />,
    shipping:      <ShippingPage    setPage={setPage} toast={toast} />,
    payment:       <PaymentPage     setPage={setPage} toast={toast} />,
    thankyou:      <ThankyouPage    setPage={setPage} />,
    "my-orders":   <MyOrdersPage    toast={toast} />,
    "admin-orders":<AdminOrdersPage setPage={setPage} toast={toast} />,
    "create-level":<CreateLevelPage setPage={setPage} toast={toast} />,
  };

  return (
    <>
      {/* Global toast notifications */}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismiss} />

      {/* Persistent navbar */}
      <Navbar
        page={page}
        setPage={setPage}
        user={user}
        onSignout={handleSignout}
      />

      {/* Active page */}
      {pages[page] ?? pages.home}
    </>
  );
}
