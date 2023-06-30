
export interface IJwtPayload {
    salesman_id: string,
    username: string
}


export interface ICart {
    cart_table_name: string
    customer_id: number
    payment_method: string
    payment_status: boolean
    cart_items: ICartItem[]
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