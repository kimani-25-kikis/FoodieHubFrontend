import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-700 to-orange-500 text-white py-12 px-6 mt-16 rounded-t-3xl shadow-inner">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-3xl font-extrabold mb-3 flex items-center gap-2">
            🍽️ FoodieHub
          </h2>
          <p className="opacity-90 leading-relaxed">
            Bringing you handcrafted meals made with passion, freshness, and love.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
          <ul className="space-y-2 opacity-90">
            <li><a href="/" className="hover:text-yellow-200 transition">Home</a></li>
            <li><a href="/meals" className="hover:text-yellow-200 transition">Meals</a></li>
            <li><a href="/about" className="hover:text-yellow-200 transition">About</a></li>
            <li><a href="/contact" className="hover:text-yellow-200 transition">Contact</a></li>
          </ul>
        </div>

        {/* CUSTOMER SUPPORT */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Customer Support</h6>
          <ul className="space-y-2 opacity-90">
            <li><a className="hover:text-yellow-200 transition">FAQs</a></li>
            <li><a className="hover:text-yellow-200 transition">Delivery Info</a></li>
            <li><a className="hover:text-yellow-200 transition">Order Help</a></li>
            <li><a className="hover:text-yellow-200 transition">Payment Options</a></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Legal</h6>
          <ul className="space-y-2 opacity-90">
            <li><a className="hover:text-yellow-200 transition">Terms of Use</a></li>
            <li><a className="hover:text-yellow-200 transition">Privacy Policy</a></li>
            <li><a className="hover:text-yellow-200 transition">Cookie Policy</a></li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-12 opacity-80 border-t border-white/30 pt-6 text-sm">
        © {new Date().getFullYear()} FoodieHub • All Rights Reserved
      </div>

    </footer>
  )
}

export default Footer
