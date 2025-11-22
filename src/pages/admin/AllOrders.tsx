import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Package, Clock, CheckCircle, XCircle, Truck, User, Mail } from 'lucide-react'
import { orderApi } from '../../features/api/OrderApi'
import Swal from 'sweetalert2'

const AllOrders: React.FC = () => {

    // RTK Query Hook to fetch all orders
    const { data: AllOrders, isLoading: AllOrderIsLoading, error } = orderApi.useGetAllOrdersQuery()
    console.log("🚀 ~ AllOrders ~ AllOrders:", AllOrders)

    // RTK mutation to update order status
    const [updateOrderStatus] = orderApi.useUpdateOrderStatusMutation()

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Format price
    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`
    }

    // Get status badge
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock, label: 'Pending' },
            confirmed: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle, label: 'Confirmed' },
            preparing: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Package, label: 'Preparing' },
            completed: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: Truck, label: 'Completed' },
            cancelled: { color: 'bg-rose-100 text-rose-800 border-rose-200', icon: XCircle, label: 'Cancelled' },
        }

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
        const IconComponent = config.icon

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
                <IconComponent size={14} className="mr-1" />
                {config.label}
            </span>
        )
    }

    // Get order type icon
    const getOrderTypeIcon = (orderType: string) => {
        const icons = {
            dine_in: '🏠',
            takeaway: '🥡',
            delivery: '🚚'
        }
        return icons[orderType as keyof typeof icons] || '🏠'
    }

    // Handle status update
    const handleStatusUpdate = async (order_id: number, currentStatus: string) => {
        const statusOptions = ['pending', 'confirmed', 'preparing', 'completed', 'cancelled']
        const currentIndex = statusOptions.indexOf(currentStatus)
        const nextStatuses = statusOptions.slice(currentIndex + 1)

        if (nextStatuses.length === 0) {
            Swal.fire({
                title: "Info",
                text: "This order is already at the final status",
                icon: "info",
                confirmButtonColor: "#f97316",
                background: "#fff1f2"
            })
            return
        }

        const { value: newStatus } = await Swal.fire({
            title: 'Update Order Status',
            input: 'select',
            inputOptions: nextStatuses.reduce((acc, status) => {
                acc[status] = status.charAt(0).toUpperCase() + status.slice(1)
                return acc
            }, {} as Record<string, string>),
            inputPlaceholder: 'Select new status',
            showCancelButton: true,
            confirmButtonText: 'Update',
            confirmButtonColor: '#f97316',
            cancelButtonColor: '#e11d48',
            background: '#fff1f2',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please select a status'
                }
            }
        })

        if (newStatus) {
            try {
                const res = await updateOrderStatus({ order_id, status: newStatus }).unwrap()
                Swal.fire({
                    title: "Updated!",
                    text: res.message,
                    icon: "success",
                    confirmButtonColor: "#f97316",
                    background: "#fff1f2"
                })
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update order status",
                    icon: "error",
                    confirmButtonColor: "#f97316",
                    background: "#fff1f2"
                })
            }
        }
    }

    return (
        <AdminDashboardLayout>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-rose-100 rounded-xl shadow-sm">
                    <Package className="text-rose-600" size={28} />
                </div>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                        Orders Management
                    </h1>
                    <p className="text-rose-500 text-sm mt-1">Manage and track all customer orders</p>
                </div>
            </div>

            {/* Loading State */}
            {AllOrderIsLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-rose-500"></div>
                        <p className="mt-4 text-rose-600 font-medium">Loading orders...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-8 text-center">
                    <XCircle className="mx-auto text-rose-500 mb-4" size={52} />
                    <h3 className="text-xl font-bold text-rose-800 mb-2">Error Loading Orders</h3>
                    <p className="text-rose-600">Unable to fetch orders. Please try again later.</p>
                </div>
            ) : !AllOrders || AllOrders.length === 0 ? (
                /* Empty State */
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-md p-12 text-center border border-rose-100">
                    <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="text-rose-600" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-800 mb-3">No Orders Found</h3>
                    <p className="text-rose-600">No orders have been placed yet.</p>
                </div>
            ) : (
                /* Orders Table */
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gradient-to-r from-rose-50 to-orange-50">
                                <tr>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Order ID</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Customer</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Menu Item</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Type</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Status</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Amount</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Date</th>
                                    <th className="text-center font-bold text-rose-800 py-4 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {AllOrders.map((order: any, index: number) => (
                                    <tr 
                                        key={order.order_id} 
                                        className={`hover:bg-rose-50 transition-colors duration-200 ${
                                            index % 2 === 0 ? 'bg-rose-25' : 'bg-white'
                                        }`}
                                    >
                                        <td className="py-4 px-6 font-bold text-rose-900">#{order.order_id}</td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-semibold text-rose-900 flex items-center gap-2">
                                                    <User size={16} className="text-rose-600" />
                                                    {order.customer_name}
                                                </div>
                                                <div className="text-sm text-rose-600 flex items-center gap-2 mt-1">
                                                    <Mail size={14} className="text-rose-500" />
                                                    {order.customer_email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12 ring-2 ring-rose-200">
                                                        <img
                                                            src={order.menuitem_image_url}
                                                            alt={order.menu_item_name}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-rose-900">{order.menu_item_name}</div>
                                                    <div className="text-sm text-rose-600">{order.restaurant_name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="flex items-center gap-2 font-medium text-rose-800">
                                                <span className="text-lg">{getOrderTypeIcon(order.order_type)}</span>
                                                {order.order_type.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                                        <td className="py-4 px-6 font-bold text-rose-600 text-lg">
                                            {formatPrice(order.total_amount)}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-rose-700 font-medium">
                                            {formatDate(order.created_at)}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handleStatusUpdate(order.order_id, order.status)}
                                                className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 btn-sm"
                                                disabled={order.status === 'completed' || order.status === 'cancelled'}
                                            >
                                                Update Status
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Summary Stats */}
                    <div className="border-t border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 px-6 py-6">
                        <div className="flex flex-wrap gap-8 text-sm">
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Clock size={18} className="text-amber-600" />
                                <span className="text-rose-700 font-medium">Pending: </span>
                                <span className="font-bold text-amber-600 text-lg">
                                    {AllOrders.filter((o: any) => o.status === 'pending').length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Package size={18} className="text-purple-600" />
                                <span className="text-rose-700 font-medium">Preparing: </span>
                                <span className="font-bold text-purple-600 text-lg">
                                    {AllOrders.filter((o: any) => o.status === 'preparing').length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <Truck size={18} className="text-emerald-600" />
                                <span className="text-rose-700 font-medium">Completed: </span>
                                <span className="font-bold text-emerald-600 text-lg">
                                    {AllOrders.filter((o: any) => o.status === 'completed').length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm border border-rose-200">
                                <span className="text-rose-700 font-medium">Cancelled: </span>
                                <span className="font-bold text-rose-600 text-lg">
                                    {AllOrders.filter((o: any) => o.status === 'cancelled').length}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-3 rounded-lg shadow-lg">
                                <span className="text-white font-medium">Total Revenue: </span>
                                <span className="font-bold text-white text-lg">
                                    {formatPrice(AllOrders.reduce((sum: number, order: any) => sum + order.total_amount, 0))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllOrders