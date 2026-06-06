import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import BookCard from "../components/BookCard";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // Load books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  // Borrow book
  const borrow = async (bookId) => {
    try {
      await api.post("/borrow", { bookId });
      const res = await api.get("/books");
      setBooks(res.data);
      alert("Book borrowed successfully!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Borrow failed");
    }
  };

  // Filter books live based on search input
  const filteredBooks = books.filter((book) =>
    (book.title + " " + book.author)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f8f4ec] min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
        <div className="flex-1 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3e2c1c] mb-4">
            Timeless Knowledge, Endless Stories
          </h1>
          <p className="text-lg text-[#5e4632] mb-6">
            Explore our curated collection of books, carefully selected to
            inspire, educate, and entertain.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-md bg-[#7b4b2a] text-white hover:bg-[#5c3620] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-md border border-[#7b4b2a] text-[#7b4b2a] hover:bg-[#7b4b2a] hover:text-white transition"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/beige.jpg"
            alt="Library Hero"
            className="rounded-lg shadow-lg w-80 md:w-[28rem] object-cover"
          />
        </div>
      </div>

      {/* Separator Info Bar */}
      <div className="flex justify-center flex-wrap bg-[#e4d6c5] text-[#3e2c1c] py-3 text-sm font-medium">
        <span>A digital shelf of knowledge, always within reach.</span>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
  <div className="relative w-full max-w-xl">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7b4b2a] text-lg">
      🔍
    </span>
    <input
      type="text"
      placeholder="Search books..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-white border border-[#7b4b2a] rounded-full px-12 py-3 text-sm text-[#3e2c1c] placeholder-[#7b6a58] shadow-md focus:ring-2 focus:ring-[#7b4b2a] focus:border-[#7b4b2a] transition duration-300 outline-none"
    />
  </div>
</div>


      {/* Featured Books */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-[#3e2c1c] mb-10">
          Featured Books
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onBorrow={user ? borrow : undefined}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center w-full">No books found.</p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-20 py-16">
        <div className="flex-1 flex justify-center">
          <img
            src="/about.jpg"
            alt="About Us"
            className="rounded-lg shadow-lg w-80 md:w-[28rem] object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-[#3e2c1c] mb-4">Our Story</h3>
          <p className="text-[#5e4632] mb-6">
            We believe that every book holds the power to inspire and transform.
            Our mission is to provide readers with access to timeless classics
            and modern masterpieces alike, creating a community of lifelong
            learners.
          </p>
          <button className="px-5 py-2 rounded-md border border-[#7b4b2a] text-[#7b4b2a] hover:bg-[#7b4b2a] hover:text-white transition">
            <Link
              to="/about"
          
            >
              Learn More
            </Link>
            </button>
        </div>
      </section>
    </div>
  );
}
