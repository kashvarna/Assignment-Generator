import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, loading } = useContext(Auth); // ✅ FIX

  const navigate = useNavigate();

  if (loading) return null; // ⛔ wait until auth loads

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
          AssignAI
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-blue-600 transition">
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 transition">
                Dashboard
              </Link>

              <Link
                to="/create-assignment"
                className="hover:text-blue-600 transition"
              >
                Create Assignment
              </Link>

              {user.role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  className="hover:text-blue-600 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;