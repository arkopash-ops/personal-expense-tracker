import { Router } from "express";
import * as expenseController from "../controller/expense.controller.js";


const router = Router();

router.get("/", expenseController._getAllExpenses);
router.post("/", expenseController._createExpense);
router.put("/:id", expenseController._updateExpense);
router.delete("/:id", expenseController._deleteExpense);

export default router;
