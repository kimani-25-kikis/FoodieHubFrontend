import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Users, Eye, Edit, Trash2, Search, Filter } from 'lucide-react'

const AllCustomers: React.FC = () => {
    return (
        <AdminDashboardLayout>
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl p-3 shadow-lg">
                        <Users className="text-white" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-rose-900">Customer Management</h1>
                        <p className="text-rose-600 mt-1">Manage all your restaurant customers</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 mb-6 border border-rose-200">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-500" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search customers..." 
                                className="w-full pl-10 pr-4 py-3 bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-rose-900 placeholder-rose-400"
                            />
                        </div>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors duration-200 flex items-center gap-2">
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>
                    <button className="bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto">
                        Add New Customer
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-gradient-to-b from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-rose-900">All Customers</h3>
                    <div className="text-sm text-rose-600 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                        12 customers total
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-rose-200 bg-white">
                    <table className="w-full">
                        {/* Table Head */}
                        <thead className="bg-gradient-to-r from-rose-100 to-orange-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">#</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">First Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">Last Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">Phone Number</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">Date Joined</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">User Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-rose-900 border-b border-rose-200">Actions</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-rose-100">
                            <tr className="hover:bg-rose-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-sm font-medium text-rose-900">1</td>
                                <td className="px-6 py-4 text-sm text-rose-800">John</td>
                                <td className="px-6 py-4 text-sm text-rose-800">Ganderton</td>
                                <td className="px-6 py-4 text-sm text-rose-700">john@mail.com</td>
                                <td className="px-6 py-4 text-sm text-rose-700">071122114477</td>
                                <td className="px-6 py-4 text-sm text-rose-600">2023-10-01</td>
                                <td className="px-6 py-4">
                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full border border-emerald-200">
                                        Customer
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200 border border-blue-200 hover:border-blue-300">
                                            <Eye size={16} />
                                        </button>
                                        <button className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-lg transition-colors duration-200 border border-amber-200 hover:border-amber-300">
                                            <Edit size={16} />
                                        </button>
                                        <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 p-2 rounded-lg transition-colors duration-200 border border-rose-200 hover:border-rose-300">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="hover:bg-rose-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-sm font-medium text-rose-900">2</td>
                                <td className="px-6 py-4 text-sm text-rose-800">Sarah</td>
                                <td className="px-6 py-4 text-sm text-rose-800">Wilson</td>
                                <td className="px-6 py-4 text-sm text-rose-700">sarah@mail.com</td>
                                <td className="px-6 py-4 text-sm text-rose-700">072233445566</td>
                                <td className="px-6 py-4 text-sm text-rose-600">2023-10-15</td>
                                <td className="px-6 py-4">
                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1 rounded-full border border-emerald-200">
                                        Customer
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200 border border-blue-200 hover:border-blue-300">
                                            <Eye size={16} />
                                        </button>
                                        <button className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-lg transition-colors duration-200 border border-amber-200 hover:border-amber-300">
                                            <Edit size={16} />
                                        </button>
                                        <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 p-2 rounded-lg transition-colors duration-200 border border-rose-200 hover:border-rose-300">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="hover:bg-rose-50 transition-colors duration-150">
                                <td className="px-6 py-4 text-sm font-medium text-rose-900">3</td>
                                <td className="px-6 py-4 text-sm text-rose-800">Mike</td>
                                <td className="px-6 py-4 text-sm text-rose-800">Johnson</td>
                                <td className="px-6 py-4 text-sm text-rose-700">mike@mail.com</td>
                                <td className="px-6 py-4 text-sm text-rose-700">073344556677</td>
                                <td className="px-6 py-4 text-sm text-rose-600">2023-11-05</td>
                                <td className="px-6 py-4">
                                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full border border-purple-200">
                                        VIP
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200 border border-blue-200 hover:border-blue-300">
                                            <Eye size={16} />
                                        </button>
                                        <button className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-lg transition-colors duration-200 border border-amber-200 hover:border-amber-300">
                                            <Edit size={16} />
                                        </button>
                                        <button className="bg-rose-100 hover:bg-rose-200 text-rose-700 p-2 rounded-lg transition-colors duration-200 border border-rose-200 hover:border-rose-300">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-rose-600">
                        Showing 1 to 3 of 12 entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            Previous
                        </button>
                        <button className="bg-gradient-to-r from-rose-600 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                            1
                        </button>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            2
                        </button>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            3
                        </button>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AllCustomers