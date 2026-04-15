import express from 'express';
import authRoutes from "./route/auth.route.js";
import expenseRoutes from "./route/expense.route.js"
import { errorLogger } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());

// all app route
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

//error logger
app.use(errorLogger);

export default app;
