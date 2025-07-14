import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors';
import { userRouts } from './modules/user/user.routes.js'; 
import { productRoutes } from './modules/products/products.routs.js';
import { orderRoutes } from './modules/orders/orders.routs.js';
import { reviewRoutes } from './modules/reviews/reviews.routes.js';
import { AuthRoutes } from './modules/auth/auth.routes.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: ['https://ecommerce-dipu-client-1.onrender.com', 'http://localhost:5173'], // 🔁 Replace with your frontend Vercel URL
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('This is my first project on Vercel!');
});

// Routes
app.use('/api/v1/users', userRouts);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/auth', AuthRoutes);

// MongoDB connection
let isConnected = false;
async function main() {
  try {
    if (!isConnected) {
      await mongoose.connect(process.env.MONGODB_URL);
      isConnected = true;
      console.log('✅ Database connected');
       app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`);
 });
    }
  } catch (error) {
    console.error('❌ MongoDB error:', error.message);
  }
}
main();

export default app;
