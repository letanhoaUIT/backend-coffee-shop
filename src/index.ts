import express, { Application } from 'express';
import { connectDB } from './config/database'; // Import the MongoDB connection
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB with Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
