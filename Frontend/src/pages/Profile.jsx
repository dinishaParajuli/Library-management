import { useContext, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [msg, setMsg] = useState("");

  const save = async (e) => {
    e.preventDefault();
    await api.put("/auth/me", form);
    setMsg("Profile Updated Successfully");
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-6 py-8 shadow-lg rounded-xl bg-[#fdfaf6]">
      <h1 className="text-2xl font-bold text-[#3e2c1c] mb-6 text-center">Profile</h1>

      {/* Flex container instead of grid */}
      <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-6 md:space-y-0">
        
        {/* Left Side - Smaller Image */}
        <div className="flex justify-center md:justify-start">
          <img
            src="/profile.jpg"
            alt="Profile banner"
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-md"
          />
        </div>

        {/* Right Side - Smaller Form */}
        <div className="flex-1">
          {msg && (
            <p className="mb-4 text-green-600 font-medium bg-green-50 p-2 rounded-md border border-green-200 text-center text-sm">
              {msg}
            </p>
          )}

          <form onSubmit={save} className="space-y-4 max-w-sm">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 text-sm"
                placeholder="Enter your email"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className=" w-[380px] py-2 rounded-md bg-[#7b4b2a] text-white hover:bg-[#5c3620] transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
