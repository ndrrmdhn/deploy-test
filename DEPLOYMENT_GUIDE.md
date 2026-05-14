# 🚀 Deployment & Testing Guide

## Quick Deployment to Vercel

### Option 1: CLI (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd deploy-test
vercel

# Follow prompts:
# - Link to existing project or create new
# - Root directory: ./ (keep as root, Vercel will find frontend)
# - Framework: Other
# - Build command: (leave empty)
```

### Option 2: GitHub Integration
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose `ndrrmdhn/deploy-test`
4. Project Settings:
   - Framework: Other
   - Root Directory: (leave empty)
5. Click "Deploy"

### Option 3: Manual Upload
```bash
# Compress frontend folder
zip -r frontend.zip frontend/

# Upload to Vercel drag-and-drop
# https://vercel.com/new/html
```

---

## 📋 Testing Checklist

### 1. Landing Page
- [ ] Page loads with hero banner
- [ ] Featured products display (4 items)
- [ ] Images load correctly
- [ ] "Belanja Sekarang" button navigates to /products
- [ ] Navbar shows "Login" & "Daftar" buttons
- [ ] Footer displays all sections
- [ ] Mobile view responsive

### 2. Product Listing Page
- [ ] All 12 products display in grid
- [ ] Product cards show: image, name, price, stock
- [ ] Search input works in real-time
- [ ] Category filter populated correctly
- [ ] Filtering by category updates grid
- [ ] "Lihat Detail" button navigates correctly
- [ ] Mobile: cards stack in single column

### 3. Product Detail Page
- [ ] Product image displays
- [ ] Product specs listed
- [ ] Price and stock shown
- [ ] Quantity input adjustable (min=1, max=stock)
- [ ] "Tambah ke Keranjang" button works
- [ ] Toast shows "Produk ditambahkan"
- [ ] Back button returns to products

### 4. Shopping Cart
- [ ] Added items display in cart
- [ ] Item image, name, price, qty shown
- [ ] Total price calculated correctly
- [ ] Update quantity: cart updates
- [ ] Remove button: item removed from cart
- [ ] Cart summary shows subtotal & total
- [ ] Cart badge shows item count in navbar
- [ ] Empty cart: shows message + "Lanjut Belanja"

### 5. Authentication
#### Register
- [ ] Form accepts name, email, password
- [ ] Duplicate email rejected
- [ ] Redirects to login on success
- [ ] Link to login page works

#### Login
- [ ] Form accepts email, password
- [ ] Invalid credentials show error
- [ ] Successful login shows greeting toast
- [ ] Navbar shows user name & "Dashboard" button
- [ ] Can logout

### 6. Checkout
- [ ] When not logged in: redirect to login
- [ ] When logged in: show form
- [ ] Name pre-filled from currentUser
- [ ] Address textarea required
- [ ] "Buat Pesanan" creates order
- [ ] Redirects to success page
- [ ] Order ID displayed
- [ ] Cart cleared after checkout

### 7. Dashboard (Protected)
- [ ] Only accessible when logged in
- [ ] Shows total orders count
- [ ] Shows total spending
- [ ] Shows user role
- [ ] Lists all user's orders
- [ ] Order ID, date, total, status displayed
- [ ] Logout button works
- [ ] New orders appear after checkout

### 8. Data Persistence
- [ ] **Refresh after login**: Still logged in ✓
- [ ] **Refresh after cart add**: Items remain ✓
- [ ] **Close & reopen browser**: Cart persisted ✓
- [ ] **Create order**: In localStorage ✓
- [ ] **Register user**: In localStorage ✓
- [ ] **Clear localStorage**: App resets ✓

### 9. UI & Responsiveness
- [ ] **Mobile (320px)**: All readable, no horizontal scroll
- [ ] **Tablet (768px)**: Grid 2 columns
- [ ] **Desktop (1024px+)**: Grid 3-4 columns
- [ ] **Buttons**: Clickable, visual feedback
- [ ] **Forms**: Proper spacing, labels visible
- [ ] **Notifications**: Toast appears & disappears
- [ ] **Dark mode**: Text visible everywhere

### 10. Performance
- [ ] **First load**: < 2 seconds
- [ ] **Page navigation**: Instant (hash routing)
- [ ] **Search**: No lag with 12 products
- [ ] **No console errors**: Check F12 → Console

---

## 🧪 Test Scenarios

### Scenario 1: Complete Purchase as Guest
```
1. Open frontend
2. Browse products
3. Search "iPhone"
4. Click product → View details
5. Click "Lihat Detail"
6. Add to cart (qty 2)
7. Go to cart
8. Click checkout
9. Redirected to login
10. Click "Daftar di sini"
11. Register new account
12. Login with new account
13. Checkout with address
14. See success page
15. Go to dashboard
16. See order in list
```

### Scenario 2: Pre-loaded User
```
1. Login: john@example.com / john123
2. Search "laptop"
3. Add "MacBook Pro" to cart
4. Add "Dell XPS" to cart
5. Go to cart
6. Update MacBook qty to 2
7. Verify total
8. Checkout with address
9. Success → Dashboard
10. See 2 orders (old + new)
11. Logout
```

### Scenario 3: Cart Persistence
```
1. Add 3 items to cart
2. Go to /cart
3. Refresh page (F5)
4. Items still there? ✓
5. Update quantity
6. Refresh again
7. New quantity persists? ✓
```

### Scenario 4: Invalid Operations
```
1. Try login with wrong password → Error shown ✓
2. Try register with existing email → Error ✓
3. Try checkout without login → Redirect to login ✓
4. Try add qty > stock → Error toast ✓
5. Try remove item → Item gone ✓
```

---

## 🔍 Debugging

### Check localStorage
```javascript
// In browser console (F12)
localStorage.getItem('app_currentUser')
localStorage.getItem('app_cart')
localStorage.getItem('app_orders')
localStorage.getItem('app_users')

// Clear all data
localStorage.clear()

// View as object
JSON.parse(localStorage.getItem('app_cart'))
```

### Check Network
1. Open F12 → Network tab
2. Reload page
3. Verify these files load:
   - `index.html` (Status 200)
   - `main.js` (Status 200)
   - `modules.js` (Status 200)
   - `app.js` (Status 200)
   - `products.json` (Status 200)
   - `users.json` (Status 200)
   - `orders.json` (Status 200)
   - `style.css` (Status 200)

### Common Issues

#### Products not showing
```
→ Check Network tab: products.json loads? 
→ Check Console: any errors?
→ Check localStorage: app_products exists?
```

#### Cart not saving
```
→ localStorage enabled in browser?
→ Check app_cart in localStorage
→ Check console for JS errors
```

#### Login not working
```
→ Check app_users contains data
→ Try credentials: admin@toko.com / admin123
→ Check console for errors
```

---

## 📊 Live Testing URL

After deploy:
```
https://your-vercel-domain.vercel.app/frontend
```

Test all features in production!

---

## 🎯 Successful Deployment Checklist

- [ ] All pages load without errors
- [ ] No console warnings/errors
- [ ] All JSON files load (Network tab)
- [ ] Login/Register works
- [ ] Cart persists across reload
- [ ] Checkout creates orders
- [ ] Dashboard shows stats
- [ ] Mobile responsive
- [ ] Links work correctly
- [ ] Performance acceptable

**All checked? You're ready for production!** 🚀
