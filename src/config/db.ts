import mongoose from 'mongoose';
import 'dotenv/config';

// Connection
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL as string);
    console.log(`MONGODB Connected:-> ${connect.connection.host} `);
  } catch (error) {
    console.log('MONGODB Connection Error');
    process.exit(1);
  }
};

export default connectDB;
