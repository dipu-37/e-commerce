import { User } from "../user/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import 'dotenv/config'



// Register User
export const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this email',
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
  
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: newUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: err.message,
      });
    }
  };



export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password)
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }
      const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '7d' }
      );
  
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '365d' }
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      console.log(accessToken)
  
      res.status(200).json({
        success: true,
        message: 'Login successful',
        accessToken,
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: err.message,
      });
    }
  };
  

  // Get current user profile
export const getProfile = async (req, res) => {
    try {
        console.log(req.user.id)
      const user = await User.findById(req.user.id);
      console.log(user)
      res.status(200).json({
        success: true,
        message: 'User profile fetched successfully',
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Failed to fetch profile',
        error: err.message,
      });
    }
  };
  

  // Refresh Token
export const refreshToken = async (req, res) => {
    try {
      const token = req.cookies.refreshToken;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Refresh token missing',
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '7d' }
      );
  
      res.status(200).json({
        success: true,
        message: 'Access token refreshed',
        accessToken,
      });
    } catch (err) {
      res.status(403).json({
        success: false,
        message: 'Invalid refresh token',
        error: err.message,
      });
    }
  };
  
  // Logout
  export const logoutUser = (req, res) => {
    res.clearCookie('refreshToken');
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  };
  