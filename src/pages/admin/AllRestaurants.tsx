import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import {  Store, StoreIcon} from 'lucide-react'

const AllRestaurants: React.FC = () => {
    return (
        <AdminDashboardLayout>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-rose-100 to-orange-100 rounded-xl">
                    <StoreIcon className="text-rose-600" size={28} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-rose-900">Restaurant Management</h1>
            </div>

            {/* Placeholder content */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg p-8 text-center border border-rose-200">
                <Store className="mx-auto mb-4 text-rose-600" size={56} />
                <h3 className="text-2xl font-bold text-rose-800 mb-3">Restaurant Management</h3>
                <p className="text-rose-600 mb-6">This page will contain restaurant management functionality</p>
                <button className="bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                    Coming Soon
                </button>
            </div>
        </AdminDashboardLayout>
    )
}

export default AllRestaurants