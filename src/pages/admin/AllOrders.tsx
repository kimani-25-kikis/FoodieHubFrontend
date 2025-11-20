import React from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { FileEdit, Package, Trash2 } from 'lucide-react'
import { orderApi } from '../../features/api/OrderApi'
import { PuffLoader } from 'react-spinners'
import type { AllOrderData } from '../../types/Types'


const getStatusBadge = (status: any) => {
  switch (status) {
    case "confirmed": return "badge-success";
    case "canceled": return "badge-error";
    case "pending": return "badge-warning";
    default: return "badge-primary";
  }
}

const AllOrders: React.FC = () => {

    // RTK QUery Hook \
    const {data:orderData, isLoading:AllOrderIsLoading, error:isOrderError}= orderApi.useGetAllOrdersQuery() 
     
       
    return (
        <AdminDashboardLayout>
           <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-linear-to-br from-rose-100 to-orange-100 rounded-xl">
                    <Package className="text-rose-600" size={28} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-rose-900">Manage {orderData?.length} Orders </h1>
            </div>

            {/* Table Section */}
            <div className="bg-linear-to-b from-rose-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-rose-200">
                {/* <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-rose-900">All Orders</h3>
                    <div className="text-sm text-rose-600 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                        {orderData?.length} Orders
                    </div>
                </div> */}

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-rose-200 bg-white">
                    <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                Order Id
              </th>
              <th>Restaurant Name</th>
              <th>Menu Item</th>
              <th>Orderd By</th>
              <th>Amount</th>
              <th>Order Date</th>
              <th>Order Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            { isOrderError ? (
                <div>
                  error while fetching your order..try again
                </div>
              ) : AllOrderIsLoading ? (
                <PuffLoader color="#0aff13" />
              ) : orderData?.length === 0 ? (
                <tr>
                  <div>No orders available 😎</div>
                </tr>
              ) : (
                orderData?.map((order: AllOrderData) => (
                  <tr key={order.order_id}>
                    <th>
                      {order.order_id}
                    </th>
                              <td>{order.restaurant_name}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={order.menuitem_image_url}
                              alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{order.menu_item_name}</div>
                          {/* <div className="text-sm opacity-50">{order.ca}</div> */}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{order.customer_name}</div>
                          <div className="text-sm opacity-50">{order.customer_email}</div>
                        </div>
                      </div>
                    </td>
                    <td>Ksh {order.total_amount}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td> {order.order_type}</td>
                    <td>  <div className={`badge badge-outline ${getStatusBadge(order.status)} `}>
                      {order.status}
                    </div>
                    </td>
                    <td>
                      <button className="text-blue-700 hover:text-blue-500 btn btn-sm btn-outline"
                        // onClick={() => handleEdit(order.orderId)}
                      >
                        <FileEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-600 btn btn-sm ml-2 btn-outline"
                        // onClick={() => handleDelete(order.orderId)}
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-rose-600">
                        Showing 1 to 3 of 12 entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            Previous
                        </button>
                        <button className="bg-gradient-to-r from-rose-600 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                            1
                        </button>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            2
                        </button>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            3
                        </button>
                        <button className="bg-white border border-rose-200 text-rose-700 px-4 py-2 rounded-lg hover:bg-rose-50 transition-colors duration-200">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    )
}

export default AllOrders