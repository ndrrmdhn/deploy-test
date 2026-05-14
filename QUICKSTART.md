# ⚡ Static Frontend E-Commerce - Quick Start

## 📦 What You Got

A **fully functional e-commerce frontend** with:
- ✅ 12 sample tech products
- ✅ Shopping cart with localStorage persistence
- ✅ User authentication (register/login)
- ✅ Checkout & order creation
- ✅ Dashboard with order history
- ✅ Responsive mobile-first design
- ✅ Zero backend dependencies
- ✅ Ready to deploy to Vercel

## 🚀 Deploy in 30 Seconds

### To Vercel (Recommended)

```bash
# 1. Clone/go to repository
cd deploy-test

# 2. Install Vercel CLI
npm i -g vercel

# 3. Deploy
vercel

# 4. Follow prompts (defaults are fine)
# Done! Your URL will be shown
```

### Local Testing

```bash
# Python
python -m http.server 8000
# Then open: http://localhost:8000/frontend

# Node.js
npx http-server frontend -p 8000
# Then open: http://localhost:8000
```

## 🧪 Test Immediately

**Demo Credentials:**
```
Email: john@example.com
Password: john123
```

**Try this flow:**
1. Click "Belanja Sekarang" on homepage
2. Search for "iPhone" or filter by "smartphone"
3. Click "Lihat Detail" on any product
4. Click "Tambah ke Keranjang"
5. Click cart icon (top right)
6. Click "Lanjut Checkout"
7. Login with demo credentials
8. Enter shipping address
9. Click "Buat Pesanan"
10. View your order in Dashboard

## 📁 File Structure

```
frontend/
├── index.html              # Main entry point (SPA)
├── assets/
│   ├── js/
│   │   ├── main.js        # Utilities & core classes
│   │   ├── modules.js     # Business logic
│   │   └── app.js         # Router & page handlers
│   └── css/
│       └── style.css      # Custom component styles
├── data/
│   ├── products.json      # 12 sample products
│   ├── users.json         # Demo accounts
│   └── orders.json        # Orders (loaded from JSON)
└── README.md
```

## 🔧 Features

### Product Management
- Browse 12 products (smartphone, laptop, audio, etc.)
- Real-time search
- Filter by category
- Detailed product pages

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculation
- Persists across page reload

### User Authentication
- Register new accounts
- Login with email/password
- Session management (localStorage)
- Protected checkout

### Orders & Dashboard
- Create orders from cart
- View order history
- See spending statistics
- Track order status

### UI/UX
- TailwindCSS (CDN, no build needed)
- Fully responsive (mobile-first)
- Toast notifications
- Modern e-commerce design

## 💾 How Data Persists

All data stored in browser `localStorage`:
- `app_currentUser` - Current logged-in user
- `app_cart` - Shopping cart items
- `app_users` - Registered users
- `app_orders` - Completed orders

**Clears when you clear browser data!**

## 🔐 Security Note

⚠️ **For demo/learning only!**
- Passwords stored in plain text (localStorage)
- No real backend authentication
- No encryption
- For production: Replace with real backend API

## 🎨 Customization

### Change Store Name
Edit `app.js` line ~200:
```javascript
<a href="#/" class="text-2xl font-bold">YourStoreName</a>
```

### Add Products
Edit `frontend/data/products.json`:
```json
{
  "id": 13,
  "name": "New Product",
  "price": 5000000,
  "image": "https://example.com/image.jpg",
  "category": "new-category",
  "stock": 50,
  "description": "Description",
  "specs": ["spec1", "spec2"]
}
```

### Change Colors
Replace Tailwind classes in `app.js`:
- `bg-blue-600` → `bg-purple-600`
- `text-blue-600` → `text-indigo-600`

## 📊 Architecture

```
index.html (SPA Entry)
    ↓
app.js (Router)
    ├→ main.js (Utils, Storage, Notifications)
    ├→ modules.js (Business Logic)
    └→ data/*.json (Product/User Data)
        ↓
    localStorage (Client-side DB)
```

## 🚀 Production Deployment

### Vercel (Recommended)
```bash
vercel
# Auto-deploys with every git push
# Free tier, unlimited updates
```

### GitHub Pages
```bash
# Push to gh-pages branch
# Enable in repo settings
```

### Any Static Host
- Netlify
- Surge.sh
- Firebase Hosting
- AWS S3 + CloudFront

## 📋 Testing Checklist

- [ ] Homepage loads ✓
- [ ] Products display ✓
- [ ] Search works ✓
- [ ] Add to cart works ✓
- [ ] Login/Register works ✓
- [ ] Checkout works ✓
- [ ] Orders saved ✓
- [ ] Dashboard shows stats ✓
- [ ] Mobile responsive ✓
- [ ] Refresh preserves data ✓

## ❓ FAQ

**Q: Can I add a backend?**
A: Yes! Replace localStorage API calls with fetch() to your backend.

**Q: How to add payment processing?**
A: Integrate with Stripe/PayPal in checkout.js before order creation.

**Q: Can I use this as template?**
A: Yes! MIT licensed, free to use/modify.

**Q: What about dark mode?**
A: Add CSS toggle for dark theme (currently light only).

**Q: Mobile app?**
A: Wrap with React Native or Flutter for iOS/Android.

## 🆘 Troubleshooting

### Products not showing
```
1. Open DevTools (F12)
2. Go to Network tab
3. Reload (F5)
4. Check products.json loads (Status 200)
5. Check Console for errors
```

### Login not working
```
1. Try: admin@toko.com / admin123
2. Or register new account
3. Check app_users in localStorage
4. Clear localStorage and refresh
```

### Cart not saving
```
1. Check localStorage enabled
2. F12 → Application → localStorage → check app_cart
3. Clear localStorage: localStorage.clear()
4. Refresh page
```

## 📞 Support

For issues:
1. Check browser console (F12)
2. Check Network tab (files loading?)
3. Check localStorage (data there?)
4. See DEPLOYMENT_GUIDE.md for full testing

## 🎯 Next Steps

1. **Deploy to Vercel**: `vercel`
2. **Share your URL**: Test with others
3. **Customize**: Add your branding
4. **Extend**: Add backend API
5. **Scale**: Add more products/features

---

**Made with ❤️ for static web hosting**

No servers needed. No databases needed. No configuration needed.

Just HTML, CSS, JavaScript, and JSON.

Perfect for Vercel, Netlify, GitHub Pages, or any static host.

🚀 **Ready to ship!**
