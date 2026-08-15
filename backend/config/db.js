import mongoose from 'mongoose';

/**
 * Connect to MongoDB instance using mongoose and environment URI
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined in .env');
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] MongoDB Connection Failed: ${error.message}`);
    // Log helpful diagnostic tip if connection fails
    if (error.message.includes('ECONNREFUSED')) {
      console.error('[Database Tip] Ensure local MongoDB daemon (mongod) is running or check your MONGODB_URI setting in .env');
    }
  }
};

export default connectDB;
