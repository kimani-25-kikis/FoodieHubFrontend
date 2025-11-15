import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../features/slice/AuthSlice";
import type { RootState } from "../store/store";

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
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-rose-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="
              menu menu-sm dropdown-content mt-3 z-20 w-52
              rounded-xl bg-white/95 backdrop-blur-md
              text-rose-700 shadow-lg border border-rose-100
            "
            >
              {navLink("/", "Home")}
              {navLink("/meals", "Meals")}
              {navLink("/about", "About")}
              {navLink("/contact", "Contact")}

              {!isAuthenticated && (
                <>
                  {navLink("/register", "Register")}
                  {navLink("/login", "Login")}
                </>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide flex items-center gap-2 text-rose-700"
          >
            🍽️ FoodieHub
          </Link>
        </div>

        {/* CENTER — Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2">
            {navLink("/", "Home")}
            {navLink("/meals", "Meals")}
            {navLink("/about", "About")}
            {navLink("/contact", "Contact")}

            {!isAuthenticated && (
              <li>
                <Link
                  to="/register"
                  className="
                    px-4 py-2 rounded-xl
                    bg-rose-700 text-white
                    hover:bg-rose-800
                    font-semibold shadow
                    transition-all
                  "
                >
                  Register
                </Link>
              </li>
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
              <label tabIndex={0} className="btn btn-ghost text-rose-700 flex items-center gap-2">
                <span className="font-semibold">Hi, {user?.last_name}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 9l-7 7-7-7" />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="
                  dropdown-content menu bg-white text-rose-700
                  rounded-xl shadow-lg mt-3 w-52
                  border border-rose-100
                "
              >
                <li>
                  <button
                    onClick={() => setConfirmLogout(true)}
                    className="hover:bg-rose-50 hover:text-rose-800 rounded-lg"
                  >
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
