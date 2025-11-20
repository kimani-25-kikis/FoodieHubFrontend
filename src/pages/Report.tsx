import React from 'react'
import DashboardLayout from '../dashboardDesign/DashBoardLayout'

const Reports: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-2">View restaurant performance analytics and reports</p>
            </div>

            {/* Placeholder content */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Reports & Analytics</h3>
                <p className="text-gray-500">This page will contain reporting and analytics functionality</p>
                <button className="btn bg-purple-600 hover:bg-purple-700 text-white mt-4">
                    Coming Soon
                </button>
            </div>
        </DashboardLayout>
    )
}

export default Reports