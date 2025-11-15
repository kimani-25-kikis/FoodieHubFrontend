import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-rose-50 text-gray-700 py-12 px-6 mt-16 border-t border-rose-200">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-extrabold mb-3 flex items-center gap-2 text-rose-700">
            🍽️ FoodieHub
          </h2>
          <p className="leading-relaxed text-gray-600">
            Bringing you handcrafted meals made with passion, freshness, and love.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h6 className="text-lg font-semibold text-rose-700 mb-4">Quick Links</h6>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-rose-500 transition">Home</a></li>
            <li><a href="/meals" className="hover:text-rose-500 transition">Meals</a></li>
            <li><a href="/about" className="hover:text-rose-500 transition">About</a></li>
            <li><a href="/contact" className="hover:text-rose-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h6 className="text-lg font-semibold text-rose-700 mb-4">Customer Support</h6>
          <ul className="space-y-2">
            <li><a className="hover:text-rose-500 transition">FAQs</a></li>
            <li><a className="hover:text-rose-500 transition">Delivery Info</a></li>
            <li><a className="hover:text-rose-500 transition">Order Help</a></li>
            <li><a className="hover:text-rose-500 transition">Payment Options</a></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h6 className="text-lg font-semibold text-rose-700 mb-4">Legal</h6>
          <ul className="space-y-2">
            <li><a className="hover:text-rose-500 transition">Terms of Use</a></li>
            <li><a className="hover:text-rose-500 transition">Privacy Policy</a></li>
            <li><a className="hover:text-rose-500 transition">Cookie Policy</a></li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-12 text-sm text-gray-600 border-t border-rose-200 pt-6">
        © {new Date().getFullYear()} FoodieHub • All Rights Reserved
      </div>

    </footer>
  )
}

export default Footer
