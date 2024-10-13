import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

// Load biến môi trường
dotenv.config();

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
