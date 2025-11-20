import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashBoardLayout'
import { Package } from 'lucide-react'

const Orders: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-rose-100 to-orange-100 rounded-xl">
                    <Package className="text-rose-600" size={28} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-rose-900">Order Management</h1>
            </div>

            {/* Placeholder content */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-lg p-8 text-center border border-rose-200">
                <Package className="mx-auto mb-4 text-rose-600" size={56} />
                <h3 className="text-2xl font-bold text-rose-800 mb-3">Orders Management</h3>
                <p className="text-rose-600 mb-6">This page will contain order management functionality</p>
                <button className="bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                    Coming Soon
                </button>
            </div>
        </DashboardLayout>
    )
}

export default Orders;