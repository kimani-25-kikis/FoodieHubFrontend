import React from 'react'
import DashboardLayout from '../../dashboardDesign/DashBoardLayout'
import { User } from 'lucide-react'

const UserProfile: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg">
                    <User className="text-rose-700" size={24} />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-rose-900">User Profile</h1>
            </div>

            {/* Placeholder content */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-lg shadow-md p-8 text-center border border-rose-200">
                <User className="mx-auto mb-4 text-rose-600" size={48} />
                <h3 className="text-xl font-semibold text-rose-800 mb-2">User Profile</h3>
                <p className="text-rose-600">This page will display user profile information and settings.</p>
                <button className="btn bg-gradient-to-r from-rose-700 to-orange-600 hover:from-rose-800 hover:to-orange-700 text-white mt-4 border-none">
                    Coming Soon
                </button>
            </div>
        </DashboardLayout>
    )
}

export default UserProfile