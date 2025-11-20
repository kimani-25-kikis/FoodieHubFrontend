import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashBoardLayout'
import { DollarSign, HardDriveDownload, Heart, ShoppingCart, Star, User } from 'lucide-react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { dashboardDataApi } from '../../features/api/DataBoardDataApi'

interface FavoriteItems{
    id:number;
    name:string;
    price:number;
    image:string;
    orders:number
}

interface RecentOrders{
    id:number;
    restaurant:string;
    items:string;
    amount:number;
    status:string;
    date:string;
    rating:number;
}

const UserDashboard: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice)

    // RTK Query hook - ADDED FROM TRAINER'S CODE
    const { data: userStats, isLoading: userStatsLoading, error } = dashboardDataApi.useGetUserDashboardByIdQuery(
        (user?.user_id!),
        { skip: !isAuthenticated }
    )
    console.log("🚀 ~ UserDashboard ~ userStats:", userStats)

    const recentOrders: RecentOrders[] = [
        // { id: 1, restaurant: "Mathe's Eatery", items: "Grilled Chicken & Salad", amount: 28.99, status: "Delivered", date: "Nov 14, 2025", rating: 5 },
        // { id: 2, restaurant: "Mathe's Eatery", items: "Pasta Carbonara", amount: 24.50, status: "Delivered", date: "Nov 12, 2025", rating: 4 },
        // { id: 3, restaurant: "Mathe's Eatery", items: "Beef Burger Combo", amount: 15.99, status: "In Transit", date: "Nov 15, 2025", rating: 0 },
    ]

    const favoriteItems: FavoriteItems[] = [
        // { id: 1, name: "Grilled Chicken Salad", price: 28.99, image: "🥗", orders: 5 },
        // { id: 2, name: "Pasta Carbonara", price: 24.50, image: "🍝", orders: 3 },
        // { id: 3, name: "Beef Burger", price: 15.99, image: "🍔", orders: 4 },
        // { id: 4, name: "Chocolate Cake", price: 12.50, image: "🍰", orders: 2 },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'In Transit': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Preparing': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))
    }

    return (
        <DashboardLayout>
            {/* Welcome Header */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-rose-900 to-orange-800 rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold">Welcome back, Valued Customer! 👋</h1>
                    <p className="mt-2 text-rose-100">Here's your dining journey with FoodieHub</p>
                </div>
            </div>

            {/* User Stats Cards - UPDATED WITH LOADING STATES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {userStatsLoading ? (
                    <div className="flex items-center justify-center h-64 col-span-4">
                        <div className="loading loading-spinner loading-lg text-rose-700"></div>
                        <span className="ml-2 text-rose-600">Loading dashboard...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64 col-span-4">                       
                        <span className="ml-2 text-rose-600">Error Loading dashboard data</span>
                    </div>
                ) : (
                    <>
                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-rose-700 text-sm font-medium">My Orders</p>
                                    <p className="text-2xl font-bold text-rose-900">{userStats?.data.totalOrders }</p>
                                    <p className="text-xs text-rose-600">+2 this month</p>
                                </div>
                                <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3">
                                    <ShoppingCart size={24} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-rose-700 text-sm font-medium">Total Spent</p>
                                    <p className="text-2xl font-bold text-rose-900">${userStats?.data.totalSpent }</p>
                                    <p className="text-xs text-rose-600">This year</p>
                                </div>
                                <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3">
                                    <DollarSign size={24} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-rose-700 text-sm font-medium">Loyalty Points</p>
                                    <p className="text-2xl font-bold text-rose-900">{userStats?.data.loyaltyPoints }</p>
                                    <p className="text-xs text-rose-600">+150 this month</p>
                                </div>
                                <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3">
                                    <Star size={24} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200 transform hover:scale-105 transition-transform duration-200">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-rose-700 text-sm font-medium">Favorite Items</p>
                                    <p className="text-2xl font-bold text-rose-900">{userStats?.data.favoriteItems || 0}</p>
                                    <p className="text-xs text-rose-600">Saved items</p>
                                </div>
                                <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3">
                                    <Heart size={24} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-gradient-to-b from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-rose-900">My Recent Orders</h2>
                        <Link to="/dashboard/my-orders" className="bg-gradient-to-r from-rose-700 to-orange-600 hover:from-rose-800 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 border-none">
                            View All Orders
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <div className="col-span-4 flex flex-col items-center justify-center py-10">
                                <HardDriveDownload size={48} className="text-rose-300 mb-4" />
                                <p className="text-rose-600">You have no recent orders. Start exploring our menu!</p>
                            </div>
                        ) : (recentOrders.map((order) => (
                            <div key={order.id} className="border border-rose-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-rose-900">{order.items}</h3>
                                        <p className="text-sm text-rose-600">{order.restaurant} • {order.date}</p>
                                        <div className="flex items-center mt-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border mr-3 ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                            {order.rating > 0 && (
                                                <div className="flex items-center">
                                                    {renderStars(order.rating)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-rose-700">${order.amount}</p>
                                        {order.status === 'Delivered' && order.rating === 0 && (
                                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-xs mt-2">
                                                Rate Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-b from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200">
                    <h2 className="text-xl font-semibold text-rose-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button className="w-full bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white border-none flex items-center justify-start p-4 rounded-lg transition-all duration-200">
                            <ShoppingCart className="w-5 h-5 mr-3" />
                            Order Now
                        </button>
                        <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none flex items-center justify-start p-4 rounded-lg transition-all duration-200">
                            <Heart className="w-5 h-5 mr-3" />
                            View Favorites
                        </button>
                        <button className="w-full bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white border-none flex items-center justify-start p-4 rounded-lg transition-all duration-200">
                            <Star className="w-5 h-5 mr-3" />
                            Loyalty Rewards
                        </button>
                        <button className="w-full bg-gradient-to-r from-rose-800 to-rose-700 hover:from-rose-900 hover:to-rose-800 text-white border-none flex items-center justify-start p-4 rounded-lg transition-all duration-200">
                            <User className="w-5 h-5 mr-3" />
                            Profile Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Favorite Items */}
            <div className="bg-gradient-to-b from-rose-50 to-orange-50 rounded-lg shadow-md p-6 border border-rose-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-rose-900">Your Favorite Items</h2>
                    <Link to="/menu" className="border border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200">
                        Browse Menu
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {favoriteItems.length === 0 ? (
                        <div className="col-span-4 flex flex-col items-center justify-center py-10">
                            <Heart size={48} className="text-rose-300 mb-4" />
                            <p className="text-rose-600">You have no favorite items yet. Start exploring our menu!</p>
                        </div>
                    ) : (
                        favoriteItems.map((item) => (
                            <div key={item.id} className="border border-rose-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 bg-white">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">{item.image}</div>
                                    <h3 className="font-semibold text-rose-900 text-sm mb-1">{item.name}</h3>
                                    <p className="text-rose-700 font-bold">${item.price}</p>
                                    <p className="text-xs text-rose-500 mb-3">Ordered {item.orders} times</p>
                                    <button className="bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white w-full py-2 rounded-lg text-sm transition-all duration-200">
                                        Order Again
                                    </button>
                                </div>
                            </div>
                        )))}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default UserDashboard