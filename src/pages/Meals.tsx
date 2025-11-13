import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCredentials } from '../features/slice/AuthSlice'
import { persistor } from '../store/store'
import { menuItemApi } from '../features/api/MenuItemApi'
import type { MenuItem } from '../types/Types'

const MealsData: MenuItem[] = [
  {
    menu_item_id: 1,
    name: 'Grilled Chicken Salad',
    description: 'A healthy mix of grilled chicken, fresh greens, and a light vinaigrette.',
    price: 12.99,
    category_name: 'Salads',
    menuitemimage_url:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
    is_available: true,
    quantity: 15,
    rating: 4.8,
    prep_time: '15 mins',
  },
  {
    menu_item_id: 2,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy sauce, pancetta, and Parmesan cheese.',
    price: 14.99,
    category_name: 'Pasta',
    menuitemimage_url:
      'https://images.unsplash.com/photo-1623243020684-9f8bcefe6e94?auto=format&fit=crop&q=80&w=1470',
    is_available: true,
    quantity: 8,
    rating: 4.9,
    prep_time: '20 mins',
  },
  {
    menu_item_id: 3,
    name: 'Vegan Buddha Bowl',
    description: 'A nourishing bowl of quinoa, roasted veggies, chickpeas, and tahini dressing.',
    price: 11.99,
    category_name: 'Vegan',
    menuitemimage_url:
      'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80',
    is_available: true,
    quantity: 22,
    rating: 4.6,
    prep_time: '12 mins',
  },
  {
    menu_item_id: 4,
    name: 'BBQ Beef Burger',
    description: 'Juicy beef patty with BBQ sauce, lettuce, tomato, and crispy onions.',
    price: 16.99,
    category_name: 'Burgers',
    menuitemimage_url:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    is_available: true,
    quantity: 3,
    rating: 4.7,
    prep_time: '18 mins',
  },
  {
    menu_item_id: 5,
    name: 'Margherita Pizza',
    description: 'Traditional pizza with fresh mozzarella, tomato sauce, and basil.',
    price: 13.99,
    category_name: 'Pizza',
    menuitemimage_url:
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80',
    is_available: false,
    quantity: 0,
    rating: 4.5,
    prep_time: '25 mins',
  },
  {
    menu_item_id: 6,
    name: 'Fish Tacos',
    description: 'Fresh grilled fish with cabbage slaw, avocado, and lime crema.',
    price: 15.99,
    category_name: 'Mexican',
    menuitemimage_url:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=500&q=80',
    is_available: true,
    quantity: 12,
    rating: 4.4,
    prep_time: '16 mins',
  },
]

const Meals: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  menuItemApi.useGetAllMenuItemsQuery()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const isAuthenticated = true // <-- this would normally come from your Redux state

  const categories = ['All', ...new Set(MealsData.map((meal) => meal.category_name).filter(Boolean))]

  const filteredMeals = MealsData.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || meal.category_name === selectedCategory
    const matchesAvailability = !showAvailableOnly || meal.is_available

    return matchesSearch && matchesCategory && matchesAvailability
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleCreateOrder = (menu_item_id: number) => {
    alert('Sign in to checkout')
  }

  const handleLogout = async () => {
    dispatch(clearCredentials())
    await persistor.purge()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-yellow-50 flex flex-col">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg shadow-sm z-50 py-3 px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-rose-800 tracking-wide">🍴 FoodieHub</h2>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-rose-800 hover:bg-rose-900 text-white px-5 py-2 rounded-full font-semibold text-sm transition-all"
        >
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <div className="pt-28 pb-12 px-8 text-center bg-gradient-to-r from-rose-700 to-orange-500 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-pulse">
          Discover Flavors that Speak to You 🌮
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Explore handcrafted dishes, curated with passion and plated with perfection.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-20 bg-white/60 backdrop-blur-xl border-b border-gray-200 py-6 px-8 z-40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl text-base outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-200"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl text-base bg-white cursor-pointer focus:border-rose-700 focus:ring-1 focus:ring-rose-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                📂 {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl text-base bg-white cursor-pointer focus:border-rose-700 focus:ring-1 focus:ring-rose-200"
          >
            <option value="name">📝 Sort by Name</option>
            <option value="price-low">💰 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
            <option value="rating">⭐ Rating</option>
          </select>

          <label className="flex items-center gap-2 justify-center text-sm">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="scale-125 accent-rose-700"
            />
            Show Available Only
          </label>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="flex-1 py-10 px-6 md:px-12">
        {filteredMeals.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <div className="text-7xl mb-4">🥺</div>
            <h2 className="text-2xl font-semibold mb-2">No meals found</h2>
            <p>Try changing filters or searching for something else!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {filteredMeals.map((meal) => (
              <div
                key={meal.menu_item_id}
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={meal.menuitemimage_url}
                    alt={meal.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white font-semibold ${
                      meal.is_available ? 'bg-green-600' : 'bg-red-500'
                    }`}
                  >
                    {meal.is_available ? 'Available' : 'Sold Out'}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-rose-800 mb-2">{meal.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{meal.description}</p>

                  {meal.quantity && meal.quantity <= 5 && meal.quantity > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs p-2 rounded-lg mb-3">
                      ⚠️ Only {meal.quantity} left!
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm mb-3">
                    <span>⭐ {meal.rating}</span>
                    <span>⏱️ {meal.prep_time}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-rose-800">${meal.price.toFixed(2)}</div>
                    <button
                      onClick={() => handleCreateOrder(meal.menu_item_id)}
                      disabled={!meal.is_available}
                      className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                        meal.is_available
                          ? 'bg-rose-700 hover:bg-rose-800 text-white'
                          : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                    >
                      {isAuthenticated ? 'Order Now' : 'Sign Up'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Meals
