import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../dashboardDesign/DashBoardLayout'
import { User, Edit, Save, X, Mail, Phone, Calendar, Shield, Check, Star, Award, Clock } from 'lucide-react'
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
            toast.success("Profile updated successfully!", { id: loader })
        } catch (e) {
            toast.error("Failed to update profile. Please try again.", { id: loader })
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

    const getUserTypeBadge = (userType: string) => {
        const typeConfig = {
            admin: { color: 'bg-rose-100 text-rose-800 border-rose-200', icon: Shield, label: 'Admin' },
            customer: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: User, label: 'Customer' },
            vendor: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Star, label: 'Vendor' }
        }

        const config = typeConfig[userType as keyof typeof typeConfig] || typeConfig.customer
        const IconComponent = config.icon

        return (
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${config.color}`}>
                <IconComponent size={16} />
                {config.label}
            </span>
        )
    }

    return (
        <DashboardLayout>
            <Toaster richColors position="top-right" />

            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl shadow-sm">
                        <User className="text-rose-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                            My Profile
                        </h1>
                        <p className="text-rose-500 text-sm mt-1">Manage your personal information and preferences</p>
                    </div>
                </div>

                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                        <Edit size={18} /> Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="btn bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200 hover:border-rose-300 transition-colors duration-200 flex items-center gap-2"
                        >
                            <X size={18} /> Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!hasChanges || isUpdating}
                            className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                        >
                            {isUpdating ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : <Save size={18} />}
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* Auth check */}
            {!isAuthenticated || !user ? (
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-12 text-center">
                    <User className="mx-auto text-rose-500 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-rose-800 mb-2">Access Required</h3>
                    <p className="text-rose-600">Please sign in to view your profile.</p>
                </div>
            ) : isLoadingUserData ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-rose-500 mb-4"></div>
                        <p className="text-rose-600 font-medium">Loading your profile...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Enhanced Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-8 text-center border border-rose-100 shadow-lg">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-200 to-orange-200 flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white">
                                <User size={60} className="text-rose-600" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-rose-900 mb-2">
                                {user.first_name} {user.last_name}
                            </h2>
                            <p className="text-rose-600 mb-4 flex items-center justify-center gap-2">
                                <Mail size={16} />
                                {user.email}
                            </p>

                            <div className="mb-6">
                                {getUserTypeBadge(user.user_type)}
                            </div>

                            {/* Member Since */}
                            <div className="bg-white rounded-xl p-4 border border-rose-200">
                                <div className="flex items-center justify-center gap-2 text-rose-700 mb-2">
                                    <Calendar size={16} />
                                    <span className="font-semibold">Member Since</span>
                                </div>
                                <p className="text-rose-600 text-sm">
                                    {userData?.created_at ? formatDate(userData.created_at) : "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-lg mt-6">
                            <h3 className="text-lg font-semibold text-rose-900 mb-4 flex items-center gap-2">
                                <Award className="text-orange-500" size={20} />
                                Profile Completion
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-rose-700">Basic Info</span>
                                    <span className="text-rose-600 font-semibold">100%</span>
                                </div>
                                <div className="w-full bg-rose-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                                
                                <div className="flex justify-between text-sm mt-4">
                                    <span className="text-rose-700">Contact Info</span>
                                    <span className="text-rose-600 font-semibold">{userData?.phone_number ? '100%' : '50%'}</span>
                                </div>
                                <div className="w-full bg-rose-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full" style={{ width: userData?.phone_number ? '100%' : '50%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Editable Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 border border-rose-100 shadow-lg">

                            <h3 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent mb-2">
                                Personal Information
                            </h3>
                            <p className="text-rose-500 text-sm mb-6">Update your personal details and contact information</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">First Name</label>
                                    {isEditing ? (
                                        <input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 rounded-xl"
                                            placeholder="Enter your first name"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-200 text-rose-900 font-medium">
                                            {user.first_name}
                                        </div>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 rounded-xl"
                                            placeholder="Enter your last name"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-200 text-rose-900 font-medium">
                                            {userData?.last_name}
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-rose-700 mb-2 flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 rounded-xl"
                                            placeholder="Enter your email address"
                                        />
                                    ) : (
                                        <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-200 text-rose-900 font-medium">
                                            {userData?.email}
                                        </div>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-rose-700 mb-2 flex items-center gap-2">
                                        <Phone size={16} /> Phone Number
                                    </label>
                                    {isEditing ? (
                                        <input
                                            name="phone_number"
                                            type="tel"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 rounded-xl"
                                            placeholder="Enter your phone number"
                                        />
                                    ) : (
                                        <div className={`p-3 rounded-xl border font-medium ${userData?.phone_number ? 'bg-gradient-to-r from-rose-50 to-orange-50 border-rose-200 text-rose-900' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                                            {userData?.phone_number || 'Not provided'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Account Information Section */}
                            <div className="mt-8 pt-6 border-t border-rose-200">
                                <h4 className="text-lg font-semibold text-rose-900 mb-4 flex items-center gap-2">
                                    <Shield className="text-rose-600" size={20} />
                                    Account Information
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-rose-700 mb-2">User ID</label>
                                        <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-200">
                                            <code className="text-rose-700 font-mono">#{userData?.user_id}</code>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-rose-700 mb-2">Account Type</label>
                                        <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-200 text-rose-900 font-medium capitalize">
                                            {userData?.user_type}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Status Panel */}
                        <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-8 shadow-lg mt-6">
                            <h3 className="text-xl font-bold text-rose-900 mb-6 flex items-center gap-3">
                                <Check className="text-rose-600" size={24} /> 
                                Account Status
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-rose-200 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Check className="text-emerald-600" size={24} />
                                    </div>
                                    <div className="text-lg font-semibold text-emerald-700 mb-1">Verified</div>
                                    <p className="text-rose-600 text-sm">Email Verified</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-rose-200 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Star className="text-orange-600" size={24} />
                                    </div>
                                    <div className="text-lg font-semibold text-orange-700 mb-1">Active</div>
                                    <p className="text-rose-600 text-sm">Account Status</p>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-rose-200 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Clock className="text-rose-600" size={24} />
                                    </div>
                                    <div className="text-lg font-semibold text-rose-700 mb-1">Member</div>
                                    <p className="text-rose-600 text-sm">
                                        Since {userData?.created_at ? formatDate(userData.created_at) : "N/A"}
                                    </p>
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