import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the MongoDB URI from the environment variables
const MONGO_URI: string = process.env.MONGO_URI || '';

export const connectDB = async (): Promise<void> => {
  try {
    // Connect to MongoDB using the URI
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};
