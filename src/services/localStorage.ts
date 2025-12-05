import type { Product, Order, Category } from '../types';

// Keys para localStorage
const STORAGE_KEYS = {
  PRODUCTS: 'ecommerce_products',
  ORDERS: 'ecommerce_orders',
  CATEGORIES: 'ecommerce_categories'
};

// ==================== PRODUCTS ====================

export const getLocalProducts = (): Product[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading products from localStorage:', error);
    return [];
  }
};

export const saveLocalProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
};

export const addLocalProduct = (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const products = getLocalProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  products.push(newProduct);
  saveLocalProducts(products);
  return newProduct;
};

export const updateLocalProduct = (id: number, updates: Partial<Product>) => {
  const products = getLocalProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    saveLocalProducts(products);
    return products[index];
  }
  return null;
};

export const deleteLocalProduct = (id: number) => {
  const products = getLocalProducts();
  const filtered = products.filter(p => p.id !== id);
  saveLocalProducts(filtered);
};

export const updateProductStock = (productId: number, quantityToSubtract: number) => {
  const products = getLocalProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    product.stock = Math.max(0, product.stock - quantityToSubtract);
    product.updated_at = new Date().toISOString();
    saveLocalProducts(products);
  }
};

// ==================== ORDERS ====================

export const getLocalOrders = (): Order[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    return [];
  }
};

export const saveLocalOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
};

export const addLocalOrder = (order: any) => {
  const orders = getLocalOrders();
  const newOrder = {
    ...order,
    id: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  orders.push(newOrder);
  saveLocalOrders(orders);
  
  // Descontar stock de productos
  if (order.items && Array.isArray(order.items)) {
    order.items.forEach((item: any) => {
      updateProductStock(item.id, item.quantity);
    });
  }
  
  return newOrder;
};

export const updateLocalOrder = (id: number, updates: Partial<Order>) => {
  const orders = getLocalOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = {
      ...orders[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    saveLocalOrders(orders);
    return orders[index];
  }
  return null;
};

export const updateLocalOrderStatus = (id: number, status: string) => {
  return updateLocalOrder(id, { status });
};

// ==================== CATEGORIES ====================

export const getLocalCategories = (): Category[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading categories from localStorage:', error);
    return [];
  }
};

export const saveLocalCategories = (categories: Category[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories to localStorage:', error);
  }
};

export const addLocalCategory = (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
  const categories = getLocalCategories();
  const newCategory: Category = {
    ...category,
    id: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  categories.push(newCategory);
  saveLocalCategories(categories);
  return newCategory;
};

export const updateLocalCategory = (id: number, updates: Partial<Category>) => {
  const categories = getLocalCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = {
      ...categories[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    saveLocalCategories(categories);
    return categories[index];
  }
  return null;
};

export const deleteLocalCategory = (id: number) => {
  const categories = getLocalCategories();
  const filtered = categories.filter(c => c.id !== id);
  saveLocalCategories(filtered);
};

// ==================== INITIALIZATION ====================

export const initializeLocalStorage = () => {
  // Si no hay productos, inicializar con productos mock
  const products = getLocalProducts();
  if (products.length === 0) {
    const mockProducts: Product[] = [
      {
        id: 9001,
        name: 'iPhone 15 Pro Max',
        description: 'El smartphone más avanzado de Apple con chip A17 Pro y cámara de 48MP. Pantalla Super Retina XDR de 6.7"',
        price: 1299.99,
        stock: 15,
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9002,
        name: 'MacBook Air M3',
        description: 'Laptop ultraligera con chip M3, pantalla Retina de 13.6" y hasta 18 horas de batería',
        price: 1499.99,
        stock: 8,
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9003,
        name: 'Sony WH-1000XM5',
        description: 'Audífonos premium con cancelación de ruido líder en la industria',
        price: 399.99,
        stock: 25,
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9004,
        name: 'Nike Air Max 2024',
        description: 'Zapatillas deportivas con tecnología Air Max',
        price: 189.99,
        stock: 30,
        category_id: 4,
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9005,
        name: 'Camiseta Premium Cotton',
        description: 'Camiseta de algodón orgánico 100%',
        price: 49.99,
        stock: 50,
        category_id: 2,
        image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9006,
        name: 'Smart Watch Ultra',
        description: 'Reloj inteligente con GPS',
        price: 449.99,
        stock: 12,
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9007,
        name: 'Lámpara LED Inteligente',
        description: 'Iluminación RGB controlable por app',
        price: 79.99,
        stock: 40,
        category_id: 3,
        image_url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9008,
        name: 'Mochila Urbana Pro',
        description: 'Mochila impermeable con compartimento para laptop',
        price: 89.99,
        stock: 20,
        category_id: 2,
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9009,
        name: 'iPad Pro M2',
        description: 'Tablet profesional con chip M2',
        price: 1099.99,
        stock: 10,
        category_id: 1,
        image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9010,
        name: 'Jeans Slim Fit',
        description: 'Jeans de mezclilla premium',
        price: 79.99,
        stock: 35,
        category_id: 2,
        image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9011,
        name: 'Sofá Modular 3 Plazas',
        description: 'Sofá modular de alta calidad',
        price: 899.99,
        stock: 5,
        category_id: 3,
        image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 9012,
        name: 'Bicicleta Mountain Bike',
        description: 'Bicicleta de montaña con suspensión',
        price: 549.99,
        stock: 8,
        category_id: 4,
        image_url: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=400&fit=crop',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    saveLocalProducts(mockProducts);
  }

  // Si no hay categorías, inicializar
  const categories = getLocalCategories();
  if (categories.length === 0) {
    const mockCategories: Category[] = [
      { id: 1, name: 'Electrónica', description: 'Lo último en tecnología', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 2, name: 'Ropa', description: 'Moda y estilo', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 3, name: 'Hogar', description: 'Decora tu espacio', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 4, name: 'Deportes', description: 'Mantente activo', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ];
    saveLocalCategories(mockCategories);
  }
};