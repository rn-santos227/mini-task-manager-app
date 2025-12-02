require("dotenv").config();

import connectDB from "./config/db";
import app from "./app";

const PORT = process.env.PORT || 5000;
connectDB();

app.liste(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
