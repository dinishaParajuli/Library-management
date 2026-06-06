import { Router } from "express";
import { createLibrarian } from "../controllers/auth.controller.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = Router();

// Admin-only route to create librarians
router.post("/", protect, restrictTo("admin"), createLibrarian);

export default router;
