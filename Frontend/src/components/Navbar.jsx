import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-[#e9decf] shadow-md border-b border-[#d6c2a8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#3e2c1c]"
        >
          BookLOVE
        </Link>

        {/* Center: Links */}
        <div className="flex items-center space-x-6">
          {["Home", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-[#5e4632] hover:text-[#7b4b2a] font-medium transition"
            >
              {item}
            </Link>
          ))}
          {user?.role === "librarian" && (
            <Link
              to="/dashboard"
              className="text-[#5e4632] hover:text-[#7b4b2a] font-medium transition"
            >
              Dashboard
            </Link>
          )}
          {user?.role === "borrower" && (
            <Link
              to="/mybooks"
              className="text-[#5e4632] hover:text-[#7b4b2a] font-medium transition"
            >
              My Books
            </Link>
          )}
        </div>

          {/* Auth / Profile */}
          {user ? (
            <div className="flex items-center space-x-3">
              {/* Avatar - clickable */}
              <Link to="/profile" className="w-9 h-9 flex items-center justify-center bg-[#7b4b2a] text-white rounded-full font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7b4b2a]" title="Profile">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </Link>
              {/* Logout */}
              <button
                onClick={logout}
                className="px-4 py-1 rounded-full bg-[#7b4b2a] text-white hover:bg-[#5c3620] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              {/* <Link
                to="/login"
                className="px-4 py-1 rounded-full text-[#3e2c1c] hover:bg-[#e4d6c5] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1 rounded-full bg-[#7b4b2a] text-white hover:bg-[#5c3620] transition"
              >
                Register
              </Link> */}
            </>
          )}
        </div>
    </nav>
  );
}
