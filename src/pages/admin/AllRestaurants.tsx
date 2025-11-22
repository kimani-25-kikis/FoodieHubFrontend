import React, { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Building, MapPin, Phone, Mail, Clock, Utensils, Edit, Trash2, Plus, X, SaveIcon } from 'lucide-react'
import { useForm, type SubmitHandler } from "react-hook-form"
import { restaurantApi } from '../../features/api/RestaurantApi'
import type { Restaurant } from '../../types/Types'
import { Toaster, toast } from "sonner"
import Swal from 'sweetalert2'

type RestaurantFormValues = {
    name: string;
    description: string;
    address: string;
    city: string;
    phone_number: string;
    email: string;
    opening_time: string;
    closing_time: string;
    cuisine_type: string;
    is_active: boolean;
}

const AllRestaurants: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RestaurantFormValues>()

    // RTK Query Hooks
    const { data: allRestaurants, isLoading: restaurantsLoading, error } = restaurantApi.useGetAllRestaurantsQuery()
    const [createRestaurant] = restaurantApi.useCreateRestaurantMutation()
    const [deleteRestaurant] = restaurantApi.useDeleteRestaurantMutation()

    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    // Open/close modals
    const handleAddModalToggle = () => {
        setIsAddModalOpen(!isAddModalOpen)
        if (isAddModalOpen) {
            reset()
        }
    }

    // Format time
    const formatTime = (timeString: string) => {
        if (!timeString) return 'N/A'
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    }

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Handle form submission for adding restaurant
    // Handle form submission for adding restaurant
const onSubmit: SubmitHandler<RestaurantFormValues> = async (data) => {
    const loadingToastId = toast.loading("Creating new restaurant...")
    try {
        // Add is_active with default value true
        const restaurantData = {
            ...data,
            is_active: true // Default to active when creating
        }
        const res = await createRestaurant(restaurantData).unwrap()
        toast.success("Restaurant created successfully", { id: loadingToastId })
        reset()
        setIsAddModalOpen(false)
    } catch (error: any) {
        toast.error('Failed to create restaurant. Please try again.', error)
        toast.dismiss(loadingToastId)
    }
}

    // Handle restaurant deletion
    const handleDeleteRestaurant = async (restaurant_id: number, restaurantName: string) => {
        Swal.fire({
            title: "Are you sure?",
            html: `You want to delete <strong>${restaurantName}</strong>? This action cannot be undone.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#e11d48",
            confirmButtonText: "Yes, Delete it!",
            background: "#fff1f2",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const loadingToastId = toast.loading("Deleting restaurant...")
                try {
                    const res = await deleteRestaurant({ restaurant_id }).unwrap()
                    toast.success("Restaurant deleted successfully", { id: loadingToastId })
                } catch (error: any) {
                    toast.error('Failed to delete restaurant. Please try again.', error)
                    toast.dismiss(loadingToastId)
                }
            }
        })
    }

    return (
        <AdminDashboardLayout>
            <Toaster position="top-right" richColors />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-100 rounded-xl shadow-sm">
                        <Building className="text-rose-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                            Restaurant Management
                        </h1>
                        <p className="text-rose-500 text-sm mt-1">Manage all restaurants in your system</p>
                    </div>
                </div>
                <button 
                    onClick={handleAddModalToggle}
                    className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                    <Plus size={18} />
                    Add New Restaurant
                </button>
            </div>

            {/* Loading State */}
            {restaurantsLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-rose-500"></div>
                        <p className="mt-4 text-rose-600 font-medium">Loading restaurants...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-8 text-center">
                    <Building className="mx-auto text-rose-500 mb-4" size={52} />
                    <h3 className="text-xl font-bold text-rose-800 mb-2">Error Loading Restaurants</h3>
                    <p className="text-rose-600">Unable to fetch restaurants. Please try again later.</p>
                </div>
            ) : !allRestaurants || allRestaurants.length === 0 ? (
                /* Empty State */
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-md p-12 text-center border border-rose-100">
                    <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building className="text-rose-600" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-800 mb-3">No Restaurants Found</h3>
                    <p className="text-rose-600 mb-6">Start by adding your first restaurant to the system.</p>
                    <button 
                        onClick={handleAddModalToggle}
                        className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    >
                        <Plus size={18} />
                        Add First Restaurant
                    </button>
                </div>
            ) : (
                /* Restaurants Table */
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gradient-to-r from-rose-50 to-orange-50">
                                <tr>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Restaurant ID</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Restaurant Details</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Contact Info</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Hours</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Cuisine</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Status</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Joined</th>
                                    <th className="text-center font-bold text-rose-800 py-4 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRestaurants.map((restaurant: Restaurant, index: number) => (
                                    <tr 
                                        key={restaurant.restaurant_id} 
                                        className={`hover:bg-rose-50 transition-colors duration-200 ${
                                            index % 2 === 0 ? 'bg-rose-25' : 'bg-white'
                                        }`}
                                    >
                                        <td className="py-4 px-6 font-bold text-rose-900">
                                            #{restaurant.restaurant_id}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-bold text-rose-900">
                                                    {restaurant.name}
                                                </div>
                                                <div className="text-sm text-rose-600 flex items-center gap-2 mt-1">
                                                    <MapPin size={14} className="text-rose-500" />
                                                    {restaurant.address}, {restaurant.city}
                                                </div>
                                                {restaurant.description && (
                                                    <div className="text-sm text-rose-500 mt-1 line-clamp-2">
                                                        {restaurant.description}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-rose-700">
                                                    <Phone size={14} className="text-rose-500" />
                                                    {restaurant.phone_number || 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-2 text-rose-600 text-sm">
                                                    <Mail size={12} className="text-rose-500" />
                                                    {restaurant.email || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm text-rose-700">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={12} className="text-rose-500" />
                                                    {formatTime(restaurant.opening_time)} - {formatTime(restaurant.closing_time)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="badge bg-orange-100 text-orange-800 border-orange-200 font-medium">
                                                {restaurant.cuisine_type || 'Various'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`badge font-bold ${
                                                restaurant.is_active 
                                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                                    : 'bg-rose-100 text-rose-800 border-rose-200'
                                            }`}>
                                                {restaurant.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-rose-700 font-medium">
                                            {formatDate(restaurant.created_at)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleDeleteRestaurant(restaurant.restaurant_id, restaurant.name)}
                                                    className="btn btn-ghost btn-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors duration-200"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Restaurants Summary Stats */}
                    <div className="border-t border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 px-6 py-6">
                        <div className="flex flex-wrap gap-8 text-sm">
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Building size={18} className="text-rose-600" />
                                <span className="text-rose-700 font-medium">Total Restaurants: </span>
                                <span className="font-bold text-rose-600 text-lg">{allRestaurants.length}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Utensils size={18} className="text-orange-600" />
                                <span className="text-rose-700 font-medium">Active Restaurants: </span>
                                <span className="font-bold text-orange-600 text-lg">
                                    {allRestaurants.filter((r: Restaurant) => r.is_active).length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Clock size={18} className="text-purple-600" />
                                <span className="text-rose-700 font-medium">Cuisine Types: </span>
                                <span className="font-bold text-purple-600 text-lg">
                                    {new Set(allRestaurants.map((r: Restaurant) => r.cuisine_type)).size}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Restaurant Modal */}
            {isAddModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 shadow-2xl max-w-4xl">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-rose-200">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                                Add New Restaurant
                            </h2>
                            <button 
                                onClick={handleAddModalToggle}
                                className="btn btn-ghost btn-circle text-rose-600 hover:text-rose-700 hover:bg-rose-100"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Restaurant Name</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('name', { required: 'Restaurant name is required' })}
                                    />
                                    {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Cuisine Type</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('cuisine_type', { required: 'Cuisine type is required' })}
                                        placeholder="e.g., Italian, Chinese, Mexican"
                                    />
                                    {errors.cuisine_type && <p className="text-rose-600 text-sm mt-1">{errors.cuisine_type.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-rose-700 mb-2">Description</label>
                                <textarea
                                    className="textarea textarea-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                    rows={3}
                                    {...register('description')}
                                    placeholder="Brief description of the restaurant..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('address', { required: 'Address is required' })}
                                    />
                                    {errors.address && <p className="text-rose-600 text-sm mt-1">{errors.address.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('city', { required: 'City is required' })}
                                    />
                                    {errors.city && <p className="text-rose-600 text-sm mt-1">{errors.city.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('phone_number')}
                                        placeholder="Optional phone number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('email')}
                                        placeholder="Optional email address"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Opening Time</label>
                                    <input
                                        type="time"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('opening_time')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Closing Time</label>
                                    <input
                                        type="time"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('closing_time')}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-rose-200">
                                <button 
                                    onClick={handleAddModalToggle}
                                    className="btn bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200 hover:border-rose-300 transition-colors duration-200"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <SaveIcon size={16} />
                                    Create Restaurant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllRestaurants