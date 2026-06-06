import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function MyBooks() {
  const { user } = useContext(AuthContext);
  const [borrows, setBorrows] = useState([]);

  // Load borrowed books
  const loadBorrows = async () => {
    try {
      const res = await api.get("/borrow/my"); // your backend route
      console.log('Response from /borrow/my:', res.data); // Debug log
      setBorrows(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Return a book
  const handleReturn = async (borrowId) => {
    try {
      await api.post("/borrow/return", { borrowId });
      alert("Book returned successfully!");
      loadBorrows();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Return failed");
    }
  };

  useEffect(() => {
    loadBorrows();
  }, []);

  return (
    <div className="p-6 bg-[#f8f4ec] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#3e2c1c]">My Borrowed Books</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-[#e4d6c5] text-[#3e2c1c]">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Borrow Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((b) => (
              <tr key={b._id} className="border-b last:border-b-0">
                <td className="py-2 px-4">{b.bookId.title}</td>
                <td className="py-2 px-4">{b.bookId.author}</td>
                <td className="py-2 px-4">{new Date(b.borrowDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  {b.returnDate ? (
                    <span className="text-green-600 font-semibold">Returned</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Borrowed</span>
                  )}
                </td>
                <td className="py-2 px-4">
                  {!b.returnDate && (
                    <button
                      onClick={() => handleReturn(b._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {borrows.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
