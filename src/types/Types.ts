export type UserFormValues={
    email: string; 
    password: string;
    first_name:string;
    last_name:string;
    phone_number:string
}


export type OrderFormValues={
    restaurant_id:number;
    customer_id: number;
    menu_item_id:number;
    total_amount: number;
    order_type:'dine_in' | 'takeaway' | 'delivery'
}

export interface User{
    user_id:number;
    first_name:string;
    last_name:string;
    email:string;
    phone_number:string;
    created_at:string;
    user_type:string
}


export interface MenuItem {
    menu_item_id: number;
    name: string;
    description: string;
    category_name: string;
    price: number;
    menuitem_image_url: string;
    is_available: boolean;
    quantity: number;
    prepared_time: number;
}

export interface AdminDashboardStats {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalMenuItems: number;
}

export interface AdminStatsResponse{
    success:boolean;
    data:AdminDashboardStats;
}

export interface UserStats {
    totalOrders: number;
    favoriteItems: number;
    totalSpent: number;
    loyaltyPoints: number;
}

export interface UserStatsResponse{
    success:boolean;
    data:UserStats;
}

export interface FavoriteItems{
    id:number;
    name:string;
    price:number;
    image:string;
    orders:number
}

export interface AllOrderData {
    order_id: number;
    customer_id: number;
    menu_item_id:number;
    total_amount: number;
    order_type:'dine_in' | 'takeaway' | 'delivery'
    status: 'pending' | 'confirmed' | 'preparing' | 'Cancelled'| 'completed';
    restaurant_name:string;
    menu_item_name:string;
    menuitem_image_url:string;
    customer_name:string;
    customer_email:string;
    created_at: string;
}

// export interface AllOrderResponse{
//     success:boolean;
//     data:AllOrderData[]
// }

export interface RecentOrder {
    id: number;
    customer: string;
    amount: number;
    status: 'Delivered' | 'Preparing' | 'Ready' | 'Cancelled';
    time: string;
}

export interface Category {
    category_id: number;
    name: string;
    restaurant_id: number;
    is_active: boolean;
    description: string;
}

export interface Restaurant {
    restaurant_id: number;
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
    created_at: string;
}

