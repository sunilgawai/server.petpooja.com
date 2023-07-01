import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../services";
import { database } from "../services/database";
import { OrderValidator } from "../validators";
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
        const { shop_code, customer_first_name, customer_last_name, customer_mobile, order_items, order_price, payment_method, payment_status } = req.body as IOrder;
        // Validate request body.
        const { error } = OrderValidator.post_order(req.body);
        if (error) {
            return next(error);
        }
        // Create order.
        try {
            // const order = await database.order.create({
            //     data: {
            //         Shop_Code: shop_code,
            //         customer_first_name,
            //         customer_last_name,
            //         customer_email,
            //         customer_mobile,
            //         order_items: {
            //             create: order_items.map(item => ({
            //                 Shop_Code: shop_code,
            //                 item_id: item.item_id,
            //                 item_quantity: item.quantity
            //             }))
            //         },
            //         order_price: (order_price ? order_price : null),
            //         payment_method
            //     },
            //     include: {
            //         order_items: true,
            //         salesmam: true
            //     }
            // });

            let order = await database.order.create({
                data: {
                    customer_first_name: customer_first_name,
                    customer_last_name: customer_last_name,
                    customer_mobile: customer_mobile,
                    payment_method: payment_method,
                    order_status: payment_status,
                    Shop_Code: shop_code,
                    order_items: {
                        create: order_items.map(item => ({
                            Shop_Code: shop_code,
                            item_id: item.item_id,
                            item_quantity: item.quantity
                        }))
                    }
                },
                include: {
                    order_items: {
                        include: {
                            itemId: true
                        }
                    },
                    salesmam: true
                }
            })
            console.log(order)

            if (!order) {
                return next(CustomErrorHandler.serverError())
            }

            res.status(200).json({ data: order });
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }
}

export default OrderController;