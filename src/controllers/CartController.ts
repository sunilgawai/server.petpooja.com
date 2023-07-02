import { Request, Response, NextFunction } from "express";
import { CustomErrorHandler } from "../services";
import { database } from "../services/database";
import { CartValidator } from "../validators";
import { ICart } from "../typings";
import Joi from "joi";

class CartController {
    static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let cart_tables = await database.cartTable.findMany({
                include: {
                    Cart: {
                        include: {
                            Cart_items: true
                        }
                    }
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
        const { customer_first_name, customer_last_name, customer_mobile, total_price,
            payment_method, payment_status, cart_table_id, cart_items } = req.body as ICart;
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

            console.log('boody', req.body)
            console.log('product_itmes.', cart_items)
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
                                        itemmaster_id: item.itemmaster_id,
                                        quantity: item.quantity,
                                        name: item.name
                                    }))
                                }
                            }
                        }
                    },
                    include: {
                        Cart: {
                            include: {
                                Cart_items: true
                            }
                        }
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
                                        itemmaster_id: item.itemmaster_id,
                                        quantity: item.quantity,
                                        name: item.name
                                    }))
                                }
                            }
                        }
                    },
                    include: {
                        Cart: {
                            include: {
                                Cart_items: true
                            }
                        }
                    }
                }).then(results => {
                    res.status(200).json(results);
                }).catch(err => {
                    console.log(err)
                    return next(err);
                })
            }
        }

        catch (error) {
            console.log(error)
            return next(error);
        }
    }

    static async empty(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = req.params.id;

        if (!id) {
            return next(CustomErrorHandler.wrongCredentials("Table id not specified."));
        }

        const table_id = parseInt(id);

        // Deleting the cart items.
        try {
            let table = await database.cartTable.findUnique({
                where: {
                    id: table_id
                }
            })

            if (!table) {
                return next(CustomErrorHandler.notFound("Cart Table Not Found."));
            }

            const cartItems = await database.cartItem.deleteMany({
                where: {
                    cartId: {
                        cart_table_id: {
                            equals: table_id
                        }
                    }
                }
            })

            if (!cartItems) {
                return next(CustomErrorHandler.notFound("Cart Items Not Found."));
            }
        } catch (error) {
            return next(error);
        }

        // Deleting cart from cart table.
        try {
            const cart = await database.cartTable.update({
                where: {
                    id: table_id
                },
                data: {
                    Cart: {
                        delete: true
                    }
                }
            })

            if (!cart) {
                return next(CustomErrorHandler.notFound("Cart Not Found."));
            }

            res.status(200).json(cart);
        } catch (error) {
            return next(error);
        }
    }
}

export default CartController;