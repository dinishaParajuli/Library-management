import { Router } from "express";
import { createBook, deleteBook, getBook, listBooks, updateBook } from "../controllers/bookController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", protect, restrictTo("librarian"), createBook);
router.put("/:id", protect, restrictTo("librarian"), updateBook);
router.delete("/:id", protect, restrictTo("librarian"), deleteBook);

export default router;
