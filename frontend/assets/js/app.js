// Main Application Router & Page Handlers

// Shared Layout Components
const Layout = {
  navbar: `
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-8">
          <a href="#/" class="text-2xl font-bold">TechStore</a>
          <div class="hidden md:flex gap-6">
            <a href="#/" class="hover:text-blue-200">Home</a>
            <a href="#/products" class="hover:text-blue-200">Produk</a>
            <a href="#/cart" class="hover:text-blue-200">Keranjang</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="#/cart" class="relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span id="cart-count" class="cart-badge hidden">0</span>
          </a>
          <div id="auth-menu" class="flex gap-2">
            <a href="#/login" class="btn btn-sm btn-secondary">Login</a>
          </div>
        </div>
      </div>
    </nav>
  `,

  footer: `
    <footer class="bg-gray-800 text-white mt-12 py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 class="font-bold mb-4">TechStore</h4>
            <p class="text-gray-400">Toko elektronik online terlengkap</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">Kategori</h4>
            <ul class="text-gray-400 space-y-2">
              <li><a href="#/products?category=smartphone" class="hover:text-white">Smartphone</a></li>
              <li><a href="#/products?category=laptop" class="hover:text-white">Laptop</a></li>
              <li><a href="#/products?category=audio" class="hover:text-white">Audio</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Bantuan</h4>
            <ul class="text-gray-400 space-y-2">
              <li><a href="#" class="hover:text-white">FAQ</a></li>
              <li><a href="#" class="hover:text-white">Kontak</a></li>
              <li><a href="#" class="hover:text-white">Kebijakan</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4">Ikuti Kami</h4>
            <ul class="text-gray-400 space-y-2">
              <li><a href="#" class="hover:text-white">Facebook</a></li>
              <li><a href="#" class="hover:text-white">Instagram</a></li>
              <li><a href="#" class="hover:text-white">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>&copy; 2024 TechStore. Semua hak cipta dilindungi. | Built with ❤️ Vercel-Ready</p>
        </div>
      </div>
    </footer>
  `,

  render(content) {
    return `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>TechStore - Toko Elektronik Online</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="/assets/css/style.css">
      </head>
      <body class="bg-gray-50">
        ${this.navbar}
        <main class="container mx-auto px-4 py-8">
          ${content}
        </main>
        ${this.footer}
        <script src="/assets/js/main.js"></script>
        <script src="/assets/js/modules.js"></script>
        <script src="/assets/js/app.js"></script>
      </body>
      </html>
    `;
  }
};

// Page Handlers
const Pages = {
  home() {
    return `
      <div class="fade-in">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 mb-12">
          <h1 class="text-4xl font-bold mb-4">Selamat Datang di TechStore</h1>
          <p class="text-lg mb-6">Temukan teknologi terbaru dengan harga terbaik</p>
          <a href="#/products" class="btn btn-success text-lg px-6 py-3">Belanja Sekarang</a>
        </div>

        <h2 class="text-3xl font-bold mb-8">Produk Unggulan</h2>
        <div id="featured-products" class="grid-auto">
          <!-- Products will be loaded here -->
        </div>
      </div>
    `;
  },

  products() {
    return `
      <div class="fade-in">
        <h1 class="text-3xl font-bold mb-8">Daftar Produk</h1>
        
        <div class="mb-8 flex flex-col md:flex-row gap-4">
          <input type="text" id="search-box" placeholder="Cari produk..." 
            class="form-input flex-1" onkeyup="PageHandlers.handleSearch()">
          <select id="category-filter" class="form-select md:w-48" onchange="PageHandlers.handleFilter()">
            <option value="all">Semua Kategori</option>
          </select>
        </div>

        <div id="products-grid" class="grid-auto">
          <!-- Products will be loaded here -->
        </div>
      </div>
    `;
  },

  productDetail(productId) {
    return `
      <div class="fade-in">
        <a href="#/products" class="text-blue-600 hover:underline mb-6 block">&larr; Kembali ke Produk</a>
        
        <div id="product-detail" class="bg-white rounded-lg shadow-lg p-8">
          <!-- Product details will be loaded here -->
        </div>
      </div>
    `;
  },

  cart() {
    return `
      <div class="fade-in">
        <h1 class="text-3xl font-bold mb-8">Keranjang Belanja</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div id="cart-items" class="bg-white rounded-lg shadow">
              <!-- Cart items will be loaded here -->
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6 h-fit">
            <h2 class="text-xl font-bold mb-4">Ringkasan</h2>
            <div class="border-t pt-4">
              <div class="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span id="subtotal">Rp0</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Ongkos Kirim:</span>
                <span>Gratis</span>
              </div>
              <div class="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total:</span>
                <span id="total">Rp0</span>
              </div>
              <a href="#/checkout" class="btn btn-primary w-full mt-6 text-center">Lanjut Checkout</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  checkout() {
    return `
      <div class="fade-in">
        ${AuthModule.isLoggedIn() ? `
          <h1 class="text-3xl font-bold mb-8">Checkout</h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="bg-white rounded-lg shadow p-6 mb-6">
                <h2 class="text-xl font-bold mb-4">Alamat Pengiriman</h2>
                <form id="checkout-form">
                  <div class="form-group">
                    <label class="form-label">Nama Penerima</label>
                    <input type="text" class="form-input" value="${AuthModule.getCurrentUser().name}" readonly>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Alamat Lengkap</label>
                    <textarea class="form-textarea" id="shipping-address" rows="3" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary w-full">Buat Pesanan</button>
                </form>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow p-6 h-fit">
              <h2 class="text-xl font-bold mb-4">Pesanan</h2>
              <div id="checkout-summary">
                <!-- Order summary -->
              </div>
            </div>
          </div>
        ` : `
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p class="mb-4">Silakan login untuk melanjutkan checkout</p>
            <a href="#/login" class="btn btn-primary">Login Sekarang</a>
          </div>
        `}
      </div>
    `;
  },

  success(orderId) {
    return `
      <div class="fade-in text-center">
        <div class="bg-green-50 rounded-lg p-12">
          <svg class="w-16 h-16 text-green-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <h1 class="text-3xl font-bold text-green-600 mb-4">Pesanan Berhasil Dibuat!</h1>
          <p class="text-gray-600 mb-2">Nomor Pesanan: <strong>${orderId}</strong></p>
          <p class="text-gray-600 mb-6">Pesanan Anda akan segera diproses</p>
          <div class="flex justify-center gap-4">
            <a href="#/" class="btn btn-primary">Kembali ke Home</a>
            <a href="#/dashboard" class="btn btn-secondary">Lihat Pesanan</a>
          </div>
        </div>
      </div>
    `;
  },

  login() {
    return `
      <div class="fade-in max-w-md mx-auto">
        ${AuthModule.isLoggedIn() ? `
          <div class="bg-blue-50 rounded-lg p-6 text-center">
            <p class="mb-4">Anda sudah login sebagai <strong>${AuthModule.getCurrentUser().name}</strong></p>
            <a href="#/" class="btn btn-primary">Kembali ke Home</a>
          </div>
        ` : `
          <div class="bg-white rounded-lg shadow p-8">
            <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
            <form id="login-form">
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="login-email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" class="form-input" id="login-password" required>
              </div>
              <button type="submit" class="btn btn-primary w-full">Login</button>
            </form>
            <p class="text-center mt-4">Belum punya akun? <a href="#/register" class="text-blue-600 hover:underline">Daftar di sini</a></p>
          </div>
        `}
      </div>
    `;
  },

  register() {
    return `
      <div class="fade-in max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow p-8">
          <h1 class="text-2xl font-bold mb-6 text-center">Daftar</h1>
          <form id="register-form">
            <div class="form-group">
              <label class="form-label">Nama Lengkap</label>
              <input type="text" class="form-input" id="register-name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="register-email" required>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="register-password" required>
            </div>
            <button type="submit" class="btn btn-primary w-full">Daftar</button>
          </form>
          <p class="text-center mt-4">Sudah punya akun? <a href="#/login" class="text-blue-600 hover:underline">Login di sini</a></p>
        </div>
      </div>
    `;
  },

  dashboard() {
    return `
      <div class="fade-in">
        ${AuthModule.isLoggedIn() ? `
          <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-gray-600 text-sm font-semibold mb-2">Total Pesanan</h3>
              <p id="total-orders" class="text-3xl font-bold">0</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-gray-600 text-sm font-semibold mb-2">Total Pengeluaran</h3>
              <p id="total-spent" class="text-3xl font-bold">Rp0</p>
            </div>
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-gray-600 text-sm font-semibold mb-2">Status Member</h3>
              <p class="text-xl font-semibold text-blue-600">${AuthModule.getCurrentUser().role.toUpperCase()}</p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-bold mb-4">Pesanan Terbaru</h2>
            <div id="recent-orders">
              <!-- Orders will be loaded here -->
            </div>
          </div>

          <div class="mt-6">
            <button onclick="AuthModule.logout()" class="btn btn-danger">Logout</button>
          </div>
        ` : `
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <p class="mb-4">Silakan login untuk mengakses dashboard</p>
            <a href="#/login" class="btn btn-primary">Login Sekarang</a>
          </div>
        `}
      </div>
    `;
  }
};

// Page Handler Utilities
const PageHandlers = {
  async handleSearch() {
    const query = document.getElementById('search-box')?.value || '';
    if (query) {
      ProductModule.search(query);
    } else {
      ProductModule.filteredProducts = [...ProductModule.products];
    }
    this.renderProducts();
  },

  async handleFilter() {
    const category = document.getElementById('category-filter')?.value || 'all';
    ProductModule.filter(category);
    this.renderProducts();
  },

  renderProducts() {
    const container = document.getElementById('products-grid');
    if (container) {
      container.innerHTML = ProductModule.renderProductGrid(ProductModule.getFiltered());
    }
  },

  populateCategories() {
    const select = document.getElementById('category-filter');
    if (select) {
      const categories = ProductModule.getCategories();
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        select.appendChild(option);
      });
    }
  },

  updateCartBadge() {
    const badge = document.getElementById('cart-count');
    const count = CartModule.getItemCount();
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  },

  updateAuthMenu() {
    const menu = document.getElementById('auth-menu');
    if (menu) {
      if (AuthModule.isLoggedIn()) {
        const user = AuthModule.getCurrentUser();
        menu.innerHTML = `
          <span class="text-white">${user.name}</span>
          <a href="#/dashboard" class="btn btn-sm btn-secondary">Dashboard</a>
          <button onclick="AuthModule.logout()" class="btn btn-sm btn-danger">Logout</button>
        `;
      } else {
        menu.innerHTML = `
          <a href="#/login" class="btn btn-sm btn-secondary">Login</a>
          <a href="#/register" class="btn btn-sm btn-primary">Daftar</a>
        `;
      }
    }
  }
};

// Router Configuration
Router.register('/', () => {
  document.body.innerHTML = Layout.render(Pages.home());
  ProductModule.loadProducts().then(() => {
    const container = document.getElementById('featured-products');
    if (container) {
      container.innerHTML = ProductModule.renderProductGrid(ProductModule.getAll().slice(0, 4));
    }
  });
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

Router.register('/products', () => {
  document.body.innerHTML = Layout.render(Pages.products());
  ProductModule.loadProducts().then(() => {
    PageHandlers.populateCategories();
    PageHandlers.renderProducts();
  });
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

Router.register('/product/:id', (id) => {
  const match = window.location.hash.match(/\/product\/(\d+)/);
  const productId = match ? parseInt(match[1]) : null;
  
  if (productId) {
    document.body.innerHTML = Layout.render(Pages.productDetail(productId));
    ProductModule.loadProducts().then(() => {
      const product = ProductModule.getById(productId);
      if (product) {
        const container = document.getElementById('product-detail');
        container.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src="${product.image}" alt="${product.name}" class="w-full rounded-lg">
            </div>
            <div>
              <h1 class="text-3xl font-bold mb-4">${product.name}</h1>
              <p class="text-gray-600 mb-6">${product.description}</p>
              
              <div class="mb-6">
                <span class="text-4xl font-bold text-blue-600">${Utils.formatPrice(product.price)}</span>
                <span class="ml-4 text-sm text-gray-600">${product.stock} stok tersedia</span>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 class="font-semibold mb-2">Spesifikasi:</h3>
                <ul class="space-y-1">
                  ${product.specs.map(spec => `<li class="text-gray-600">• ${spec}</li>`).join('')}
                </ul>
              </div>

              <div class="flex items-center gap-4 mb-6">
                <label class="font-semibold">Jumlah:</label>
                <input type="number" id="qty-input" min="1" max="${product.stock}" value="1" class="w-16 px-2 py-2 border rounded">
              </div>

              <button onclick="CartModule.addToCart(ProductModule.getById(${productId}), parseInt(document.getElementById('qty-input').value)); setTimeout(() => Router.navigate('/cart'), 500)" class="btn btn-primary w-full text-lg py-3">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        `;
      }
    });
  }
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

Router.register('/cart', () => {
  document.body.innerHTML = Layout.render(Pages.cart());
  
  const cart = CartModule.getCart();
  const container = document.getElementById('cart-items');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center">
        <p class="text-gray-600 mb-4">Keranjang Anda kosong</p>
        <a href="#/products" class="btn btn-primary">Lanjut Belanja</a>
      </div>
    `;
  } else {
    container.innerHTML = cart.map(item => CartModule.renderCartItem(item)).join('');
  }

  document.getElementById('subtotal').textContent = Utils.formatPrice(CartModule.getTotal());
  document.getElementById('total').textContent = Utils.formatPrice(CartModule.getTotal());
  
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

Router.register('/checkout', () => {
  document.body.innerHTML = Layout.render(Pages.checkout());
  
  if (AuthModule.isLoggedIn()) {
    const cart = CartModule.getCart();
    const container = document.getElementById('checkout-summary');
    
    if (container && cart.length > 0) {
      container.innerHTML = `
        <div class="space-y-2">
          ${cart.map(item => `
            <div class="flex justify-between text-sm">
              <span>${item.name} x${item.quantity}</span>
              <span>${Utils.formatPrice(item.price * item.quantity)}</span>
            </div>
          `).join('')}
          <div class="border-t pt-2 font-bold">
            <div class="flex justify-between">
              <span>Total:</span>
              <span>${Utils.formatPrice(CartModule.getTotal())}</span>
            </div>
          </div>
        </div>
      `;
    }

    const form = document.getElementById('checkout-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const address = document.getElementById('shipping-address').value;
        const order = CheckoutModule.createOrder(address);
        if (order) {
          setTimeout(() => Router.navigate(`/success/${order.id}`), 500);
        }
      });
    }
  }
  
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

Router.register('/success/:id', () => {
  const match = window.location.hash.match(/\/success\/(.+)/);
  const orderId = match ? match[1] : 'Unknown';
  document.body.innerHTML = Layout.render(Pages.success(orderId));
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

Router.register('/login', () => {
  document.body.innerHTML = Layout.render(Pages.login());
  
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      if (AuthModule.login(email, password)) {
        setTimeout(() => Router.navigate('/'), 500);
      }
    });
  }
  
  PageHandlers.updateAuthMenu();
});

Router.register('/register', () => {
  document.body.innerHTML = Layout.render(Pages.register());
  
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      if (AuthModule.register(name, email, password)) {
        setTimeout(() => Router.navigate('/login'), 500);
      }
    });
  }
  
  PageHandlers.updateAuthMenu();
});

Router.register('/dashboard', () => {
  document.body.innerHTML = Layout.render(Pages.dashboard());
  
  if (AuthModule.isLoggedIn()) {
    const orders = CheckoutModule.getOrders();
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('total-spent').textContent = Utils.formatPrice(totalSpent);
    
    const container = document.getElementById('recent-orders');
    if (container) {
      if (orders.length === 0) {
        container.innerHTML = '<p class="text-gray-600">Anda belum memiliki pesanan</p>';
      } else {
        container.innerHTML = `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-2">Nomor Pesanan</th>
                  <th class="text-left py-2">Tanggal</th>
                  <th class="text-right py-2">Total</th>
                  <th class="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                ${orders.map(order => `
                  <tr class="border-b">
                    <td class="py-2 font-mono text-sm">${order.id}</td>
                    <td class="py-2">${Utils.formatDate(order.date)}</td>
                    <td class="py-2 text-right font-semibold">${Utils.formatPrice(order.total)}</td>
                    <td class="py-2"><span class="badge badge-success">${order.status}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }
    }
  }
  
  PageHandlers.updateCartBadge();
  PageHandlers.updateAuthMenu();
});

// Initialize Application
window.addEventListener('DOMContentLoaded', async () => {
  // Load data from JSON files to localStorage
  AuthModule.initUsersFromJSON();
  CheckoutModule.initOrdersFromJSON();
  await ProductModule.init();
  
  // Initialize router
  Router.init();
});
