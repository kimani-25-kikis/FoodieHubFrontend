import React from 'react'
import type {  RecentOrder } from '../../types/Types'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard, DollarSign, ShoppingCart, Users } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { dashboardDataApi } from '../../features/api/DataBoardDataApi'

const AdminDashboard: React.FC = () => {

        const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice)


    const { data: adminStats, isLoading: adminStatsLoading, error:adminIsError } = dashboardDataApi.useGetAdminDashboardDataQuery({},{
        skip:!isAuthenticated
    })
        console.log("🚀 ~ AdminDashboard ~ adminStats:", adminStats)
        
    
    // Sample dashboard data
    // const dashboardData: DashboardStats = {
    //     totalOrders: 245,
    //     totalRevenue: 15420,
    //     totalCustomers: 189,
    //     totalMenuItems: 32
    // }

    const recentOrders: RecentOrder[] = [
        { id: 1, customer: "Joshua Kimani", amount: 45.50, status: "Delivered", time: "2 hours ago" },
        { id: 2, customer: "Jane Wambui", amount: 32.75, status: "Preparing", time: "30 min ago" },
        { id: 3, customer: "Micheal Mwangi", amount: 67.25, status: "Ready", time: "15 min ago" },
        { id: 4, customer: "Peter Githinji", amount: 28.90, status: "Delivered", time: "1 hour ago" }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Preparing': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Ready': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-rose-100 text-rose-800 border-rose-200';
        }
    }

    return (
        <AdminDashboardLayout>
            {/* Dashboard Header */}
            <div className="mb-8 bg-linear-to-r from-rose-900 to-orange-800 p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-white drop-shadow-md">Restaurant Dashboard</h1>
                <p className="text-rose-100 mt-2 text-lg">Welcome to FoodieHub Admin Management Dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               {adminStatsLoading?(
                <div className="flex items-center justify-center h-64 col-span-4">
                        <div className="loading loading-spinner loading-lg text-rose-700"></div>
                        <span className="ml-2 text-rose-600">Loading dashboard...</span>
                    </div>
               ):adminIsError?(
                <div className="flex items-center justify-center h-64 col-span-4">                       
                        <span className="ml-2 text-rose-600">Error Loading dashboard data</span>
                    </div>
               ):(
                <>
                 <div className="bg-linear-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-rose-700 text-sm font-semibold">Total Orders</p>
                            <p className="text-2xl font-bold text-rose-900">{adminStats?.data.totalOrders}</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3 shadow-md">
                            <ShoppingCart className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-rose-700 text-sm font-semibold">Total Revenue</p>
                            <p className="text-2xl font-bold text-rose-900">${adminStats?.data.totalRevenue}</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3 shadow-md">
                            <DollarSign className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-rose-700 text-sm font-semibold">Total Customers</p>
                            <p className="text-2xl font-bold text-rose-900">{adminStats?.data.totalCustomers}</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3 shadow-md">
                            <Users className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-rose-700 text-sm font-semibold">Menu Items</p>
                            <p className="text-2xl font-bold text-rose-900">{adminStats?.data.totalMenuItems}</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-full p-3 shadow-md">
                            <Clipboard className="text-white" size={24} />
                        </div>
                    </div>
                </div>
                </>
               )
               
            }
            </div>

            {/* Recent Orders Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-b from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-rose-900">Recent Orders</h2>
                        <button className="bg-gradient-to-r from-rose-700 to-orange-600 hover:from-rose-800 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-none">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-rose-200">
                                    <th className="text-rose-700 font-semibold pb-3 text-left">Customer</th>
                                    <th className="text-rose-700 font-semibold pb-3 text-left">Amount</th>
                                    <th className="text-rose-700 font-semibold pb-3 text-left">Status</th>
                                    <th className="text-rose-700 font-semibold pb-3 text-left">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-rose-100 hover:bg-rose-50 transition-colors duration-150">
                                        <td className="py-3 font-medium text-rose-900">{order.customer}</td>
                                        <td className="py-3 font-semibold text-rose-700">${order.amount}</td>
                                        <td className="py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-rose-600 text-sm">{order.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-b from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200">
                    <h2 className="text-xl font-semibold text-rose-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white rounded-xl flex flex-col items-center p-6 h-auto transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-none">
                            <svg className="w-8 h-8 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="font-semibold">Add Menu Item</span>
                        </button>
                        <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl flex flex-col items-center p-6 h-auto transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-none">
                            <svg className="w-8 h-8 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="font-semibold">New Order</span>
                        </button>
                        <button className="bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-800 hover:to-rose-700 text-white rounded-xl flex flex-col items-center p-6 h-auto transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-none">
                            <svg className="w-8 h-8 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="font-semibold">View Reports</span>
                        </button>
                        <button className="bg-gradient-to-r from-rose-800 to-rose-700 hover:from-rose-900 hover:to-rose-800 text-white rounded-xl flex flex-col items-center p-6 h-auto transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 border-none">
                            <svg className="w-8 h-8 mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-semibold">Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AdminDashboard