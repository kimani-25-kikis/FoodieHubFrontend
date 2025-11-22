import React, { useState } from 'react'
import AdminDashboardLayout from '../../dashboardDesign/AdminDashboardLayout'
import { Clipboard, Edit, Trash2, Plus, X, SaveIcon } from 'lucide-react'
import { useForm, type SubmitHandler } from "react-hook-form";
import { menuItemApi } from '../../features/api/MenuItemApi'
import type { MenuItem } from '../../types/Types'
import { Toaster, toast } from "sonner";
import { categoryApi } from '../../features/api/CategoryApi';
import Swal from 'sweetalert2';

type AddFormValues = {
    name: string;
    description: string;
    restaurant_id: number;
    category_id: number;
    price: number;
    menuitem_image_url: string;
    is_available?: boolean;
    quantity: number;
    prepared_time: number;
}

const AllMenuItems: React.FC = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddFormValues>();

    //RTK Query Hook to fetch all menu items
    const { data: allMenuItem, isLoading: menuIsLoading, refetch } = menuItemApi.useGetAllMenuItemsQuery()
    const { data: allCategory } = categoryApi.useGetAllCategoryQuery();

    //RTK Mutation Hook to add new menu item
    const [addMenuItem] = menuItemApi.useAddMenuItemMutation();
    const [deleteMenuItem] = menuItemApi.useDeleteMenuItemMutation();
    const [updateMenuItem] = menuItemApi.useUpdateMenuItemMutation();

    //modal for adding menu items
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    //modal for editing menu items
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null)

    //open/close modal
    const handleModalToggle = () => {
        setIsAddModalOpen(!isAddModalOpen);
        if (isAddModalOpen) {
            reset();
        }
    };

    //open/close edit modal
    const handleEditModalToggle = () => {
        setIsEditModalOpen(!isEditModalOpen);
        if (isEditModalOpen) {
            reset();
            setSelectedMenuItem(null);
        }
    }

    // Format price to currency
    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`
    }

    // Edit menu item function
    const openEditModal = (item: MenuItem) => {
        setSelectedMenuItem(item);
        // Reset form first
        reset();
        // Set form values with selected item data
        setValue('name', item.name);
        setValue('description', item.description);
        setValue('price', item.price);
        setValue('category_id', item.category_id); // Fixed: Added category_id
        setValue('quantity', item.quantity);
        setValue('prepared_time', item.prepared_time);
        setValue('is_available', item.is_available);
        setValue('menuitem_image_url', item.menuitem_image_url);
        setIsEditModalOpen(true);
    };

    // Handle form submission for adding
    const onSubmit: SubmitHandler<AddFormValues> = async (data) => {
        const loadingToastId = toast.loading("Adding the menu item...");
        data.restaurant_id = 1; // Assuming restaurant_id is 1 for now
        try {
            const res = await addMenuItem(data).unwrap();

            if(res.success === false){
                toast.error("Failed to add", { id: loadingToastId })
            }else{
                toast.success("Menu Item added successfully", { id: loadingToastId })
                reset();
                setIsAddModalOpen(false);
                refetch(); // Refresh the list
            }
        } catch (error: any) {
            toast.error('Failed to add menu item. Please try again.', error);
            toast.dismiss(loadingToastId)
        }
    }

    // Handle form submission for editing
    const handleEditSubmit: SubmitHandler<AddFormValues> = async (data) => {
        if (!selectedMenuItem) return;
        
        const loadingToastId = toast.loading("Updating the menu item...");
        try {
            const res = await updateMenuItem({ 
                menu_item_id: selectedMenuItem.menu_item_id, 
                ...data 
            }).unwrap();
            
            if(res.success === false){
                 toast.error("Failed to Update the MenuItem", { id: loadingToastId })
            }else{
                toast.success("Menu Item updated successfully", { id: loadingToastId })   
                reset();
                setIsEditModalOpen(false);
                setSelectedMenuItem(null);
                refetch(); // Refresh the list
            }
        } catch (error: any) {
            toast.error('Failed to update menu item. Please try again.', { id: loadingToastId });
        }
    }

    //delete menu item function
    const handleDeleteMenuItem = async (menu_item_id: number, menuItemName: string) => {
        Swal.fire({
            title: "Are you sure?",
            html: `You want to delete <strong>${menuItemName}</strong>?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#e11d48",
            confirmButtonText: "Yes, Delete it!",
            background: "#fff1f2",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteMenuItem(menu_item_id).unwrap()
                    Swal.fire({
                        title: "Deleted!",
                        text: res.message,
                        icon: "success",
                        confirmButtonColor: "#f97316",
                        background: "#fff1f2"
                    })
                    refetch(); // Refresh the list
                } catch (error) {
                    Swal.fire({
                        title: "Something went wrong",
                        text: "Please Try Again",
                        icon: "error",
                        confirmButtonColor: "#f97316",
                        background: "#fff1f2"
                    })
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
                        <Clipboard className="text-rose-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                            Menu Items Management
                        </h1>
                        <p className="text-rose-500 text-sm mt-1">Manage your restaurant's menu items</p>
                    </div>
                </div>
                <button 
                    onClick={handleModalToggle} 
                    className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                >
                    <Plus size={18} />
                    Add New Menu Item
                </button>
            </div>

            {/* Loading State */}
            {menuIsLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                        <div className="loading loading-spinner loading-lg text-rose-500"></div>
                        <p className="mt-4 text-rose-600 font-medium">Loading menu items...</p>
                    </div>
                </div>
            ) : !allMenuItem || !allMenuItem.data || allMenuItem.data.length === 0 ? (
                /* Empty State */
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl shadow-md p-12 text-center border border-rose-100">
                    <div className="bg-rose-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clipboard className="text-rose-600" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-rose-800 mb-3">No Menu Items Found</h3>
                    <p className="text-rose-600 mb-6 max-w-md mx-auto">Start by adding your first menu item to build your restaurant's menu.</p>
                    <button 
                        onClick={handleModalToggle}
                        className="btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    >
                        <Plus size={18} />
                        Add First Item
                    </button>
                </div>
            ) : (
                /* Menu Items Table */
                <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gradient-to-r from-rose-50 to-orange-50">
                                <tr>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Image</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Name</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Category</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Price</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Quantity</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Prep Time</th>
                                    <th className="text-left font-bold text-rose-800 py-4 px-6">Status</th>
                                    <th className="text-center font-bold text-rose-800 py-4 px-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allMenuItem.data?.map((item: MenuItem, index: number) => (
                                    <tr 
                                        key={item.menu_item_id} 
                                        className={`hover:bg-rose-50 transition-colors duration-200 ${
                                            index % 2 === 0 ? 'bg-rose-25' : 'bg-white'
                                        }`}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-14 h-14 ring-2 ring-rose-200">
                                                    <img
                                                        src={item.menuitem_image_url || '/placeholder-image.jpg'}
                                                        alt={item.name}
                                                        className="object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/placeholder-image.jpg'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="font-bold text-rose-900">{item.name}</div>
                                                <div className="text-sm text-rose-600 truncate max-w-xs">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="badge bg-orange-100 text-orange-800 border-orange-200 font-medium">
                                                {item.category_name}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-rose-600 text-lg">
                                            {formatPrice(item.price)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`badge font-bold ${
                                                item.quantity > 10 
                                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                                    : item.quantity > 5 
                                                    ? 'bg-orange-100 text-orange-800 border-orange-200'
                                                    : 'bg-rose-100 text-rose-800 border-rose-200'
                                            }`}>
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-rose-700 font-medium">
                                            {item.prepared_time} mins
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`badge font-bold ${
                                                item.is_available 
                                                    ? 'bg-green-100 text-green-800 border-green-200' 
                                                    : 'bg-rose-100 text-rose-800 border-rose-200'
                                            }`}>
                                                {item.is_available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="btn btn-ghost btn-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors duration-200"
                                                >
                                                    <Edit size={16} />
                                                    Edit
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteMenuItem(item.menu_item_id, item.name)} 
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

                        {/* Add Modal */}
                        {isAddModalOpen && (
                            <div className="modal modal-open">
                                <div className="modal-box bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 shadow-2xl max-w-2xl">
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-rose-200">
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                                            Add New Menu Item
                                        </h2>
                                        <button 
                                            onClick={handleModalToggle}
                                            className="btn btn-ghost btn-circle text-rose-600 hover:text-rose-700 hover:bg-rose-100"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="mealName" className="block text-sm font-semibold text-rose-700 mb-2">Menu Item Name</label>
                                                <input
                                                    type="text"
                                                    id="mealName"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('name', { required: 'Menu Item Name is required' })}
                                                />
                                                {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="menuItemPrice" className="block text-sm font-semibold text-rose-700 mb-2">Price ($)</label>
                                                <input
                                                    type="number"
                                                    id="menuItemPrice"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('price', { required: 'Menu Item Price is required' })}
                                                />
                                                {errors.price && <p className="text-rose-600 text-sm mt-1">{errors.price.message}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="menuItemDescription" className="block text-sm font-semibold text-rose-700 mb-2">Description</label>
                                            <input
                                                type="text"
                                                id="menuItemDescription"
                                                className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                {...register('description', { required: 'Menu Item Description is required' })}
                                            />
                                            {errors.description && <p className="text-rose-600 text-sm mt-1">{errors.description.message}</p>}
                                        </div>

                                        {/* ADDED: Image URL Field */}
                                        <div>
                                            <label htmlFor="menuItemImageUrl" className="block text-sm font-semibold text-rose-700 mb-2">Image URL</label>
                                            <input
                                                type="url"
                                                id="menuItemImageUrl"
                                                className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                {...register('menuitem_image_url', { required: 'Image URL is required' })}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                            {errors.menuitem_image_url && <p className="text-rose-600 text-sm mt-1">{errors.menuitem_image_url.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="categoryId" className="block text-sm font-semibold text-rose-700 mb-2">Category</label>
                                                <select
                                                    id="categoryId"
                                                    className="select select-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('category_id', { required: 'Category is required' })}
                                                >
                                                    <option value="">Select a category</option>
                                                    {allCategory?.map((category) => (
                                                        <option key={category.category_id} value={category.category_id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.category_id && <p className="text-rose-600 text-sm mt-1">{errors.category_id.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="mealQuantity" className="block text-sm font-semibold text-rose-700 mb-2">Quantity</label>
                                                <input
                                                    type="number"
                                                    id="mealQuantity"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('quantity', { required: 'Menu Item Quantity is required' })}
                                                />
                                                {errors.quantity && <p className="text-rose-600 text-sm mt-1">{errors.quantity.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="mealPrepTime" className="block text-sm font-semibold text-rose-700 mb-2">Prep Time (mins)</label>
                                                <input
                                                    type="number"
                                                    id="mealPrepTime"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('prepared_time', { required: 'Preparation Time is required' })}
                                                />
                                                {errors.prepared_time && <p className="text-rose-600 text-sm mt-1">{errors.prepared_time.message}</p>}
                                            </div>
                                        </div>

                                        {/* ADDED: Availability Status */}
                                        <div>
                                            <label htmlFor="isAvailable" className="block text-sm font-semibold text-rose-700 mb-2">Availability Status</label>
                                            <select
                                                id="isAvailable"
                                                className="select select-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                {...register('is_available')}
                                                defaultValue="true"
                                            >
                                                <option value="true">Available</option>
                                                <option value="false">Not Available</option>
                                            </select>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-6 border-t border-rose-200">
                                            <button 
                                                onClick={handleModalToggle} 
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
                                                Add Menu Item
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Edit Modal */}
                        {isEditModalOpen && selectedMenuItem && (
                            <div className="modal modal-open">
                                <div className="modal-box bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 shadow-2xl max-w-2xl">
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-rose-200">
                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                                            Edit Menu Item
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
                                                <label htmlFor="editMealName" className="block text-sm font-semibold text-rose-700 mb-2">Menu Item Name</label>
                                                <input
                                                    type="text"
                                                    id="editMealName"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('name', { required: 'Menu Item Name is required' })}
                                                />
                                                {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="editMenuItemPrice" className="block text-sm font-semibold text-rose-700 mb-2">Price ($)</label>
                                                <input
                                                    type="number"
                                                    id="editMenuItemPrice"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('price', { required: 'Menu Item Price is required' })}
                                                />
                                                {errors.price && <p className="text-rose-600 text-sm mt-1">{errors.price.message}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="editMenuItemDescription" className="block text-sm font-semibold text-rose-700 mb-2">Description</label>
                                            <input
                                                type="text"
                                                id="editMenuItemDescription"
                                                className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                {...register('description', { required: 'Menu Item Description is required' })}
                                            />
                                            {errors.description && <p className="text-rose-600 text-sm mt-1">{errors.description.message}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="editMenuImageUrl" className="block text-sm font-semibold text-rose-700 mb-2">Image URL</label>
                                            <input
                                                type="url"
                                                id="editMenuImageUrl"
                                                className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                {...register('menuitem_image_url', { required: 'Image URL is required' })}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                            {errors.menuitem_image_url && <p className="text-rose-600 text-sm mt-1">{errors.menuitem_image_url.message}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="editCategoryId" className="block text-sm font-semibold text-rose-700 mb-2">Category</label>
                                                <select
                                                    id="editCategoryId"
                                                    className="select select-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('category_id', { required: 'Category is required' })}
                                                >
                                                    <option value="">Select a category</option>
                                                    {allCategory?.map((category) => (
                                                        <option key={category.category_id} value={category.category_id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.category_id && <p className="text-rose-600 text-sm mt-1">{errors.category_id.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="editMealQuantity" className="block text-sm font-semibold text-rose-700 mb-2">Quantity</label>
                                                <input
                                                    type="number"
                                                    id="editMealQuantity"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('quantity', { required: 'Menu Item Quantity is required' })}
                                                />
                                                {errors.quantity && <p className="text-rose-600 text-sm mt-1">{errors.quantity.message}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="editMealPrepTime" className="block text-sm font-semibold text-rose-700 mb-2">Prep Time (mins)</label>
                                                <input
                                                    type="number"
                                                    id="editMealPrepTime"
                                                    className="input input-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                    {...register('prepared_time', { required: 'Preparation Time is required' })}
                                                />
                                                {errors.prepared_time && <p className="text-rose-600 text-sm mt-1">{errors.prepared_time.message}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="editIsAvailable" className="block text-sm font-semibold text-rose-700 mb-2">Availability Status</label>
                                            <select
                                                id="editIsAvailable"
                                                className="select select-bordered w-full bg-white text-rose-900 border-rose-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                                                {...register('is_available')}
                                            >
                                                <option value="true">Available</option>
                                                <option value="false">Not Available</option>
                                            </select>
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
                                                Update Menu Item
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </AdminDashboardLayout>
    )
}

export default AllMenuItems