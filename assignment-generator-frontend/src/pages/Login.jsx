import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Auth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const { login } = useContext(Auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, role }
      );

      const userData = res.data.user;

      console.log("LOGIN USER:", userData);

      // ✅ Save in context + localStorage
      login(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login Successful 🚀");

      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-blue-700 text-white p-10">
          <h2 className="text-4xl font-extrabold leading-tight">
            Welcome Back to AssignAI
          </h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Log in to generate AI-powered coding assignments, attempt MCQs,
            and track your performance from your dashboard.
          </p>

          <div className="mt-8 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl">
              <h3 className="font-semibold">✔ Multi-language Assignments</h3>
              <p className="text-sm text-blue-100 mt-1">
                Java, Python, HTML, CSS and more.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              <h3 className="font-semibold">✔ Role-Based Access</h3>
              <p className="text-sm text-blue-100 mt-1">
                Separate access for users and admins.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 md:p-12 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue your learning journey
          </p>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Role
            </label>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-50 transition">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={handleChange}
                />
                <span>User</span>
              </label>

              <label className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-50 transition">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700"
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;