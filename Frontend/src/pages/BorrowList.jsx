export default function BorrowList({ borrows, onReturn }) {  // ✅ onReturn added
  return (
    <div className="space-y-3">
      {borrows.map((r) => (
        <div key={r._id} className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
          <p className="text-gray-900 font-medium">{r.bookId?.title}</p>
          {!r.returnDate && (
            <button
              onClick={() => onReturn(r._id)} // ✅ now onReturn exists
              className="mt-3 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Return
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
