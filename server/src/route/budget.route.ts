import { Router } from "express";
import * as budgetController from "../controller/budget.controller.js";


const router = Router();

router.get("/", budgetController._getAllBudget);
router.post("/", budgetController._createBudget);
router.put("/:id", budgetController._updateBudget);
router.delete("/:id", budgetController._deleteBudget);

export default router;
