export interface MenuItem {
    menu_item_id: number;
    name: string;
    description: string;
    category_name?: string;
    price: number;
    menuitem_image_url: string;
    is_available: boolean;
    quantity?: number;
    rating?: number;
    prep_time?: string;
}