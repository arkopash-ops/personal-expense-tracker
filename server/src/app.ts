import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from "./route/auth.route.js";
import expenseRoutes from "./route/expense.route.js"
import budgetRoutes from "./route/budget.route.js"

import { errorLogger } from './middleware/error.middleware.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser())

// all app route
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);

//error logger
app.use(errorLogger);

export default app;
