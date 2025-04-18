import QueryBuilder from "../../utils/QueryBuilder.js";
import { Product } from "./products.model.js";


// Create a product (admin only)
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log(newProduct)
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Product creation failed",
      error: err.message
    });
  }
};

// Get all products (with search, filter, pagination)
export const getProducts = async (req, res) => {
  try {
    const searchableFields = ['name', 'category'];
    const queryBuilder = new QueryBuilder(Product.find(), req.query)
      .search(searchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();

    const products = await queryBuilder.modelQuery;
    const pagination = await queryBuilder.countTotal();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      meta: pagination
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err.message
    });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Error fetching product",
      error: err.message
    });
  }
};

// Update product (admin only)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: err.message
    });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Failed to delete product",
      error: err.message
    });
  }
};
