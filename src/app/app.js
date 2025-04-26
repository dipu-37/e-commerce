import express from 'express'; 
import mongoose from 'mongoose'; 
import cors from 'cors';
import { userRouts } from './modules/user/user.routes.js'; 
import { productRoutes } from './modules/products/products.routs.js';
import { orderRoutes } from './modules/orders/orders.routs.js';
import { reviewRoutes } from './modules/reviews/reviews.routes.js';
import { AuthRoutes } from './modules/auth/auth.routes.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config'




const app = express();
app.use(cookieParser())

const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is my first project');
});

// Routes
app.use('/api/v1/users', userRouts);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/auth', AuthRoutes);


// Database connect
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Database connected successfully');
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
