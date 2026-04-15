import { Router } from "express";
import * as authController from "../controller/auth.controller.js";
import { validate } from "../middleware/validate.middlleware.js";
import { userSchema } from "../validations/user.js";

const router = Router();

router.post("/register",validate(userSchema), authController._register);
router.post("/login", authController._login);
router.post("/logout", authController._logout);

export default router;
