import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/blogdb?authSource=admin", {
    user: 'root',
    pass: 'password',

  })
  console.log("MongoDB connected")
}
export default connectDB