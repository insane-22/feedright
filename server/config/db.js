import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`ERROR! ${error}`);
  }
};

export default connectDB;