
export interface IJwtPayload {
    salesman_id: string,
    username: string
}

export interface ITable {
    id: number;
    cart_table_id: string;
    cart_table_name: string;
    Cart: null | ICart
}

export interface ICart {
    cart_table_id: number
    customer_first_name: string;
    customer_last_name: string;
    customer_mobile: string;
    payment_status: string;
    payment_method: string;
    cart_items: ICartItem[];
    total_price: number
}

export interface ICartItem {
    name?: string;
    item_id: number;
    quantity: number;
}

export interface ICartItem {
    item_id: number
    quantity: number
}

export interface IOrder {
    shop_code: string
    customer_first_name: string
    customer_last_name: string
    customer_email: string
    customer_mobile: string
    order_price?: string
    payment_method: string
    payment_status: string
    order_items: ICartItem[]
}