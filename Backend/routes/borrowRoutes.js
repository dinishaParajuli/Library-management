import { Router } from "express";
import { borrowBook, listBorrows, returnBook } from "../controllers/borrowController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { listMyBorrows } from "../controllers/borrowController.js";

const router = Router();

router.post("/", protect, borrowBook);
router.post("/return", protect, returnBook);
router.get("/", protect, restrictTo("librarian"), listBorrows);
router.get("/my", protect, listMyBorrows);
export default router;
