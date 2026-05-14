// Storage Manager - Handle all localStorage operations
class StorageManager {
  static KEYS = {
    CART: 'app_cart',
    CURRENT_USER: 'app_currentUser',
    USERS: 'app_users',
    ORDERS: 'app_orders',
    PRODUCTS: 'app_products',
    THEME: 'app_theme'
  };

  static getCart() {
    const cart = localStorage.getItem(this.KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  }

  static setCart(cart) {
    localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
  }

  static getCurrentUser() {
    const user = localStorage.getItem(this.KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user) {
    localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
  }

  static getUsers() {
    const users = localStorage.getItem(this.KEYS.USERS);
    return users ? JSON.parse(users) : [];
  }

  static setUsers(users) {
    localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
  }

  static getOrders() {
    const orders = localStorage.getItem(this.KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  }

  static setOrders(orders) {
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
  }

  static addOrder(order) {
    const orders = this.getOrders();
    orders.push(order);
    this.setOrders(orders);
    return order;
  }

  static getProducts() {
    const products = localStorage.getItem(this.KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
  }

  static setProducts(products) {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
  }

  static clearAll() {
    localStorage.clear();
  }

  static clearCart() {
    localStorage.removeItem(this.KEYS.CART);
  }
}

// Notification System
class Notification {
  static show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container') || this.createContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-in`;
    toast.innerHTML = `
      <div class="toast-content">
        <span>${message}</span>
      </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static createContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 space-y-2 z-50';
    document.body.appendChild(container);
    return container;
  }

  static success(message, duration) {
    this.show(message, 'success', duration);
  }

  static error(message, duration) {
    this.show(message, 'error', duration);
  }

  static info(message, duration) {
    this.show(message, 'info', duration);
  }
}

// Router - Handle SPA navigation
class Router {
  static routes = {};
  static currentRoute = null;

  static register(path, callback) {
    this.routes[path] = callback;
  }

  static navigate(path) {
    window.location.hash = path;
  }

  static init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }

  static handleRoute() {
    const path = window.location.hash.slice(1) || '/';
    const route = this.routes[path];
    
    if (route) {
      this.currentRoute = path;
      route();
    } else {
      this.navigate('/');
    }
  }

  static getCurrentPath() {
    return window.location.hash.slice(1) || '/';
  }
}

// Utility Functions
const Utils = {
  formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  },

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  },

  async loadJSON(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
};
