/*
import type { Product, Category, Order } from '../types';

const LOCAL_STORAGE_KEY_PRODUCTS = 'ecommerce_products';
const LOCAL_STORAGE_KEY_CATEGORIES = 'ecommerce_categories';
const LOCAL_STORAGE_KEY_ORDERS = 'ecommerce_orders';

// Helper to get items from local storage
const getItems = <T>(key: string, defaultItems: T[]): T[] => {
  try {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : defaultItems;
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultItems;
  }
};

// Helper to set items to local storage
const setItems = <T>(key: string, items: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

// --- Products ---

export const getLocalProducts = (): Product[] => {
  return getItems<Product>(LOCAL_STORAGE_KEY_PRODUCTS, MOCK_PRODUCTS_DATA());
};

export const addLocalProduct = (newProduct: Omit<Product, 'id_key' | 'created_at' | 'updated_at'>): Product => {
  const products = getLocalProducts();
  const productWithId: Product = {
    ...newProduct,
    id_key: Date.now(), // Simple unique ID
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  products.push(productWithId);
  setItems(LOCAL_STORAGE_KEY_PRODUCTS, products);
  return productWithId;
};

export const updateLocalProduct = (id_key: number, updates: Partial<Product>): Product | undefined => {
  const products = getLocalProducts();
  const index = products.findIndex(p => p.id_key === id_key);
  if (index > -1) {
    products[index] = { ...products[index], ...updates, updated_at: new Date().toISOString() };
    setItems(LOCAL_STORAGE_KEY_PRODUCTS, products);
    return products[index];
  }
  return undefined;
};

export const deleteLocalProduct = (id_key: number) => {
  const products = getLocalProducts();
  const filtered = products.filter(p => p.id_key !== id_key);
  setItems(LOCAL_STORAGE_KEY_PRODUCTS, filtered);
};

export const getLocalProduct = (productId: number): Product | undefined => {
  const products = getLocalProducts();
  return products.find(p => p.id_key === productId);
};


// --- Orders ---

export const getLocalOrders = (): Order[] => {
  return getItems<Order>(LOCAL_STORAGE_KEY_ORDERS, []);
};

export const addLocalOrder = (newOrder: Omit<Order, 'id_key' | 'created_at' | 'updated_at'> & { items: any[], customerInfo: any }): Order => {
  const orders = getLocalOrders();
  const orderWithId: Order = {
    ...newOrder,
    id_key: Date.now(), // Simple unique ID
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: newOrder.status || 'pending',
  };

  // Simulate stock update based on order items
  const products = getLocalProducts();
  orderWithId.items?.forEach(orderItem => {
    const product = products.find(p => p.id_key === orderItem.id_key);
    if (product) {
      product.stock -= orderItem.quantity;
      updateLocalProduct(product.id_key, { stock: product.stock });
    }
  });

  orders.unshift(orderWithId); // Add to beginning
  setItems(LOCAL_STORAGE_KEY_ORDERS, orders);
  return orderWithId;
};

export const updateLocalOrder = (id_key: number, updates: Partial<Order>): Order | undefined => {
  const orders = getLocalOrders();
  const index = orders.findIndex(o => o.id_key === id_key);
  if (index > -1) {
    orders[index] = { ...orders[index], ...updates, updated_at: new Date().toISOString() };
    setItems(LOCAL_STORAGE_KEY_ORDERS, orders);
    return orders[index];
  }
  return undefined;
};

export const updateLocalOrderStatus = (id_key: number, status: string) => {
  return updateLocalOrder(id_key, { status });
};


// --- Categories ---

export const getLocalCategories = (): Category[] => {
  return getItems<Category>(LOCAL_STORAGE_KEY_CATEGORIES, MOCK_CATEGORIES_DATA());
};

export const addLocalCategory = (newCategory: Omit<Category, 'id_key' | 'created_at' | 'updated_at'>): Category => {
  const categories = getLocalCategories();
  const categoryWithId: Category = {
    ...newCategory,
    id_key: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  categories.push(categoryWithId);
  setItems(LOCAL_STORAGE_KEY_CATEGORIES, categories);
  return categoryWithId;
};

export const updateLocalCategory = (id_key: number, updates: Partial<Category>): Category | undefined => {
  const categories = getLocalCategories();
  const index = categories.findIndex(c => c.id_key === id_key);
  if (index > -1) {
    categories[index] = { ...categories[index], ...updates, updated_at: new Date().toISOString() };
    setItems(LOCAL_STORAGE_KEY_CATEGORIES, categories);
    return categories[index];
  }
  return undefined;
};

export const deleteLocalCategory = (id_key: number) => {
  const categories = getLocalCategories();
  const filtered = categories.filter(c => c.id_key !== id_key);
  setItems(LOCAL_STORAGE_KEY_CATEGORIES, filtered);
};


// --- MOCK DATA ---
const MOCK_PRODUCTS_DATA = (): Product[] => [
  {
    id_key: 9001,
    name: "Smartphone X",
    description: "Última generación de smartphone con cámara 108MP y pantalla AMOLED.",
    price: 799.99,
    stock: 25,
    category_id: 1,
    image_url: "https://images.unsplash.com/photo-1592892994967-17849e7e7a89?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id_key: 9002,
    name: "Laptop Pro 14",
    description: "Potente laptop para profesionales con procesador i9 y 32GB RAM.",
    price: 1499.00,
    stock: 10,
    category_id: 1,
    image_url: "https://images.unsplash.com/photo-1541807084-5c52b6b3df9e?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id_key: 9003,
    name: "Auriculares Inalámbricos",
    description: "Sonido de alta fidelidad con cancelación de ruido activa.",
    price: 129.99,
    stock: 50,
    category_id: 1,
    image_url: "https://images.unsplash.com/photo-1620950352136-e82245b78d2b?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id_key: 9004,
    name: "Camiseta Deportiva Elite",
    description: "Transpirable y cómoda, ideal para entrenamientos intensos.",
    price: 35.00,
    stock: 100,
    category_id: 4,
    image_url: "https://images.unsplash.com/photo-1579545934149-8e2b8c5a4b7f?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id_key: 9005,
    name: "Pantalón Casual Slim-fit",
    description: "Estilo moderno y versátil para cualquier ocasión.",
    price: 55.00,
    stock: 80,
    category_id: 2,
    image_url: "https://images.unsplash.com/photo-1603212885915-d92290f6c2c9?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 6).toISOString(), // 6 days ago
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id_key: 9006,
    name: "Silla Ergonómica Pro",
    description: "Diseño adaptable para máxima comodidad durante largas horas de trabajo.",
    price: 249.99,
    stock: 15,
    category_id: 1,
    image_url: "https://images.unsplash.com/photo-1616401777264-a6f02a6c8e3e?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(), // 12 days ago
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
  },
  {
    id_key: 9007,
    name: "Manta Suave de Lana",
    description: "Perfecta para las noches frías, gran calidad y confort.",
    price: 45.00,
    stock: 60,
    category_id: 3,
    image_url: "https://images.unsplash.com/photo-1596758409095-245c3b9b9a67?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id_key: 9008,
    name: "Zapatillas Running Boost",
    description: "Máxima amortiguación y retorno de energía para tus carreras.",
    price: 110.00,
    stock: 40,
    category_id: 2,
    image_url: "https://images.unsplash.com/photo-1571407914022-83b3f4f1f0a5?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(), // 8 days ago
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id_key: 9009,
    name: "Smartwatch Deportivo",
    description: "Monitor de actividad, ritmo cardíaco y notificaciones.",
    price: 199.99,
    stock: 30,
    category_id: 1,
    image_url: "https://images.unsplash.com/photo-1558229868-b7a4216e9f28?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(), // 9 days ago
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
  {
    id_key: 9010,
    name: "Cafetera Expresso Automática",
    description: "Prepara tu café favorito con solo tocar un botón.",
    price: 320.00,
    stock: 20,
    category_id: 2,
    image_url: "https://images.unsplash.com/photo-1626241951958-e3251c6e1e8b?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 11).toISOString(), // 11 days ago
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    id_key: 9011,
    name: "Libro de Cocina Saludable",
    description: "Recetas fáciles y deliciosas para una vida sana.",
    price: 25.00,
    stock: 75,
    category_id: 3,
    image_url: "https://images.unsplash.com/photo-1563729792679-b1414f4f3e6c?w=400&h=400&fit=crop",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updated_at: new Date().toISOString(),
  },
  {
    id_key: 9012,
    name: "Pesas Ajustables 20kg",
    description: "Ideal para entrenar en casa, ahorra espacio y dinero.",
    price: 89.99,
    stock: 30,
    category_id: 4,
    image_url: "https://images.unsplash.com/photo-1579545934149-8e2b8c5a4b7f?w=400&h=400&fit=crop", // Reusing image
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 days ago
    updated_at: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
  },
];

const MOCK_CATEGORIES_DATA = (): Category[] => [
  { id_key: 1, name: 'Electrónica', description: 'Lo último en tecnología', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id_key: 2, name: 'Ropa', description: 'Moda y estilo', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id_key: 3, name: 'Hogar', description: 'Decora tu espacio', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id_key: 4, name: 'Deportes', description: 'Mantente activo', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];
*/