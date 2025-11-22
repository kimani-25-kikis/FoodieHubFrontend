import React, { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Users, Mail, Phone, Calendar, Edit, Trash2, UserCheck, UserX, Shield, Plus, X, SaveIcon } from 'lucide-react'
import { useForm, type SubmitHandler } from "react-hook-form"
import { userApi } from '../../features/api/UserApi'
import type { User } from '../../types/Types'
import { Toaster, toast } from "sonner"
import Swal from 'sweetalert2'

type EditFormValues = {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    user_type: string;
}

const AllCustomers: React.FC = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EditFormValues>()

    // RTK Query Hook to fetch all users
    const { data: allUsers, isLoading: usersLoading, error } = userApi.useGetAllUsersQuery()
    
    // RTK Mutation Hooks
    const [updateUserType] = userApi.useUpdateUserTypeStatusMutation()
    const [updateUserDetails] = userApi.useUpdateUsersDetailsMutation()

    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    // Open/close edit modal
    const handleEditModalToggle = () => {
        setIsEditModalOpen(!isEditModalOpen)
        if (isEditModalOpen) {
            reset()
            setSelectedUser(null)
        }
    }

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    // Get user type badge
    const getUserTypeBadge = (userType: string) => {
        const typeConfig = {
            admin: { color: 'bg-rose-100 text-rose-800 border-rose-200', icon: Shield, label: 'Admin' },
            customer: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: Users, label: 'Customer' },
            vendor: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: UserCheck, label: 'Vendor' }
        }

        const config = typeConfig[userType as keyof typeof typeConfig] || typeConfig.customer
        const IconComponent = config.icon

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
                <IconComponent size={14} className="mr-1" />
                {config.label}
            </span>
        )
    }

    // Edit user function
    const openEditModal = (user: User) => {
        setSelectedUser(user)
        reset()
        // Set form values with selected user data
        setValue('first_name', user.first_name)
        setValue('last_name', user.last_name)
        setValue('email', user.email)
        setValue('phone_number', user.phone_number || '')
        setValue('user_type', user.user_type)
        setIsEditModalOpen(true)
    }

    // Handle user type update
    const handleUserTypeUpdate = async (user_id: number, currentType: string, userName: string) => {
        const { value: newType } = await Swal.fire({
            title: 'Update User Role',
            html: `Update role for <strong>${userName}</strong>?`,
            input: 'select',
            inputOptions: {
                customer: 'Customer',
                vendor: 'Vendor', 
                admin: 'Admin'
            },
            inputPlaceholder: 'Select new role',
            inputValue: currentType,
            showCancelButton: true,
            confirmButtonText: 'Update Role',
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#e11d48',
            background: '#fff1f2',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please select a role'
                }
            }
        })

        if (newType) {
            const loadingToastId = toast.loading("Updating user role...")
            try {
                const res = await updateUserType({ user_id, user_type: newType }).unwrap()
                toast.success("User role updated successfully", { id: loadingToastId })
            } catch (error: any) {
                toast.error('Failed to update user role. Please try again.', error)
                toast.dismiss(loadingToastId)
            }
        }
    }

    // Handle form submission for editing user
    const handleEditSubmit: SubmitHandler<EditFormValues> = async (data) => {
        if (!selectedUser) return

        const loadingToastId = toast.loading("Updating user details...")
        try {
            const res = await updateUserDetails({ 
                user_id: selectedUser.user_id, 
                ...data 
            }).unwrap()
            
            toast.success("User details updated successfully", { id: loadingToastId })
            reset()
            setIsEditModalOpen(false)
            setSelectedUser(null)
        } catch (error: any) {
            toast.error('Failed to update user details. Please try again.', error)
            toast.dismiss(loadingToastId)
        }
    }

    // Handle user deletion
    const handleDeleteUser = async (user_id: number, userName: string) => {
        Swal.fire({
            title: "Are you sure?",
            html: `You want to delete user <strong>${userName}</strong>?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#e11d48",
            confirmButtonText: "Yes, Delete it!",
            background: "#fff1f2",
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Note: You'll need to add delete mutation to your userApi
                toast.info("Delete functionality will be implemented with the API")
                // Implement delete mutation when available
                // try {
                //     const res = await deleteUser(user_id).unwrap()
                //     Swal.fire({
                //         title: "Deleted!",
                //         text: res.message,
                //         icon: "success",
                //         confirmButtonColor: "#f97316",
                //         background: "#fff1f2"
                //     })
                // } catch (error) {
                //     Swal.fire({
                //         title: "Something went wrong",
                //         text: "Please Try Again",
                //         icon: "error",
                //         confirmButtonColor: "#f97316",
                //         background: "#fff1f2"
                //     })
                // }
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
                        <Users className="text-rose-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                            Customer Management
                        </h1>
                        <p className="text-rose-500 text-sm mt-1">Manage all registered users and their roles</p>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {usersLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-rose-500"></div>
                        <p className="mt-4 text-rose-600 font-medium">Loading users...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-8 text-center">
                    <UserX className="mx-auto text-rose-500 mb-4" size={52} />
                    <h3 className="text-xl font-bold text-rose-800 mb-2">Error Loading Users</h3>
                    <p className="text-rose-600">Unable to fetch users. Please try again later.</p>
                </div>
            ) : !allUsers || allUsers.length === 0 ? (
                /* Empty State */
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-md p-12 text-center border border-rose-100">
                    <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="text-rose-600" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-800 mb-3">No Users Found</h3>
                    <p className="text-rose-600">No users have registered yet.</p>
                </div>
            ) : (
                /* Users Table */
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gradient-to-r from-rose-50 to-orange-50">
                                <tr>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">User ID</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">User Details</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Contact Info</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Role</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Joined Date</th>
                                    <th className="text-center font-bold text-rose-800 py-4 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.map((user: User, index: number) => (
                                    <tr 
                                        key={user.user_id} 
                                        className={`hover:bg-rose-50 transition-colors duration-200 ${
                                            index % 2 === 0 ? 'bg-rose-25' : 'bg-white'
                                        }`}
                                    >
                                        <td className="py-4 px-6 font-bold text-rose-900">
                                            #{user.user_id}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-bold text-rose-900">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className="text-sm text-rose-600">
                                                    User ID: {user.user_id}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-rose-700">
                                                    <Mail size={14} className="text-rose-500" />
                                                    {user.email}
                                                </div>
                                                {user.phone_number && (
                                                    <div className="flex items-center gap-2 text-rose-600 text-sm">
                                                        <Phone size={12} className="text-rose-500" />
                                                        {user.phone_number}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {getUserTypeBadge(user.user_type)}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-rose-700 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-rose-500" />
                                                {user.created_at ? formatDate(user.created_at) : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="btn btn-ghost btn-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors duration-200"
                                                >
                                                    <Edit size={16} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleUserTypeUpdate(user.user_id, user.user_type, `${user.first_name} ${user.last_name}`)}
                                                    className="btn btn-ghost btn-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors duration-200"
                                                >
                                                    <Shield size={16} />
                                                    Role
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(user.user_id, `${user.first_name} ${user.last_name}`)}
                                                    className="btn btn-ghost btn-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
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

                    {/* Users Summary Stats */}
                    <div className="border-t border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 px-6 py-6">
                        <div className="flex flex-wrap gap-8 text-sm">
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Users size={18} className="text-rose-600" />
                                <span className="text-rose-700 font-medium">Total Users: </span>
                                <span className="font-bold text-rose-600 text-lg">{allUsers.length}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <UserCheck size={18} className="text-orange-600" />
                                <span className="text-rose-700 font-medium">Customers: </span>
                                <span className="font-bold text-orange-600 text-lg">
                                    {allUsers.filter((u: User) => u.user_type === 'customer').length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Shield size={18} className="text-purple-600" />
                                <span className="text-rose-700 font-medium">Admins: </span>
                                <span className="font-bold text-purple-600 text-lg">
                                    {allUsers.filter((u: User) => u.user_type === 'admin').length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <UserCheck size={18} className="text-blue-600" />
                                <span className="text-rose-700 font-medium">Vendors: </span>
                                <span className="font-bold text-blue-600 text-lg">
                                    {allUsers.filter((u: User) => u.user_type === 'vendor').length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && selectedUser && (
                <div className="modal modal-open">
                    <div className="modal-box bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 shadow-2xl max-w-2xl">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-rose-200">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                                Edit User Details
                            </h2>
                            <button 
                                onClick={handleEditModalToggle}
                                className="btn btn-ghost btn-circle text-rose-600 hover:text-rose-700 hover:bg-rose-100"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('first_name', { required: 'First name is required' })}
                                    />
                                    {errors.first_name && <p className="text-rose-600 text-sm mt-1">{errors.first_name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-rose-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                        {...register('last_name', { required: 'Last name is required' })}
                                    />
                                    {errors.last_name && <p className="text-rose-600 text-sm mt-1">{errors.last_name.message}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-rose-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className="text-rose-600 text-sm mt-1">{errors.email.message}</p>}
                            </div>
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
                                <label className="block text-sm font-semibold text-rose-700 mb-2">User Role</label>
                                <select
                                    className="select select-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                    {...register('user_type', { required: 'User type is required' })}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="vendor">Vendor</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.user_type && <p className="text-rose-600 text-sm mt-1">{errors.user_type.message}</p>}
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-rose-200">
                                <button 
                                    onClick={handleEditModalToggle}
                                    type="button" 
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
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllCustomers