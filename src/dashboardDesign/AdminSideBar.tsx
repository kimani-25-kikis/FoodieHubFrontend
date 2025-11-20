import { BarChart, Clipboard, ShoppingCart, StoreIcon, Users } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router'

const AdminSidebar: React.FC = () => {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const navigationItems = [
        {
            name: 'Analytics',
            path: '/admin/dashboard',
            icon: <BarChart className="w-5 h-5" />
        },
        {
            name: 'All Orders',
            path: '/admin/dashboard/all-orders',
            icon: <ShoppingCart className="w-5 h-5" />
        },
        {
            name: 'Menu Items',
            path: '/admin/dashboard/all-menu-items',
            icon: <Clipboard className="w-5 h-5" />
        },
        {
            name: 'All Customers',
            path: '/admin/dashboard/all-customers',
            icon: <Users className="w-5 h-5" />
        },
        {
            name:'All Restaurants',
            path: '/admin/dashboard/all-restaurants',
            icon: <StoreIcon className="w-5 h-5" />
        }
    ]

    return (
        <div className="bg-gradient-to-b from-rose-50 to-rose-100 border-r border-rose-200 shadow-lg transition-all duration-300 w-64 min-h-screen fixed left-0 top-23 z-40">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-rose-200 bg-gradient-to-r from-rose-900 to-rose-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-white drop-shadow-md">Admin Panel</h1>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-3">
                {navigationItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden ${isActive(item.path)
                                ? 'bg-gradient-to-r from-rose-700 to-orange-600 text-white shadow-lg transform scale-105'
                                : 'text-rose-800 hover:bg-rose-200 hover:text-rose-900 hover:shadow-md hover:translate-x-1'
                            }`}
                    >
                        {/* Active indicator bar */}
                        {isActive(item.path) && (
                            <div className="absolute left-0 top-0 w-1 h-full bg-orange-400 rounded-r"></div>
                        )}
                        
                        <span className={`shrink-0 mr-3 transition-transform duration-200 ${isActive(item.path) 
                            ? 'text-white transform scale-110' 
                            : 'text-rose-600 group-hover:text-rose-800 group-hover:transform group-hover:scale-110'
                        }`}>
                            {item.icon}
                        </span>
                        <span className="font-semibold">{item.name}</span>
                        
                        {/* Hover effect for inactive items */}
                        {!isActive(item.path) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Decorative element */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-orange-500 to-rose-600 opacity-80"></div>
        </div>
    )
}

export default AdminSidebar