import { Router } from "express";
import * as budgetController from "../controller/budget.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = Router();

router.get("/", protect, budgetController._getAllBudget);
router.post("/", protect, budgetController._createBudget);
router.put("/:id", protect, budgetController._updateBudget);
router.delete("/:id", protect, budgetController._deleteBudget);

export default router;
