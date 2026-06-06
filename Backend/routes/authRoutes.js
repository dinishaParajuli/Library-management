import { Router } from "express";
import { login, me, register, updateProfile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.put("/me", protect, updateProfile);


export default router;
