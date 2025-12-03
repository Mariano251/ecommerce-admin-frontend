import axios from 'axios';
import type { Product, Category, Client, Order, Address, OrderDetail, Bill, Review } from '../types';

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
export const updateCategory = (id: number, data: Partial<Category>) => 
  api.put<Category>(`/categories/${id}`, data);
export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);

// Clients
export const getClients = () => api.get<Client[]>('/clients');
export const getClient = (id: number) => api.get<Client>(`/clients/${id}`);
export const createClient = (data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => 
  api.post<Client>('/clients', data);
export const updateClient = (id: number, data: Partial<Client>) => 
  api.put<Client>(`/clients/${id}`, data);
export const deleteClient = (id: number) => api.delete(`/clients/${id}`);

// Addresses
export const getAddresses = (clientId?: number) => 
  api.get<Address[]>('/addresses', { params: clientId ? { client_id: clientId } : {} });
export const createAddress = (data: Omit<Address, 'id' | 'created_at' | 'updated_at'>) => 
  api.post<Address>('/addresses', data);
export const deleteAddress = (id: number) => api.delete(`/addresses/${id}`);

// Orders
export const getOrders = () => api.get<Order[]>('/orders');
export const getOrder = (id: number) => api.get<Order>(`/orders/${id}`);
export const createOrder = (data: Omit<Order, 'id' | 'date' | 'created_at' | 'updated_at'>) => 
  api.post<Order>('/orders', data);
export const updateOrder = (id: number, data: Partial<Order>) => 
  api.put<Order>(`/orders/${id}`, data);
export const updateOrderStatus = (id: number, status: string) => 
  api.put(`/orders/${id}`, { status });

// Order Details
export const getOrderDetails = (orderId: number) => 
  api.get<OrderDetail[]>('/order_details', { params: { order_id: orderId } });
export const createOrderDetail = (data: Omit<OrderDetail, 'id' | 'created_at' | 'updated_at'>) => 
  api.post<OrderDetail>('/order_details', data);

// Bills
export const getBills = (orderId?: number) => 
  api.get<Bill[]>('/bills', { params: orderId ? { order_id: orderId } : {} });
export const getBill = (id: number) => api.get<Bill>(`/bills/${id}`);
export const createBill = (data: Omit<Bill, 'id' | 'date' | 'created_at' | 'updated_at'>) => 
  api.post<Bill>('/bills', data);

// Reviews
export const getReviews = (productId?: number) => 
  api.get<Review[]>('/reviews', { params: productId ? { product_id: productId } : {} });
export const createReview = (data: Omit<Review, 'id' | 'created_at' | 'updated_at'>) => 
  api.post<Review>('/reviews', data);
export const deleteReview = (id: number) => api.delete(`/reviews/${id}`);

export default api;