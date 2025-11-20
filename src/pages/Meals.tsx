import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { menuItemApi } from "../features/api/MenuItemApi";
import { orderApi } from "../features/api/OrderApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShoppingCart } from "lucide-react";
import { toast, Toaster } from "sonner";

const Meals: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
  const navigate = useNavigate();
  
  const user_id = user?.user_id;

 
  const { data: apiResponse, error, isLoading } = menuItemApi.useGetAllMenuItemsQuery();
  
  
  const menuItems = apiResponse?.data || [];
  
  const [createNewOrder, { isLoading: isCreateOrderLoading }] = orderApi.useAddNewOrderMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway' | 'delivery'>('dine_in');

  
  const categories = ['All', ...new Set((menuItems || []).map(meal => meal.category_name).filter(Boolean))];

 
  const filteredMeals = (menuItems || [])
    .filter(meal => {
      if (!meal) return false;
      
      const matchesSearch = meal.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || meal.category_name === selectedCategory;
      const matchesAvailability = !showAvailableOnly || meal.is_available;

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

  // Rest of your component remains the same...
  const openOrderModal = (meal: any) => {
    if (!isAuthenticated || !user_id) {
      toast.error('Please sign in to place an order');
      return;
    }

    if (!meal.is_available || meal.quantity < 1) {
      toast.error('This item is currently unavailable');
      return;
    }

    setSelectedMeal(meal);
    setIsOrderModalOpen(true);
  };

  const handleCreateOrder = async () => {
    if (!selectedMeal) return;

    const loadingToastId = toast.loading("Creating order...");
    try {
      const orderData = {
        restaurant_id: selectedMeal.restaurant_id,
        customer_id: user_id!,
        menu_item_id: selectedMeal.menu_item_id,
        total_amount: selectedMeal.price,
        order_type: orderType
      };

      const response = await createNewOrder(orderData).unwrap();
      toast.success(response.message, { id: loadingToastId });

      setIsOrderModalOpen(false);
      setSelectedMeal(null);
      setOrderType('dine_in');
      navigate('/dashboard/my-orders');

    } catch (error: any) {
      console.error('Order failed:', error);
      toast.error('Failed to place order. Please try again.', { id: loadingToastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-yellow-50 flex flex-col">
      <Navbar />
      <Toaster position="top-right" richColors />
      
      {/* Hero Section */}
      <div className="pt-28 pb-12 px-8 text-center bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg animate-pulse">
          Discover Flavors that Speak to You 🌮
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Explore handcrafted dishes, curated with passion and plated with perfection.
        </p>
      </div>

      {/* Search and Filters */}
      {!isLoading && !error && (
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
              {categories.map(category => (
                <option key={category} value={category}>
                  📂 {category}
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
      )}

      {/* Results Count */}
      {!isLoading && !error && (
        <div className="py-4 px-8 bg-white/60 text-center border-b border-gray-200">
          <p className="text-lg text-gray-600 m-0">
            Found {filteredMeals.length} delicious meal{filteredMeals.length !== 1 ? 's' : ''}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>
      )}

      {/* Loading & Error */}
      {isLoading && (
        <p className="text-center text-lg pt-10 text-gray-600">
          Loading meals...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 pt-10">
          Failed to load meals. Please check API connection.
        </p>
      )}

      {/* Meals Grid */}
      <div className="flex-1 py-10 px-6 md:px-12">
        {isLoading ? (
          <p className="text-center text-lg pt-10 text-gray-600">Loading meals...</p>
        ) : error ? (
          <p className="text-center text-red-600 pt-10">Error loading meals.</p>
        ) : (
          filteredMeals.length === 0 ? (
            <div className="text-center py-24 text-gray-600">
              <div className="text-7xl mb-4">🥺</div>
              <h2 className="text-2xl font-semibold mb-2">No meals found</h2>
              <p>Try changing filters or searching for something else!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredMeals.map(meal => (
                <div
                  key={meal.menu_item_id}
                  className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
                >
                  <div className="relative">
                    <img
                      src={meal.menuitem_image_url}
                      alt={meal.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${meal.is_available ? 'bg-green-500' : 'bg-red-500'}`}>
                      {meal.is_available ? '✅ Available' : '❌ Sold Out'}
                    </div>

                    <div className={`absolute top-14 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${meal.quantity && meal.quantity <= 5 ? 'bg-orange-500' : 'bg-blue-500'}`}>
                      📦 {meal.quantity || 0} left
                    </div>

                    <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {meal.category_name}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-rose-800 mb-2">
                      {meal.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {meal.description}
                    </p>

                    {meal.quantity && meal.quantity <= 5 && meal.quantity > 0 && (
                      <div className="bg-yellow-50 text-yellow-800 p-2 rounded-md text-xs mb-4 border border-yellow-200 flex items-center gap-2">
                        ⚠️ <strong>Hurry!</strong> Only {meal.quantity} left in stock!
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span>{meal.prepared_time}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-rose-800">
                        ${meal.price?.toFixed(2)}
                      </div>

                      <button
                        className={`px-5 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${meal.is_available && meal.quantity >= 1
                          ? 'bg-rose-700 hover:bg-rose-800 text-white cursor-pointer hover:-translate-y-1 hover:shadow-lg'
                          : 'bg-gray-500 text-white cursor-not-allowed'
                          }`}
                        onClick={() => openOrderModal(meal)}
                        disabled={!meal.is_available || meal.quantity < 1 || isCreateOrderLoading}
                      >
                        {isCreateOrderLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <ShoppingCart size={16} />
                            <span>{isAuthenticated ? "Order Now" : "Sign In"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Order Type Modal */}
      {isOrderModalOpen && selectedMeal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm bg-white rounded-2xl border border-rose-100">
            <h3 className="font-bold text-lg mb-4 text-rose-800">Select Order Type</h3>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedMeal.menuitem_image_url}
                alt={selectedMeal.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium text-rose-700">{selectedMeal.name}</p>
                <p className="text-rose-600 font-bold">${selectedMeal.price?.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { value: 'dine_in', label: '🏠 Dine In', desc: 'Eat at restaurant' },
                { value: 'takeaway', label: '🥡 Takeaway', desc: 'Pick up order' },
                { value: 'delivery', label: '🚚 Delivery', desc: 'Delivered to you' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-3 p-3 border border-rose-200 rounded-xl cursor-pointer hover:bg-rose-50 transition-colors">
                  <input
                    type="radio"
                    name="orderType"
                    value={option.value}
                    checked={orderType === option.value}
                    onChange={(e) => setOrderType(e.target.value as typeof orderType)}
                    className="radio radio-primary accent-rose-700"
                  />
                  <div>
                    <div className="font-medium text-rose-700">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="modal-action">
              <button
                className="btn btn-outline border-rose-300 text-rose-700 hover:bg-rose-50"
                onClick={() => {
                  setIsOrderModalOpen(false);
                  setSelectedMeal(null);
                  setOrderType('dine_in');
                }}
              >
                Cancel
              </button>
              <button
                className="btn bg-rose-700 hover:bg-rose-800 text-white border-rose-700"
                onClick={handleCreateOrder}
                disabled={isCreateOrderLoading}
              >
                {isCreateOrderLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Meals;