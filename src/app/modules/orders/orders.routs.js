


import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "./orders.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/orders - Place new order
router.post("/", createOrder);

// GET /api/orders/my - Get current user's orders
router.get("/my",auth('user','admin'), getMyOrders);

// GET /api/orders/all - Admin: Get all orders
router.get("/all", getAllOrders);

// GET /api/orders/:id - Get order by ID
router.get("/:id", getOrderById);

// PUT /api/orders/:id/status - Admin: Update order status
router.put("/:id/status", updateOrderStatus);

export const orderRoutes = router;
