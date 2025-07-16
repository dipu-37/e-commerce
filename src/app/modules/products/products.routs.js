import { upload } from '../../utils/sendImageToCloudinary.js';
import { auth } from '../middleware/auth.js';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from './products.controller.js';

import express from 'express'; 


const router = express.Router();

// GET /api/products - Get all products (with filter, pagination, search)
router.get("/", getProducts);

// GET /api/products/:id - Get product by ID
router.get("/:id", getProductById);

// POST https://e-commerce-1-jztd.onrender.com/api/v1/products/ (admin only)
router.post("/create-product",upload.single('file'),auth('admin') ,createProduct);

// PUT /api/products/:id - Update a product (admin only)
router.put("/:id", updateProduct);

// DELETE /api/products/:id - Delete a product (admin only)
router.delete("/:id", deleteProduct);

export const productRoutes = router;