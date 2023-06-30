import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../services";
import { database } from "../services/database";
import { CartValidator } from "../validators";
import { ICart } from "../typings";

class CartController {
    static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let cart_tables = await database.cartTable.findMany({
                include: {
                    Cart: true
                }
            });
            if (!cart_tables) {
                return next(CustomErrorHandler.notFound("Cart Tables Not Found."));
            }

            res.status(200).json({ data: cart_tables })
        } catch (error) {
            return next(error);
        }
    }

    static async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Validate request body.
        const { error } = CartValidator.post_cart(req.body);
        if (error) {
            return next(error);
        }
        console.log(req.body);
        const { customer_id, payment_method, payment_status, cart_table_name, cart_items } = req.body as ICart;
        // User will get all carts in format of Tables > Cart > CartItems.
        // When Storing Cart. Create a new Cart with the new CartItems and link them to the Table.

        try {
            // Getting Cart Table where the cart will be stored.
            const cart_table = await database.cartTable.findUnique({
                where: {
                    cart_table_name: cart_table_name
                }
            })

            if (!cart_table) {
                return next(CustomErrorHandler.notFound("Cart Table Not Found."));
            }

            const cart = await database.cart.create({
                data: {
                    customer_id: customer_id,
                    payment_method: payment_method,
                    payment_status: payment_status,
                    Cart_items: {
                        create: cart_items.map(item => ({
                            tbl_itemmaster: {
                                connect: {
                                    id: item.item_id
                                }
                            },
                            quantity: item.quantity
                        }))
                    },
                    CartTable: {
                        connect: {
                            id: cart_table.id
                        }
                    }
                },
                include: {
                    CartTable: true,
                    Cart_items: true
                }
            })

            // Sending cart, cart_items & cart_table.
            res.json({ data: 'response' });
        } catch (error) {
            return next(error);
        }
    }
}

export default CartController;