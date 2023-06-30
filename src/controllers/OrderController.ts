import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../services";
import { database } from "../services/database";
import { CartValidator } from "../validators";
import { ICart, IOrder } from "../typings";

class OrderController {
    static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let order = await database.order.findUnique({
                where: {
                    id: parseInt(req.params.id)
                }
            })

            if (!order) {
                return next(CustomErrorHandler.notFound("Order not found."))
            }

            res.status(200).json({ data: order })
        } catch (error) {
            return next(error);
        }
    }

    static async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { shop_code, customer_first_name, customer_last_name, customer_email, customer_mobile, order_items, order_price, payment_method, payment_status } = req.body as IOrder;
        // Validate request body.
        const { error } = CartValidator.post_cart(req.body);
        if (error) {
            return next(error);
        }
        // Create order.
        try {
            const order = await database.order.create({
                data: {
                    Shop_Code: shop_code,
                    customer_first_name,
                    customer_last_name,
                    customer_email,
                    customer_mobile,
                    order_items: {
                        create: order_items.map(item => ({
                            Shop_Code: shop_code,
                            item_id: item.item_id,
                            item_quantity: item.quantity
                        }))
                    },
                    order_price: (order_price ? order_price : null),
                    payment_method
                },
                include: {
                    order_items: true,
                    salesmam: true
                }
            });

            if (!order) {
                return next(CustomErrorHandler.serverError())
            }

            res.status(200).json({ data: order });
        } catch (error) {
            return next(error);
        }
    }
}

export default OrderController;