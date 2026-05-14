// Product Module - Handle product data and rendering
class ProductModule {
  static products = [];
  static filteredProducts = [];

  static async init() {
    await this.loadProducts();
  }

  static async loadProducts() {
    this.products = await Utils.loadJSON('/data/products.json');
    StorageManager.setProducts(this.products);
    this.filteredProducts = [...this.products];
  }

  static getAll() {
    return this.products;
  }

  static getById(id) {
    return this.products.find(p => p.id === parseInt(id));
  }

  static getCategories() {
    return [...new Set(this.products.map(p => p.category))];
  }

  static search(query) {
    this.filteredProducts = this.products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return this.filteredProducts;
  }

  static filter(category) {
    if (category === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
    return this.filteredProducts;
  }

  static getFiltered() {
    return this.filteredProducts;
  }

  static renderProductCard(product) {
    return `
      <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div class="product-image bg-gray-100 h-48 overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition-transform">
        </div>
        <div class="product-info p-4">
          <h3 class="font-semibold text-lg line-clamp-2">${product.name}</h3>
          <p class="text-gray-600 text-sm my-2 line-clamp-2">${product.description}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-xl font-bold text-blue-600">${Utils.formatPrice(product.price)}</span>
            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">${product.stock} stok</span>
          </div>
          <button onclick="document.location.hash='#/product/${product.id}'" class="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Lihat Detail
          </button>
        </div>
      </div>
    `;
  }

  static renderProductGrid(products) {
    return products.map(p => this.renderProductCard(p)).join('');
  }
}

// Cart Module - Handle shopping cart operations
class CartModule {
  static addToCart(product, quantity = 1) {
    if (product.stock < quantity) {
      Notification.error('Stok tidak cukup!');
      return false;
    }

    const cart = StorageManager.getCart();
    const existing = cart.find(item => item.productId === product.id);

    if (existing) {
      if (existing.quantity + quantity > product.stock) {
        Notification.error('Stok tidak mencukupi untuk penambahan ini!');
        return false;
      }
      existing.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        maxStock: product.stock
      });
    }

    StorageManager.setCart(cart);
    Notification.success(`${product.name} ditambahkan ke keranjang!`);
    return true;
  }

  static removeFromCart(productId) {
    let cart = StorageManager.getCart();
    cart = cart.filter(item => item.productId !== productId);
    StorageManager.setCart(cart);
    Notification.success('Produk dihapus dari keranjang');
  }

  static updateQuantity(productId, quantity) {
    const cart = StorageManager.getCart();
    const item = cart.find(item => item.productId === productId);

    if (item) {
      if (quantity > item.maxStock) {
        Notification.error('Jumlah melebihi stok tersedia');
        return false;
      }
      if (quantity <= 0) {
        this.removeFromCart(productId);
        return true;
      }
      item.quantity = quantity;
      StorageManager.setCart(cart);
      return true;
    }
    return false;
  }

  static getCart() {
    return StorageManager.getCart();
  }

  static getTotal() {
    return this.getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  static getItemCount() {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  }

  static clearCart() {
    StorageManager.clearCart();
    Notification.success('Keranjang dikosongkan');
  }

  static renderCartItem(item) {
    return `
      <div class="cart-item flex items-center gap-4 p-4 border-b">
        <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
        <div class="flex-1">
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-gray-600">${Utils.formatPrice(item.price)} x ${item.quantity}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold">${Utils.formatPrice(item.price * item.quantity)}</p>
          <input type="number" min="1" max="${item.maxStock}" value="${item.quantity}" 
            class="w-16 mt-2 px-2 py-1 border rounded"
            onchange="CartModule.updateQuantity(${item.productId}, parseInt(this.value)); location.reload()">
          <button onclick="CartModule.removeFromCart(${item.productId}); location.reload()" class="text-red-600 hover:text-red-800 text-sm mt-2 block">
            Hapus
          </button>
        </div>
      </div>
    `;
  }
}

// Auth Module - Handle user authentication
class AuthModule {
  static register(name, email, password) {
    // Load users from JSON first
    const users = StorageManager.getUsers();
    
    if (users.find(u => u.email === email)) {
      Notification.error('Email sudah terdaftar!');
      return false;
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    StorageManager.setUsers(users);
    Notification.success('Registrasi berhasil! Silakan login.');
    return true;
  }

  static login(email, password) {
    const users = StorageManager.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      Notification.error('Email atau password salah!');
      return false;
    }

    const currentUser = { ...user };
    delete currentUser.password;
    StorageManager.setCurrentUser(currentUser);
    Notification.success(`Selamat datang, ${user.name}!`);
    return true;
  }

  static logout() {
    StorageManager.setCurrentUser(null);
    StorageManager.clearCart();
    Notification.success('Anda telah logout');
    Router.navigate('/');
  }

  static getCurrentUser() {
    return StorageManager.getCurrentUser();
  }

  static isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  static requireLogin() {
    if (!this.isLoggedIn()) {
      Router.navigate('/login');
      Notification.error('Silakan login terlebih dahulu');
      return false;
    }
    return true;
  }

  static initUsersFromJSON() {
    // Load users from users.json on first load
    const existingUsers = StorageManager.getUsers();
    if (existingUsers.length === 0) {
      Utils.loadJSON('/data/users.json').then(users => {
        StorageManager.setUsers(users);
      });
    }
  }
}

// Checkout Module - Handle order creation
class CheckoutModule {
  static createOrder(shippingAddress) {
    if (!AuthModule.isLoggedIn()) {
      Notification.error('Silakan login terlebih dahulu');
      return false;
    }

    const cart = CartModule.getCart();
    if (cart.length === 0) {
      Notification.error('Keranjang kosong!');
      return false;
    }

    const currentUser = AuthModule.getCurrentUser();
    const order = {
      id: Utils.generateOrderId(),
      userId: currentUser.id,
      userName: currentUser.name,
      items: cart,
      total: CartModule.getTotal(),
      status: 'completed',
      date: new Date().toISOString().split('T')[0],
      shippingAddress: shippingAddress
    };

    StorageManager.addOrder(order);
    CartModule.clearCart();
    Notification.success('Pesanan berhasil dibuat!');
    return order;
  }

  static getOrders() {
    const currentUser = AuthModule.getCurrentUser();
    if (!currentUser) return [];
    
    const allOrders = StorageManager.getOrders();
    return allOrders.filter(order => order.userId === currentUser.id);
  }

  static initOrdersFromJSON() {
    const existingOrders = StorageManager.getOrders();
    if (existingOrders.length === 0) {
      Utils.loadJSON('/data/orders.json').then(orders => {
        StorageManager.setOrders(orders);
      });
    }
  }
}
