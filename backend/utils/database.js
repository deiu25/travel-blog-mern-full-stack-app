import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDatabase = () => {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Successfully connected to MongoDB`);
    })
    .catch((err) => console.log(err));
};

export default connectDatabase;