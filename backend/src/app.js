import express from "express";
import cors from "cors";

import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./features/auth/auth.routes.js";
import taskRoutes from "./features/tasks/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
