import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import type { RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearCredentials } from '../features/slice/AuthSlice'

const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  )

  // State for confirmation modal
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogoutConfirmed = () => {
    dispatch(clearCredentials())
    setShowLogoutModal(false)
    navigate('/login')
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar sticky top-0 z-50 bg-gradient-to-r from-rose-700 to-orange-500 shadow-lg px-6 py-4 text-white backdrop-blur-xl">

        {/* LEFT: Brand & Mobile Menu */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-20 w-52 rounded-xl bg-white/90 backdrop-blur-md text-gray-800 shadow-lg border border-gray-200"
            >
              <li><Link to="/" className="hover:bg-rose-100 hover:text-rose-700">Home</Link></li>
              <li><Link to="/meals" className="hover:bg-rose-100 hover:text-rose-700">Meals</Link></li>
              <li><Link to="/about" className="hover:bg-rose-100 hover:text-rose-700">About</Link></li>
              <li><Link to="/contact" className="hover:bg-rose-100 hover:text-rose-700">Contact</Link></li>

              {!isAuthenticated && (
                <>
                  <li><Link to="/register" className="hover:bg-rose-100 hover:text-rose-700">Register</Link></li>
                  <li><Link to="/login" className="hover:bg-rose-100 hover:text-rose-700">Login</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Brand */}
          <Link to="/" className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            🍽️ FoodieHub
          </Link>
        </div>

        {/* CENTER NAV (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2">
            <li><Link to="/" className="px-4 py-2 rounded-xl hover:bg-white/20 transition">Home</Link></li>
            <li><Link to="/meals" className="px-4 py-2 rounded-xl hover:bg-white/20 transition">Meals</Link></li>
            <li><Link to="/about" className="px-4 py-2 rounded-xl hover:bg-white/20 transition">About</Link></li>
            <li><Link to="/contact" className="px-4 py-2 rounded-xl hover:bg-white/20 transition">Contact</Link></li>

            {!isAuthenticated && (
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-rose-800 hover:bg-rose-900 text-white transition shadow">
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* RIGHT: Auth Buttons / Profile */}
        <div className="navbar-end">
          {!isAuthenticated ? (
            <Link to="/login">
              <button className="px-6 py-2 rounded-full bg-white text-rose-800 font-semibold shadow-md hover:shadow-lg hover:bg-rose-50 transition">
                Login
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost text-white flex items-center gap-2">
                <span className="text-lg font-semibold">Hi, {user?.last_name}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 9l-7 7-7-7" />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white text-gray-900 rounded-xl shadow-lg mt-3 w-52 border border-gray-200"
              >
                <li>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="hover:bg-rose-100 hover:text-rose-700 rounded-lg">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

      </nav>

      {/* LOGOUT CONFIRMATION MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[999]">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-xl border border-gray-200 text-center">

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Are you sure you want to logout?
            </h2>

            <p className="text-gray-600 mb-6 text-sm">
              You will need to login again to access your account.
            </p>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-1/2 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogoutConfirmed}
                className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-orange-500 text-white font-semibold hover:opacity-90 transition"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
