# VCS – Versatile Educare System (React Frontend)

A professional React SPA converted from a multi-page HTML/CSS/JS project.

---

## 📁 Folder Structure

```
vcs-app/
├── public/
│   └── index.html
└── src/
    ├── index.js               # App entry point
    ├── App.jsx                # Root router & layout
    │
    ├── styles/
    │   └── global.css         # CSS variables, resets, animations
    │
    ├── hooks/
    │   ├── useToast.js        # Toast notification system
    │   └── useAuth.js         # Auth state (login / logout)
    │
    ├── utils/
    │   ├── api.js             # All fetch calls (API_BASE, helpers)
    │   └── auth.js            # localStorage helpers (session, cart, shipping)
    │
    ├── components/
    │   ├── ui/
    │   │   ├── Button.jsx     # Reusable button with variants
    │   │   ├── Card.jsx       # Styled card wrapper
    │   │   ├── Spinner.jsx    # Loading spinner
    │   │   ├── FormField.jsx  # Generic labeled input/select/textarea
    │   │   └── index.js       # Barrel export
    │   │
    │   ├── Navbar.jsx         # Fixed top navigation with user dropdown
    │   ├── Sidebar.jsx        # Slide-in sidebar for Products page
    │   ├── LevelCard.jsx      # Level display + qty controls
    │   ├── CartFooter.jsx     # Sticky cart total bar
    │   ├── OrderStatusBar.jsx # 3-step progress tracker
    │   └── ToastContainer.jsx # Floating notification toasts
    │
    └── pages/
        ├── HomePage.jsx        # Landing / hero page
        ├── LoginPage.jsx       # Login form
        ├── SignupPage.jsx      # Registration form
        ├── ProductsPage.jsx    # Programs + levels with cart
        ├── ShippingPage.jsx    # Shipping address form
        ├── PaymentPage.jsx     # Order summary + confirm
        ├── ThankyouPage.jsx    # Order success screen
        ├── MyOrdersPage.jsx    # User order history
        ├── AdminOrdersPage.jsx # Admin order management table
        └── CreateLevelPage.jsx # Admin: create level form
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Install & Run

```bash
cd vcs-app
npm install
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## 🎨 Design System

All design tokens are defined as CSS variables in `src/styles/global.css`:

| Variable          | Value       | Usage                   |
|-------------------|-------------|-------------------------|
| `--accent`        | `#ff8c00`   | Primary orange           |
| `--bg-primary`    | `#0f0e17`   | Page background          |
| `--bg-card`       | `#1a1a2e`   | Card backgrounds         |
| `--text-muted`    | `#a0a0c0`   | Secondary text           |
| `--success`       | `#2ed573`   | Success states           |
| `--danger`        | `#ff4757`   | Error / danger           |
| `--font-display`  | Syne        | Headings                 |
| `--font-body`     | DM Sans     | Body text                |

---

## 🔌 API

All API calls are centralised in `src/utils/api.js`.  
The base URL is: `https://versatile-aqao.onrender.com/api/v1`

Authentication uses a Bearer token stored in `localStorage`.

---

## 🗺 Pages & Routing

Routing is handled via a simple `page` state in `App.jsx` — no external router library needed.

| Page key        | Component            | Access      |
|-----------------|----------------------|-------------|
| `home`          | `HomePage`           | Public      |
| `login`         | `LoginPage`          | Public      |
| `signup`        | `SignupPage`         | Public      |
| `products`      | `ProductsPage`       | Auth        |
| `shipping`      | `ShippingPage`       | Auth        |
| `payment`       | `PaymentPage`        | Auth        |
| `thankyou`      | `ThankyouPage`       | Auth        |
| `my-orders`     | `MyOrdersPage`       | Auth        |
| `admin-orders`  | `AdminOrdersPage`    | Admin only  |
| `create-level`  | `CreateLevelPage`    | Admin only  |
