import { Router } from "express";
import * as expenseController from "../controller/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = Router();

router.get("/", protect, expenseController._getAllExpenses);
router.post("/", protect, expenseController._createExpense);
router.put("/:id", protect, expenseController._updateExpense);
router.delete("/:id", protect, expenseController._deleteExpense);

export default router;
