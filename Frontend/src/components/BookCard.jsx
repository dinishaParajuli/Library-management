export default function BookCard({ book, onBorrow, onReturn }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition transform duration-200 w-64 flex flex-col justify-between">
      {/* Book Details */}
      <div>
        <h3 className="text-xl font-bold text-brown-800 mb-1 hover:underline cursor-pointer">
          {book.title}
        </h3>
        <p className="text-gray-700 font-medium">{book.author}</p>
        <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>

        {/* Availability */}
        <p className="text-sm text-gray-600 mt-2">
          Available:{" "}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              book.available > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {book.available} / {book.quantity}
          </span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        {onBorrow && (
          <button
            disabled={book.available <= 0}
            onClick={() => onBorrow(book._id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition shadow 
          ${
            book.available > 0
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
          }`}
          >
            Borrow
          </button>
        )}
      </div>
    </div>
  );
}
