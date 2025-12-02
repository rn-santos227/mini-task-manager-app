import { connect } from "mongoose";

async function connectDB() {
  try {
    await connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  }
}

export default connectDB;
