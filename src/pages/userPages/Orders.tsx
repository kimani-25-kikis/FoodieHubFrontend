import React from 'react';
import DashboardLayout from '../../dashboardDesign/DashBoardLayout';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { orderApi } from '../../features/api/OrderApi';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import type { RootState } from '../../store/store';
import toast from 'react-hot-toast';

const Orders: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

    const { data: userOrders, isLoading, error } =
        orderApi.useGetAllOrderByCustomerIdQuery(
            isAuthenticated ? { customer_id: user!.user_id } : skipToken
        );

    const [cancelOrder, { isLoading: cancelling }] =
        orderApi.useCancelOrderMutation();

    const handleCancel = async (order_id: number) => {
        try {
            await cancelOrder({ order_id }).unwrap();
            toast.success("Order cancelled successfully");
        } catch (err: any) {
            toast.error(err?.data?.error || "Failed to cancel order");
        }
    };

    // Status badge styles
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-orange-100 text-orange-700 border-orange-300', icon: Clock, label: 'Pending' },
            confirmed: { color: 'bg-rose-100 text-rose-700 border-rose-300', icon: CheckCircle, label: 'Confirmed' },
            preparing: { color: 'bg-orange-200 text-orange-800 border-orange-400', icon: Package, label: 'Preparing' },
            ready: { color: 'bg-green-100 text-green-700 border-green-300', icon: CheckCircle, label: 'Ready' },
            delivered: { color: 'bg-purple-100 text-purple-700 border-purple-300', icon: Truck, label: 'Delivered' },
            cancelled: { color: 'bg-red-100 text-red-700 border-red-300', icon: XCircle, label: 'Cancelled' },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <span
                className={`inline-flex items-center gap-1 px-3 py-1 border rounded-full text-sm font-medium ${config.color}`}
            >
                <IconComponent size={14} />
                {config.label}
            </span>
        );
    };

    const getOrderTypeIcon = (type: string) => {
        const icons = {
            dine_in: '🍽️',
            takeaway: '🥡',
            delivery: '🚚',
        };
        return icons[type as keyof typeof icons] || '🍽️';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-rose-200 rounded-xl">
                    <Package className="text-rose-700" size={24} />
                </div>
                <h1 className="text-3xl font-bold text-rose-800">My Orders</h1>
            </div>

            {/* Loading */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <span className="loading loading-spinner loading-lg text-rose-600"></span>
                </div>
            ) : error ? (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center">
                    <XCircle size={48} className="mx-auto text-rose-600 mb-3" />
                    <h3 className="text-xl font-semibold text-rose-800 mb-1">Error Loading Orders</h3>
                    <p className="text-rose-600">Something went wrong. Please try again.</p>
                </div>
            ) : !userOrders || userOrders.length === 0 ? (
                <div className="bg-white border border-rose-200 rounded-2xl p-12 text-center shadow-md">
                    <Package className="mx-auto text-rose-400 mb-4" size={64} />
                    <h3 className="text-xl font-semibold text-rose-800 mb-2">No Orders Yet</h3>
                    <p className="text-rose-600 mb-4">You haven’t placed any orders yet.</p>
                    <button
                        onClick={() => (window.location.href = '/meals')}
                        className="btn bg-rose-600 text-white hover:bg-rose-700"
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                // Masonry-style layout
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {userOrders.map((order: any) => (
                        <div
                            key={order.order_id}
                            className="break-inside-avoid p-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm border border-rose-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Top */}
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-rose-900">
                                    Order #{order.order_id}
                                </h3>
                                {getStatusBadge(order.status)}
                            </div>

                            {/* Item name */}
                            <h4 className="text-xl font-semibold text-rose-800 mb-1">
                                {order.menu_item_name}
                            </h4>
                            <p className="text-rose-600 text-sm mb-4">
                                {order.restaurant_name}
                            </p>

                            {/* Info */}
                            <div className="space-y-2 text-sm mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1 text-rose-700 font-medium">
                                        {getOrderTypeIcon(order.order_type)}{' '}
                                        {order.order_type.replace('_', ' ').toUpperCase()}
                                    </span>
                                    <span className="font-bold text-orange-600 text-lg">
                                        ${order.total_amount}
                                    </span>
                                </div>

                                <div className="flex justify-between text-rose-600">
                                    <span>Order Date:</span>
                                    <span>{formatDate(order.created_at)}</span>
                                </div>
                            </div>

                            {/* Button section */}
                            <div className="mt-4">
                                {order.status === 'pending' && (
                                    <button
                                        disabled={cancelling}
                                        onClick={() => handleCancel(order.order_id)}
                                        className="w-full py-2 rounded-lg border border-rose-400 text-rose-700 hover:bg-rose-50 transition"
                                    >
                                        {cancelling ? 'Cancelling...' : 'Cancel Order'}
                                    </button>
                                )}

                                {order.status === 'completed' && (
                                    <button className="w-full py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
                                        Reorder
                                    </button>
                                )}

                                {(order.status === 'confirmed' ||
                                    order.status === 'preparing') && (
                                    <div className="text-center text-rose-500 text-sm py-2">
                                        <Clock size={15} className="inline mr-1" />
                                        Order in progress
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default Orders;
