import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../dashboardDesign/DashBoardLayout'
import { User, Edit, Save, X, Mail, Phone, Calendar, Shield, Check } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { userApi } from '../../features/api/UserApi'
import { toast, Toaster } from 'sonner'
import { skipToken } from '@reduxjs/toolkit/query';


const UserProfile: React.FC = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.authSlice)
    const [updateUserDetails, { isLoading: isUpdating }] = userApi.useUpdateUsersDetailsMutation()
    const { data: userData, isLoading: isLoadingUserData } = userApi.useGetUserByIdQuery(
        user && isAuthenticated ? { user_id: user.user_id } : skipToken,
        { skip: !isAuthenticated })

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    })
    const [originalData, setOriginalData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
    })

    useEffect(() => {
        if (userData) {
            const info = {
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                email: userData.email || '',
                phone_number: userData.phone_number || ''
            }
            setFormData(info)
            setOriginalData(info)
        }
    }, [userData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async () => {
        if (!user?.user_id) return

        const loader = toast.loading("Updating profile...")

        try {
            await updateUserDetails({
                user_id: user.user_id,
                ...formData
            }).unwrap()

            setOriginalData(formData)
            setIsEditing(false)
            toast.success("Profile updated!", { id: loader })
        } catch (e) {
            toast.error("Failed to update profile.", { id: loader })
        }
    }

    const handleCancel = () => {
        setFormData(originalData)
        setIsEditing(false)
    }

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData)

    return (
        <DashboardLayout>
            <Toaster richColors position="top-right" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-100 rounded-xl shadow-sm">
                        <User size={26} className="text-rose-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                </div>

                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2 rounded-xl border border-rose-500 
                        text-rose-600 hover:bg-rose-600 hover:text-white transition-all flex items-center gap-2"
                    >
                        <Edit size={16} /> Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="px-5 py-2 rounded-xl border border-gray-400 text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                            <X size={16} /> Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges || isUpdating}
                            className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition flex items-center gap-2 disabled:opacity-50"
                        >
                            {isUpdating ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : <Save size={16} />}
                            Save
                        </button>
                    </div>
                )}
            </div>

            {/* Auth check */}
            {!isAuthenticated || !user ? (
                <div className="bg-rose-50 border border-rose-200 p-8 rounded-xl text-center">
                    <h3 className="text-xl text-rose-700 font-semibold mb-2">Access Denied</h3>
                    <p className="text-rose-600">You must sign in to view your profile.</p>
                </div>
            ) : isLoadingUserData ? (
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner text-rose-600"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Profile Card */}
                    <div className="">
                        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border border-rose-100">
                            <div className="w-28 h-28 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4 shadow-inner">
                                <User size={50} className="text-rose-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {user.first_name} {user.last_name}
                            </h2>
                            <p className="text-gray-600">{user.email}</p>

                            <div className="mt-3 px-3 py-1 inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-sm">
                                <Shield size={14} className="mr-1" />
                                {user.user_type?.toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Editable Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-lg rounded-2xl p-8 border border-rose-100">

                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                Personal Information
                            </h3>

                            <div className="space-y-5">

                                {/* First Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    {isEditing ? (
                                        <input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full rounded-xl focus:border-rose-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-xl">{user.first_name}</div>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full rounded-xl focus:border-rose-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-xl">{userData?.last_name}</div>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <Mail size={16} /> Email
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full rounded-xl focus:border-rose-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-xl">{userData?.email}</div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <Phone size={16} /> Phone
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="phone_number"
                                            type="tel"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full rounded-xl focus:border-rose-500"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gray-50 rounded-xl">{userData?.phone_number}</div>
                                    )}
                                </div>

                                {/* Account Info */}
                                <div className="pt-4 border-t border-gray-200">
                                    <h4 className="text-md font-semibold text-gray-900 mb-3">Account Info</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-700 flex items-center gap-1">
                                                <Calendar size={16} /> Member Since
                                            </label>
                                            <div className="p-3 bg-gray-50 rounded-xl">
                                                {userData?.created_at ? formatDate(userData.created_at) : "Unknown"}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-700">User ID</label>
                                            <div className="p-3 bg-gray-50 rounded-xl font-mono text-sm">
                                                #{userData?.user_id}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Status Panel */}
                    <div className="lg:col-span-3">
                        <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl shadow-sm">
                            <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                                <Check size={20} /> Account Status
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow text-center">
                                    <div className="text-2xl font-bold text-orange-600">✓</div>
                                    <p className="text-gray-600 text-sm mt-1">Email Verified</p>
                                </div>

                                <div className="bg-white p-4 rounded-xl shadow text-center">
                                    <div className="text-orange-600 text-xl font-bold">Active</div>
                                    <p className="text-gray-600 text-sm mt-1">Account Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </DashboardLayout>
    )
}

export default UserProfile
