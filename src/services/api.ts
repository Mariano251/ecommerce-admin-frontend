import axios from 'axios';
import type { Product, Category, Client, Order, Address, OrderDetail, Bill, Review } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = () => api.get<Product[]>('/products');
export const getProduct = (id_key: number) => api.get<Product>(`/products/${id_key}`);
export const createProduct = (data: Omit<Product, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<Product>('/products', data);
export const updateProduct = (id_key: number, data: Partial<Product>) => 
  api.put<Product>(`/products/${id_key}`, data);
export const deleteProduct = (id_key: number) => api.delete(`/products/${id_key}`);

// Categories
export const getCategories = () => api.get<Category[]>('/categories');
export const createCategory = (data: Omit<Category, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<Category>('/categories', data);
export const updateCategory = (id_key: number, data: Partial<Category>) => 
  api.put<Category>(`/categories/${id_key}`, data);
export const deleteCategory = (id_key: number) => api.delete(`/categories/${id_key}`);

// Clients
export const getClients = () => api.get<Client[]>('/clients');
export const getClient = (id_key: number) => api.get<Client>(`/clients/${id_key}`);
export const createClient = (data: Omit<Client, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<Client>('/clients', data);
export const updateClient = (id_key: number, data: Partial<Client>) => 
  api.put<Client>(`/clients/${id_key}`, data);
export const deleteClient = (id_key: number) => api.delete(`/clients/${id_key}`);

// Addresses
export const getAddresses = (clientId?: number) => 
  api.get<Address[]>('/addresses', { params: clientId ? { client_id: clientId } : {} });
export const createAddress = (data: Omit<Address, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<Address>('/addresses', data);
export const deleteAddress = (id_key: number) => api.delete(`/addresses/${id_key}`);

// Orders
export const getOrders = () => api.get<Order[]>('/orders');
export const getOrder = (id_key: number) => api.get<Order>(`/orders/${id_key}`);
export const createOrder = (data: Omit<Order, 'id_key' | 'date' | 'created_at' | 'updated_at'>) => 
  api.post<Order>('/orders', data);
export const updateOrder = (id_key: number, data: Partial<Order>) => 
  api.put<Order>(`/orders/${id_key}`, data);
export const updateOrderStatus = (id_key: number, status: string) => 
  api.put(`/orders/${id_key}`, { status });

// Order Details
export const getOrderDetails = (orderId: number) => 
  api.get<OrderDetail[]>('/order_details', { params: { order_id: orderId } });
export const createOrderDetail = (data: Omit<OrderDetail, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<OrderDetail>('/order_details', data);

// Bills
export const getBills = (orderId?: number) => 
  api.get<Bill[]>('/bills', { params: orderId ? { order_id: orderId } : {} });
export const getBill = (id_key: number) => api.get<Bill>(`/bills/${id_key}`);
export const createBill = (data: Omit<Bill, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<Bill>('/bills', data);

// Reviews
export const getReviews = (productId?: number) => 
  api.get<Review[]>('/reviews', { params: productId ? { product_id: productId } : {} });
export const createReview = (data: Omit<Review, 'id_key' | 'created_at' | 'updated_at'>) => 
  api.post<Review>('/reviews', data);
export const deleteReview = (id_key: number) => api.delete(`/reviews/${id_key}`);

export default api;