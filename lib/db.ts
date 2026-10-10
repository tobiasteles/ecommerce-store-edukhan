/**
 * Database utility functions for common queries
 */
import prisma from "@/lib/prisma";
import { Product, Category, Order, User } from "@prisma/client";

// ========== PRODUCTS ==========

export async function getProducts(skip = 0, take = 10) {
  return prisma.product.findMany({
    skip,
    take,
    include: {
      category: true,
      reviews: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: { user: true },
      },
    },
  });
}

export async function getProductsByCategory(categoryId: string) {
  return prisma.product.findMany({
    where: { categoryId },
    include: { category: true },
  });
}

export async function searchProducts(query: string) {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { category: true },
  });
}

// ========== CATEGORIES ==========

export async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { products: true },
  });
}

// ========== USERS ==========

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      addresses: true,
      orders: true,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
      timeline: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ========== ORDERS ==========

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: {
        include: { product: true },
      },
      timeline: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function createOrder(
  userId: string,
  data: {
    totalPrice: number;
    shippingAddress: string;
    billingAddress?: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
      options?: string;
    }>;
  }
) {
  return prisma.order.create({
    data: {
      userId,
      totalPrice: data.totalPrice,
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      items: {
        create: data.items,
      },
      timeline: {
        create: {
          status: "PENDING",
          message: "Order created successfully",
        },
      },
    },
    include: {
      items: {
        include: { product: true },
      },
      timeline: true,
    },
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED",
  message?: string
) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      status,
      timeline: {
        create: {
          status,
          message,
        },
      },
    },
    include: {
      timeline: true,
    },
  });
}

// ========== CART ==========

export async function getUserCart(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { cart: true },
      },
    },
  });
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  options?: string
) {
  // Get or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // Add item to cart
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
      options,
    },
  });
}

export async function removeFromCart(cartItemId: string) {
  return prisma.cartItem.delete({
    where: { id: cartItemId },
  });
}

export async function clearCart(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (cart) {
    return prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
}

// ========== REVIEWS ==========

export async function getProductReviews(productId: string) {
  return prisma.review.findMany({
    where: { productId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(
  productId: string,
  userId: string,
  rating: number,
  comment: string
) {
  return prisma.review.create({
    data: {
      productId,
      userId,
      rating,
      comment,
    },
    include: { user: true },
  });
}

// ========== BANNERS ==========

export async function getActiveBanners() {
  return prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
}

// ========== STATS ==========

export async function getDatabaseStats() {
  const [users, products, orders, categories] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
    prisma.category.count(),
  ]);

  return {
    users,
    products,
    orders,
    categories,
  };
}
