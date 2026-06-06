import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", isbn: "", quantity: 1 });
  const [activeView, setActiveView] = useState("dashboard");
  const [editing, setEditing] = useState(null); // store book being edited

  const load = async () => {
    const [b, r] = await Promise.all([api.get("/books"), api.get("/borrow")]);
    setBooks(b.data);
    setBorrows(r.data);
  };

  useEffect(() => {
    load();
  }, []);

  const createBook = async (e) => {
    e.preventDefault();
    try {
      await api.post("/books", { ...form, quantity: Number(form.quantity) });
      setForm({ title: "", author: "", isbn: "", quantity: 1 });
      await load();
      alert("Book added successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add book");
    }
  };

  const remove = async (id) => {
    if (window.confirm("Delete this book?")) {
      await api.delete(`/books/${id}`);
      await load();
    }
  };

  const update = async (id, data) => {
    try {
      await api.put(`/books/${id}`, { ...data, quantity: Number(data.quantity) });
      await load();
      setEditing(null);
      alert("Book updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update book");
    }
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "add-book", label: "Add Book" },
    { id: "update-books", label: "Update Books" },
    { id: "book-list", label: "Book List" },
    { id: "user-list", label: "User List" },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brown-800">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-beige-200 p-4 rounded shadow">
                <p className="text-sm text-brown-700">Total Books</p>
                <p className="text-xl font-bold">{books.length}</p>
              </div>
              <div className="bg-beige-200 p-4 rounded shadow">
                <p className="text-sm text-brown-700">Borrow Records</p>
                <p className="text-xl font-bold">{borrows.length}</p>
              </div>
            </div>
          </div>
        );

      case "add-book":
        return (
          <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Book</h2>
            <form onSubmit={createBook} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="ISBN"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-[#7b4b2a] text-white hover:bg-[#5c3620] transition"
              >
                Add Book
              </button>
            </form>
          </div>
        );

     case "update-books":
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-brown-800">Update Books</h2>
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-beige-200">
          <tr>
            <th className="px-3 py-2 text-left">Title</th>
            <th className="px-3 py-2 text-left">Author</th>
            <th className="px-3 py-2 text-left">Available</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id} className="border-b">
              {/* Title */}
              <td className="px-3 py-2">
                {editing?._id === b._id ? (
                  <input
                    type="text"
                    value={editing.title}
                    onChange={(e) =>
                      setEditing({ ...editing, title: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  b.title
                )}
              </td>

              {/* Author */}
              <td className="px-3 py-2">
                {editing?._id === b._id ? (
                  <input
                    type="text"
                    value={editing.author}
                    onChange={(e) =>
                      setEditing({ ...editing, author: e.target.value })
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  b.author
                )}
              </td>

              {/* Quantity */}
              <td className="px-3 py-2">
                {editing?._id === b._id ? (
                  <input
                    type="number"
                    value={editing.quantity}
                    onChange={(e) =>
                      setEditing({ ...editing, quantity: Number(e.target.value) })
                    }
                    className="w-20 border rounded px-2 py-1"
                    min="1"
                  />
                ) : (
                  `${b.available}/${b.quantity}`
                )}
              </td>

              {/* Actions */}
              <td className="px-3 py-2 text-center space-x-2">
                {editing?._id === b._id ? (
                  <>
                    <button
                      onClick={() => update(editing._id, editing)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditing(b)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(b._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


      case "book-list":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brown-800">Book List</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((b) => (
                <div
                  key={b._id}
                  className="border rounded p-4 bg-white shadow"
                >
                  <h3 className="font-semibold">{b.title}</h3>
                  <p className="text-sm text-gray-600">by {b.author}</p>
                  <p className="text-xs">ISBN: {b.isbn}</p>
                  <p className="mt-2 text-sm">
                    Available: {b.available}/{b.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "user-list":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-brown-800">
              Borrow Records
            </h2>
            <ul className="space-y-2">
              {borrows.map((r) => (
                <li
                  key={r._id}
                  className="border rounded p-3 bg-white shadow"
                >
                  <p>
                    <b>{r.userId?.name}</b> borrowed{" "}
                    <b>{r.bookId?.title}</b>
                  </p>
                  <p className="text-sm text-gray-600">
                    on {new Date(r.borrowDate).toLocaleDateString()}{" "}
                    {r.returnDate
                      ? `(returned ${new Date(
                          r.returnDate
                        ).toLocaleDateString()})`
                      : "(not returned)"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen bg-beige-50">
      {/* Sidebar */}
      <div className="w-64 bg-beige-200 shadow-md flex flex-col">
        <div className="p-4 border-b border-beige-300">
          <h1 className="text-xl font-bold text-brown-800">Library System</h1>
        </div>
        <nav className="flex-1 mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full text-left px-4 py-2 hover:bg-beige-300 ${
                activeView === item.id
                  ? "bg-brown-100 text-brown-800 font-semibold"
                  : "text-brown-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
    </div>
  );
}
