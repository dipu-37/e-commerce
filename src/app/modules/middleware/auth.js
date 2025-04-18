// middleware/auth.js
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { User } from "../user/user.model.js";

export const auth = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, no token',
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found',
        });
      }

      // Role checking
      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
      ) {
        return res.status(403).json({
          success: false,
          message: `Access denied for role: ${user.role}`,
        });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed',
        error: err.message,
      });
    }
  };
};
