import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (errors) {
    return Promise.reject(errors.message);
  }
};

export default connectMongo;
