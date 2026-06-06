import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Register() {
  const nav = useNavigate();
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "borrower" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6]">
      <div className="bg-white shadow-lg rounded-2xl flex max-w-4xl w-full overflow-hidden">
        
        {/* Left Illustration */}
        <div className="w-1/2 bg-beige-200 flex items-center justify-center p-8">
          <img
            src="/Register.jpg"
            alt="image"
            className="max-w-sm"
          />
        </div>

        {/* Right Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-brown-700">Welcome!</h2>
          <p className="text-sm text-brown-500 mb-6">Sign up to continue</p>
          {err && <p className="text-red-600 mb-3">{err}</p>}

          <form onSubmit={submit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-brown-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full border border-brown-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full border border-brown-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />

            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full border border-brown-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brown-400 bg-white"
            >
              <option value="borrower">Borrower</option>
              <option value="librarian">Librarian</option>
            </select>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 text-brown-600" />
              <span className="text-sm text-brown-600">Remember me</span>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-[#7b4b2a] py-2 rounded-lg shadow-md hover:bg-[#5c3620] transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-brown-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brown-700 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
