import { Router } from "express";
import { _getSummary } from "../controller/summary.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/",protect, _getSummary);

export default router;
