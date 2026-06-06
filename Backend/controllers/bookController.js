import Book from "../models/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity } = req.body;

    // Check required fields
    if (!title || !author || !isbn || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure quantity is a number >= 0
    const qty = Number(quantity);
    if (isNaN(qty) || qty < 0) {
      return res.status(400).json({ message: "Quantity must be a number >= 0" });
    }

    // Check duplicate ISBN
    const exists = await Book.findOne({ isbn });
    if (exists) {
      return res.status(409).json({ message: "ISBN already exists" });
    }

    // Create book
    const book = await Book.create({
      title,
      author,
      isbn,
      quantity: qty,
      available: qty,
    });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating book:", err); // log real error
    res.status(500).json({ message: "Server error" });
  }
};

export const listBooks = async (_req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
};

export const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Not found" });
  res.json(book);
};

export const updateBook = async (req, res) => {
  try {
    const { title, author, quantity } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });

    if (quantity != null) {
      if (quantity < 0)
        return res.status(400).json({ message: "Quantity must be >= 0" });
      // adjust available relative to total if needed
      const diff = quantity - book.quantity;
      book.available = Math.max(0, book.available + diff);
      book.quantity = quantity;
    }
    if (title) book.title = title;
    if (author) book.author = author;

    await book.save();
    res.json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
