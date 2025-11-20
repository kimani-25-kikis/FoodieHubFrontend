import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../features/slice/AuthSlice";
import type { RootState } from "../store/store";
import { ChevronDown, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const [confirmLogout, setConfirmLogout] = useState(false);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  const navLink = (to: string, label: string) => (
    <li>
      <Link
        to={to}
        className={`
          px-4 py-2 rounded-xl font-semibold transition-all
          ${
            location.pathname === to
              ? "text-rose-700 bg-rose-100 shadow-sm"
              : "text-rose-600 hover:text-rose-800 hover:bg-rose-50"
          }
        `}
      >
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <nav
        className="
        navbar sticky top-0 z-50
        bg-white/95 backdrop-blur-md
        shadow-md px-6 py-4
        text-rose-700
        border-b border-rose-100
      "
      >
        {/* LEFT — Brand + Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-rose-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="
              menu menu-sm dropdown-content mt-3 z-20 w-52 p-2
              rounded-xl bg-white/95 backdrop-blur-md
              text-rose-700 shadow-lg border border-rose-100
            "
            >
              <Link to="/"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors duration-200">Home</li></Link>
              <Link to="/meals"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors duration-200">Meals</li></Link>
              <Link to="/dashboard"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors duration-200">Dashboard</li></Link>
              <Link to="/about"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors duration-200">About</li></Link>
              <Link to="/contact"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors duration-200">Contact</li></Link>
              {!isAuthenticated && (
                <Link to="/register"><li className="text-white btn bg-rose-700 hover:bg-rose-800 rounded-md transition-colors duration-200">Register</li></Link>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide flex items-center gap-2 text-rose-700 hover:bg-transparent"
          >
            🍽️ FoodieHub
          </Link>
        </div>

        {/* CENTER — Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <Link to="/"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Home</li></Link>
            <Link to="/meals"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Meals</li></Link>
            <Link to="/dashboard"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Dashboard</li></Link>
            <Link to="/about"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 font-medium px-4 py-2 rounded-md transition-all duration-300">About</li></Link>
            <Link to="/contact"><li className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Contact</li></Link>
            {!isAuthenticated && (
              <Link to="/register"><li className="text-white btn bg-rose-700 hover:bg-rose-800 font-medium px-4 py-2 rounded-md transition-all duration-300">Register</li></Link>
            )}
          </ul>
        </div>

        {/* RIGHT — Auth Buttons */}
        <div className="navbar-end">
          {!isAuthenticated ? (
            <Link to="/login">
              <button
                className="
                px-6 py-2 rounded-full font-semibold
                bg-rose-700 text-white
                hover:bg-rose-800 shadow-md
                transition-all hover:-translate-y-0.5
              "
              >
                Login
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost flex items-center text-rose-700">
                <div className="flex items-center">
                  <span className="font-semibold">Hey, {user?.last_name}</span>
                  <ChevronDown color="#be123c" />                                
                </div>
              </button>
              <ul className="dropdown-content bg-white rounded-xl z-1 mt-3 w-52 p-2 shadow border border-rose-100">
                <li>
                  <button
                    onClick={() => setConfirmLogout(true)}
                    className="flex items-center text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg cursor-pointer w-full px-3 py-2"
                  >
                    <LogOut color="#be123c" className='mr-3'/>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* LOGOUT CONFIRMATION MODAL */}
      {confirmLogout && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center border border-rose-100">
            <h3 className="text-xl font-bold text-rose-700 mb-3">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg shadow transition"
              >
                Yes, Logout
              </button>

              <button
                onClick={() => setConfirmLogout(false)}
                className="px-5 py-2 border border-rose-300 hover:bg-rose-100 text-rose-700 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;