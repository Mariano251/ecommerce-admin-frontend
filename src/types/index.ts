export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  date: string;
  total: number;
  delivery_method: number;
  status: string;
  client_id: number;
  bill_id: number;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  street: string;
  number: string;
  city: string;
  client_id: number;
  created_at: string;
  updated_at: string;
}

export interface OrderDetail {
  id: number;
  quantity: number;
  price: number;
  order_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface Bill {
  id: number;
  bill_number: string;
  discount: number;
  total: number;
  payment_type: 'cash' | 'card';
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  lowStockProducts: number;
  totalRevenue: number;
}

export interface StoreState {
  products: Product[];
  categories: Category[];
  orders: Order[];
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

