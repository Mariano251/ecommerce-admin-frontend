import { create } from 'zustand';
import type { Product, Category, Client, Order, DashboardStats } from '../types';

interface StoreState {
  // Data
  products: Product[];
  categories: Category[];
  clients: Client[];
  orders: Order[];
  stats: DashboardStats | null;
  
  // Loading states
  loading: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setClients: (clients: Client[]) => void;
  setOrders: (orders: Order[]) => void;
  setStats: (stats: DashboardStats) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Initial state
  products: [],
  categories: [],
  clients: [],
  orders: [],
  stats: null,
  loading: false,
  
  // Actions
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setClients: (clients) => set({ clients }),
  setOrders: (orders) => set({ orders }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),
}));