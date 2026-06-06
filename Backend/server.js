import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import librarianRoutes from "./routes/librarianRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*", // allow everything for now
  credentials: true,
}));

app.use(morgan("dev"));

app.get("/", (_req, res) => res.send("LBMS API running"));
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);
app.use("/admin/librarian", librarianRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API on http://localhost:${port}`));
