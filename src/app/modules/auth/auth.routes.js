

import  express  from 'express';
import { getProfile, loginUser, logoutUser, refreshToken, registerUser } from './auth.controller.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth('user','admin',), getProfile);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);

export const AuthRoutes = router;