import { Router } from "express";
import * as authController from "../controller/auth.controller.js";

const router = Router();

router.post("/register", authController._register);
router.post("/login", authController._login);
router.post("/logout", authController._logout);

export default router;
