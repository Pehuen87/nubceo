import mongoose from 'mongoose';
import { generateDB } from '../helpers/mock';

async function connectToDatabase() {
    

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
  

  //MOCK DATABASE
  generateDB();
}

export { connectToDatabase };