import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("DB Connected");
};
