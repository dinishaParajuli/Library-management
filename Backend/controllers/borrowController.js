export const listBorrows = async (_req, res) => {
  const borrows = await Borrow.find()
    .populate("userId", "name email")
    .populate("bookId", "title author isbn");
  res.json(borrows);
};
import Borrow from "../models/Borrow.js";
import Book from "../models/Book.js";

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ message: "bookId is required" });
    }
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.available <= 0) return res.status(400).json({ message: "No copies available" });

    const active = await Borrow.findOne({ userId: req.user.id, bookId, returnDate: null });
    if (active) return res.status(400).json({ message: "You already borrowed this book" });

    const borrow = await Borrow.create({ userId: req.user.id, bookId, borrowDate: new Date(), returnDate: null });
    book.available -= 1;
    await book.save();
    res.status(201).json(borrow);
  } catch (err) {
    console.error("Error in borrowBook:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const returnBook = async (req, res) => {
  const { borrowId } = req.body;
  const record = await Borrow.findById(borrowId);
  if (!record || record.returnDate) return res.status(400).json({ message: "Invalid borrow record" });

  record.returnDate = new Date();
  await record.save();

  const book = await Book.findById(record.bookId);
  if (book) {
    book.available += 1;
    await book.save();
  }
  res.json({ message: "Returned", record });
};

export const listMyBorrows = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const borrows = await Borrow.find({ userId: req.user.id })
    .populate("userId", "name email")
    .populate("bookId", "title author isbn");
  res.json(borrows);
};
