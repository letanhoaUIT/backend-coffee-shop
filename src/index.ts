import express, { Application, Request, Response } from 'express';

// Khởi tạo ứng dụng Express
const app: Application = express();

// Cài đặt port
const port: number = 3000;

// Middleware để parse JSON
app.use(express.json());

// Route cơ bản
app.get('/', (req: Request, res: Response): void => {
  res.send('Hello, TypeScript with Express!');
});

// Khởi động server
app.listen(port, (): void => {
  console.log(`Server is running on http://localhost:${port}`);
});
