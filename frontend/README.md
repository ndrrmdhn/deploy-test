# Frontend Static E-Commerce Site

A pure **HTML/CSS/JavaScript** e-commerce frontend (no backend required), ready for deployment to Vercel.

## ✨ Features

### Core E-Commerce
- ✅ **Product Catalog** - Browse 12+ sample products with search & filter
- ✅ **Shopping Cart** - Add/remove/update items with real-time total calculation
- ✅ **Checkout System** - Create orders with shipping address
- ✅ **User Authentication** - Register & login with localStorage persistence
- ✅ **Order Dashboard** - View order history and statistics
- ✅ **Responsive Design** - Mobile-first, works on all devices

### Technical
- 🎨 **TailwindCSS CDN** - No build step, instant styling
- 💾 **localStorage Persistence** - All data saved locally, survives page reload
- 🚀 **SPA Router** - Hash-based navigation without backend
- 📱 **Mobile Optimized** - Fully responsive design
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript
- 📦 **Vercel Ready** - Deploy in seconds with no configuration

## 📁 Structure

```
frontend/
├── index.html
├── assets/
│   ├── js/
│   │   ├── main.js           # Core utilities
│   │   ├── modules.js        # Business logic
│   │   └── app.js            # Router & handlers
│   └── css/
│       └── style.css
└── data/
    ├── products.json
    ├── users.json
    └── orders.json
```

## 🚀 Quick Start

```bash
# Open in browser or use HTTP server
python -m http.server 8000
# Visit http://localhost:8000/frontend
```

## 🧪 Test Credentials

- Admin: `admin@toko.com` / `admin123`
- User: `john@example.com` / `john123`

## 📦 Deploy to Vercel

```bash
vercel
```

---

**Zero backend, infinite possibilities!** ✨
