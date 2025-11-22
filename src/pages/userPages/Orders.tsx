import React from 'react';
import DashboardLayout from '../../dashboardDesign/DashBoardLayout';
import { Package, Clock, CheckCircle, XCircle, Truck, MapPin, Calendar, CreditCard, RotateCcw } from 'lucide-react';
import { orderApi } from '../../features/api/OrderApi';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/query';
import type { RootState } from '../../store/store';
import Swal from 'sweetalert2';

const Orders: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);

    const { data: userOrders, isLoading, error, refetch } =
        orderApi.useGetAllOrderByCustomerIdQuery(
            isAuthenticated ? { customer_id: user!.user_id } : skipToken
        );

    const [cancelOrder, { isLoading: cancelling }] =
        orderApi.useCancelOrderMutation();

    const handleCancel = async (order_id: number) => {
        Swal.fire({
            title: "Cancel Order?",
            html: "Are you sure you want to cancel this order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#e11d48",
            confirmButtonText: "Yes, Cancel Order",
            background: "#fff1f2",
            customClass: {
                popup: 'rounded-2xl border border-rose-200'
            }
        }).then(async(result) => {
            const updatePayLoad = {
                order_id: order_id,
                status: "cancelled"
            }
            if(result.isConfirmed){
               try {
                    const res = await cancelOrder(updatePayLoad).unwrap();
                    Swal.fire({
                        title: "Order Cancelled!",
                        text: res.message,
                        icon: "success",
                        confirmButtonColor: "#f97316",
                        background: "#fff1f2"
                    });
                    refetch();
                } catch (error) {
                    Swal.fire({
                        title: "Something went wrong",
                        text: "Please try again",
                        icon: "error",
                        confirmButtonColor: "#f97316",
                        background: "#fff1f2"
                    });
                }  
            }
        });
    };

    // Enhanced status badge with progress indicators
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { 
                color: 'bg-amber-100 text-amber-800 border-amber-200', 
                icon: Clock, 
                label: 'Pending',
                progress: 25
            },
            confirmed: { 
                color: 'bg-blue-100 text-blue-800 border-blue-200', 
                icon: CheckCircle, 
                label: 'Confirmed',
                progress: 50
            },
            preparing: { 
                color: 'bg-orange-100 text-orange-800 border-orange-200', 
                icon: Package, 
                label: 'Preparing',
                progress: 75
            },
            completed: { 
                color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
                icon: CheckCircle, 
                label: 'Completed',
                progress: 100
            },
            cancelled: { 
                color: 'bg-rose-100 text-rose-800 border-rose-200', 
                icon: XCircle, 
                label: 'Cancelled',
                progress: 0
            },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold border ${config.color}`}>
                    <IconComponent size={14} />
                    {config.label}
                </span>
                {status !== 'cancelled' && (
                    <div className="flex-1 bg-rose-100 rounded-full h-2">
                        <div 
                            className="bg-gradient-to-r from-rose-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${config.progress}%` }}
                        ></div>
                    </div>
                )}
            </div>
        );
    };

    const getOrderTypeIcon = (type: string) => {
        const icons = {
            dine_in: { icon: '🏠', label: 'Dine In', color: 'bg-purple-100 text-purple-700' },
            takeaway: { icon: '🥡', label: 'Takeaway', color: 'bg-amber-100 text-amber-700' },
            delivery: { icon: '🚚', label: 'Delivery', color: 'bg-blue-100 text-blue-700' },
        };
        return icons[type as keyof typeof icons] || icons.dine_in;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTimeAgo = (dateString: string) => {
        const now = new Date();
        const orderDate = new Date(dateString);
        const diffInHours = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    };

    return (
        <DashboardLayout>
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl shadow-sm">
                        <Package className="text-rose-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                            My Orders
                        </h1>
                        <p className="text-rose-500 text-sm mt-1">Track and manage your food orders</p>
                    </div>
                </div>
                <button 
                    onClick={() => refetch()}
                    className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <RotateCcw size={18} />
                    Refresh
                </button>
            </div>

            {/* Order Statistics */}
            {userOrders && userOrders.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-4 border border-rose-200 text-center">
                        <div className="text-2xl font-bold text-rose-700">{userOrders.length}</div>
                        <div className="text-sm text-rose-600">Total Orders</div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-4 border border-rose-200 text-center">
                        <div className="text-2xl font-bold text-orange-700">
                            ${userOrders.reduce((sum: number, order: any) => sum + order.total_amount, 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-orange-600">Total Spent</div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-4 border border-rose-200 text-center">
                        <div className="text-2xl font-bold text-blue-700">
                            {userOrders.filter((order: any) => order.status === 'completed').length}
                        </div>
                        <div className="text-sm text-blue-600">Completed</div>
                    </div>
                    <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-4 border border-rose-200 text-center">
                        <div className="text-2xl font-bold text-amber-700">
                            {userOrders.filter((order: any) => ['pending', 'confirmed', 'preparing'].includes(order.status)).length}
                        </div>
                        <div className="text-sm text-amber-600">Active</div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-rose-500 mb-4"></div>
                        <p className="text-rose-600 font-medium">Loading your orders...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-12 text-center">
                    <XCircle className="mx-auto text-rose-500 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-rose-800 mb-2">Error Loading Orders</h3>
                    <p className="text-rose-600 mb-6">Unable to load your orders. Please try again.</p>
                    <button 
                        onClick={() => refetch()}
                        className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0"
                    >
                        Try Again
                    </button>
                </div>
            ) : !userOrders || userOrders.length === 0 ? (
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-md p-16 text-center border border-rose-100">
                    <div className="bg-rose-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="text-rose-600" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-800 mb-3">No Orders Yet</h3>
                    <p className="text-rose-600 mb-8 max-w-md mx-auto">
                        You haven't placed any orders yet. Start your culinary journey with our delicious menu!
                    </p>
                    <button
                        onClick={() => (window.location.href = '/meals')}
                        className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-3"
                    >
                        🍽️ Explore Menu
                    </button>
                </div>
            ) : (
                // Enhanced Grid Layout
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {userOrders.map((order: any) => {
                        const orderType = getOrderTypeIcon(order.order_type);
                        return (
                            <div
                                key={order.order_id}
                                className="bg-white rounded-2xl shadow-sm border border-rose-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group"
                            >
                                {/* Order Header */}
                                <div className="bg-gradient-to-r from-rose-50 to-orange-50 p-6 border-b border-rose-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-rose-900">
                                                Order #{order.order_id}
                                            </h3>
                                            <p className="text-rose-600 text-sm flex items-center gap-1 mt-1">
                                                <Calendar size={14} />
                                                {getTimeAgo(order.created_at)}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${orderType.color}`}>
                                            {orderType.icon} {orderType.label}
                                        </span>
                                    </div>
                                    {getStatusBadge(order.status)}
                                </div>

                                {/* Order Content */}
                                <div className="p-6">
                                    {/* Restaurant Info */}
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-rose-25 rounded-lg">
                                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                                            <MapPin className="text-rose-600" size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-rose-900">{order.restaurant_name}</h4>
                                            <p className="text-rose-600 text-sm">Restaurant</p>
                                        </div>
                                    </div>

                                    {/* Menu Item */}
                                    <div className="mb-4">
                                        <h4 className="text-lg font-bold text-rose-800 mb-2">
                                            {order.menu_item_name}
                                        </h4>
                                        <div className="flex items-center justify-between text-sm text-rose-600">
                                            <span>Order Date</span>
                                            <span>{formatDate(order.created_at)}</span>
                                        </div>
                                    </div>

                                    {/* Price Section */}
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-lg border border-rose-200">
                                        <div className="flex items-center gap-2 text-rose-700">
                                            <CreditCard size={16} />
                                            <span className="font-semibold">Total Amount</span>
                                        </div>
                                        <span className="text-2xl font-bold text-orange-600">
                                            ${order.total_amount}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-6 space-y-3">
                                        {order.status === 'pending' && (
                                            <button
                                                disabled={cancelling}
                                                onClick={() => handleCancel(order.order_id)}
                                                className="w-full py-3 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-300 hover:border-rose-400 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                                            >
                                                <XCircle size={18} />
                                                {cancelling ? 'Cancelling...' : 'Cancel Order'}
                                            </button>
                                        )}

                                        {order.status === 'completed' && (
                                            <button 
                                                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                                            >
                                                <RotateCcw size={18} />
                                                Order Again
                                            </button>
                                        )}

                                        {['confirmed', 'preparing'].includes(order.status) && (
                                            <div className="text-center py-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                                                <Clock size={18} className="inline mr-2" />
                                                Order in progress - We're preparing your food!
                                            </div>
                                        )}

                                        {order.status === 'cancelled' && (
                                            <div className="text-center py-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
                                                <XCircle size={18} className="inline mr-2" />
                                                Order was cancelled
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardLayout>
    );
};

export default Orders;