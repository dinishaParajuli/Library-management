import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="  bg-[#fdfaf6] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-[#3e2c1c] mb-6">
          Login
        </h1>
        {err && <p className="text-center text-red-600 mb-4">{err}</p>}
        <form onSubmit={submit} className="space-y-5">
          <h2 className="text-xl font-semibold text-[#3e2c1c]">Welcome Back</h2>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-[#d4c4b3] focus:outline-none focus:ring-2 focus:ring-[#7b4b2a] focus:border-[#7b4b2a]"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-2 rounded-md border border-[#d4c4b3] focus:outline-none focus:ring-2 focus:ring-[#7b4b2a] focus:border-[#7b4b2a]"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[#7b4b2a] text-white font-medium hover:bg-[#5c3620] transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          <Link
            to="/forgot-password"
            className="text-[#7b4b2a] hover:underline"
          >
            Forgot password?
          </Link>
          <span className="text-[#5e4632]">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#7b4b2a] font-medium hover:underline"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}