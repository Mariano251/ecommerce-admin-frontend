import axios from 'axios';
import type { Product, Category, Client, Order } from '../types';

const API_URL = 'https://ecommerce-api2-qmpe.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = () => api.get<Product[]>('/products');
export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);
export const createProduct = (data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => 
  api.post<Product>('/products', data);
export const updateProduct = (id: number, data: Partial<Product>) => 
  api.put<Product>(`/products/${id}`, data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);

// Categories
export const getCategories = () => api.get<Category[]>('/categories');
export const createCategory = (data: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => 
  api.post<Category>('/categories', data);

// Clients
export const getClients = () => api.get<Client[]>('/clients');

// Orders
export const getOrders = () => api.get<Order[]>('/orders');
export const updateOrderStatus = (id: number, status: string) => 
  api.put(`/orders/${id}`, { status });

export default api;