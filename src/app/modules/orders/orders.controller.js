

import { Order } from "./orders.model.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    console.log(newOrder)
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Order placement failed",
      error: err.message,
    });
  }
};

// Get current user's orders
export const getMyOrders = async (req, res) => {
  try {

    console.log('req.user.id is -->',req.user.id);

    ///  Todo : 
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch order",
      error: err.message,
    });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update order status",
      error: err.message,
    });
  }
};
