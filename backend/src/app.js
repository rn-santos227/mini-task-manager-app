import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./features/auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
