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

            res.status(200).json(cart_tables)
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
        const { customer_first_name, customer_last_name, customer_mobile, total_price, payment_method, payment_status, cart_table_id, cart_items } = req.body as ICart;
        // User will get all carts in format of Tables > Cart > CartItems.
        // When Storing Cart. Creating a new Cart with the new CartItems and link them to the Table.

        try {
            let cart_table = await database.cartTable.findUnique({
                where: {
                    id: cart_table_id
                },
                include: {
                    Cart: true
                }
            })

            if (!cart_table) {
                return next(CustomErrorHandler.notFound("Cart Table Not Found."));
            }

            if (cart_table?.Cart) {
                // Update the CartTable.
                await database.cartTable.update({
                    where: {
                        id: cart_table_id
                    },
                    data: {
                        Cart: {
                            update: {
                                customer_first_name,
                                customer_last_name,
                                customer_mobile,
                                total_price,
                                payment_method,
                                Cart_items: {
                                    create: cart_items.map(item => ({
                                        itemmaster_id: item.item_id,
                                        quantity: item.quantity
                                    }))
                                }
                            }
                        }
                    },
                    include: {
                        Cart: true
                    }
                }).then(resuls => {
                    res.status(200).json(resuls);
                })
            } else {
                await database.cartTable.update({
                    where: {
                        id: cart_table_id
                    },
                    data: {
                        Cart: {
                            create: {
                                customer_first_name,
                                customer_last_name,
                                customer_mobile,
                                total_price,
                                payment_method,
                                Cart_items: {
                                    create: cart_items.map(item => ({
                                        itemmaster_id: item.item_id,
                                        quantity: item.quantity
                                    }))
                                }
                            }
                        }
                    }
                }).then(results => {
                    res.status(200).json(results);
                }).catch(err => {
                    return next(err);
                })
            }
        }


        // Works fine but won't update cart.
        // const table = await database.cartTable.update({
        //     where: {
        //         id: cart_table_id
        //     },
        //     data: {
        //         Cart: {
        //             create: {
        //                 customer_first_name,
        //                 customer_last_name,
        //                 customer_mobile,
        //                 total_price,
        //                 payment_method,
        //                 Cart_items: {
        //                     create: cart_items.map(item => ({
        //                         itemmaster_id: item.item_id,
        //                         quantity: item.quantity
        //                     }))
        //                 }
        //             }
        //         }
        //     },
        //     include: {
        //         Cart: true
        //     }
        // })
        // const cart_table = await database.cartTable.findMany({
        //     include: {
        //         Cart: true
        //     }
        // });

        // Sending cart, cart_items & cart_table.
        // res.json({ table, cart_table });
        catch (error) {
            return next(error);
        }
    }
}

export default CartController;