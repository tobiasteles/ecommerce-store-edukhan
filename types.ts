/**
 * Global Type Definitions
 * Centralized type definitions for the application
 */

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  rating?: number;
  reviews?: Review[];
  createdAt?: string;
  updatedAt?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: string;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

// Filter Types
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  sortBy?: "relevance" | "price-low" | "price-high" | "newest" | "rating";
  page?: number;
  limit?: number;
}

// Pagination Types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "digital_wallet" | "bank_transfer";
  last4?: string;
  isDefault?: boolean;
}

// Notification Types
export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

// Error Types
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}
