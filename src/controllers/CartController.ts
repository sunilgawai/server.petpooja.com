import { Request, Response, NextFunction } from "express";
import { ICart, ICartItem, ITable } from "../typings";
import { CustomErrorHandler } from "../services";
import { database } from "../services/database";
import { CartValidator } from "../validators";

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

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log("request body", req.body.table.Cart);
        const { error } = CartValidator.post_cart(req.body);
        if (error) {
            return next(error);
        }
        const { table } = req.body;
        // Access the properties of the table object
        const { id, Cart: { Cart_items, total_price, payment_method, payment_status, customer_first_name, customer_last_name, customer_mobile } } = table as ITable;

        // If Cart is already in cart table. Update existing else create new cart. 
        try {
            const _table = await database.cartTable.findUnique({
                where: {
                    id: table.id
                },
                include: {
                    Cart: {
                        include: {
                            Cart_items: true
                        }
                    }
                }
            })

            if (!_table) {
                return next(CustomErrorHandler.notFound("Cart Table Not Found."));
            }

            // console.log("Request Table", table)
            // Checking if cart exists or not.
            if (!_table.Cart) {
                // Cart Does not exist.
                const newCart = await database.cart.create({
                    data: {
                        Cart_items: {
                            create: Cart_items.map(item => ({
                                itemmaster_id: item.itemmaster_id,
                                quantity: item.quantity,
                                name: item.name,
                                product_price: item.product_price
                            }))
                        },
                        total_price: total_price || 0,
                        payment_method: payment_method,
                        payment_status: payment_status,
                        customer_first_name: customer_first_name,
                        customer_last_name: customer_last_name,
                        customer_mobile: customer_mobile,
                        CartTable: {
                            connect: {
                                id: id
                            }
                        }
                    },
                    include: {
                        Cart_items: true,
                        CartTable: true
                    }
                });
                res.status(200).json(newCart);
            }
            const { Cart } = table as ITable;
            // if cart exists.
            if (_table.Cart) {
                // Updating the cart.
                // const updatedCart = await database.cart.update({
                //     where: {
                //         cart_table_id: _table.Cart?.id
                //     },
                //     data: {
                //         ...Cart,
                //         Cart_items: {
                //             upsert: Cart.Cart_items.map((item) => ({
                //                 where: { id: item.id || 0 },
                //                 create: {
                //                     ...item,
                //                     cart: { connect: { id: table.Cart.id } }
                //                 },
                //                 update: {
                //                     ...item
                //                 }
                //             }))
                //         },
                //         payment_method: Cart.payment_method,
                //         payment_status: Cart.payment_status
                //     },
                //     include: {
                //         Cart_items: true,
                //         CartTable: true
                //     }
                // })

                // Half Working code.
                // const updatedCart = await database.cart.update({
                //     where: {
                //         cart_table_id: table.id
                //     },
                //     data: {
                //         // Update the cart properties
                //         payment_status: Cart.payment_status,
                //         payment_method: Cart.payment_method,
                //         total_price: Cart.total_price,
                //         // Update the cart items
                //         Cart_items: {
                //             upsert: Cart.Cart_items.map((item) => ({
                //                 where: { id: item.id || undefined },
                //                 create: {
                //                     itemmaster_id: item.itemmaster_id,
                //                     quantity: item.quantity,
                //                     name: item.name,
                //                     product_price: item.product_price,
                //                 },
                //                 update: {
                //                     itemmaster_id: item.itemmaster_id,
                //                     quantity: item.quantity,
                //                     name: item.name,
                //                     product_price: item.product_price,
                //                 },
                //             })),
                //         },
                //     },
                //     include: {
                //         Cart_items: true,
                //         CartTable: true,
                //     },
                // });

                // const updatedCart = await database.cart.update({
                //     where: {
                //         cart_table_id: _table.Cart.cart_table_id
                //     },
                //     data: {
                //         // customer_first_name: Cart.customer_first_name,
                //         // customer_last_name: Cart.customer_last_name,
                //         // customer_mobile: Cart.customer_mobile,
                //         payment_status: Cart.payment_status,
                //         payment_method: Cart.payment_method,
                //         total_price: Cart.total_price,
                //         Cart_items: {
                //             // If cart item is present, update else create new item.
                //             upsert: Cart.Cart_items.map((cartItem) => ({
                //                 where: {
                //                     id: id
                //                     // id: cartItem.id ? cartItem.id : 9999
                //                 },
                //                 create: {
                //                     itemmaster_id: cartItem.itemmaster_id,
                //                     quantity: cartItem.quantity,
                //                     name: cartItem.name,
                //                     product_price: cartItem.product_price
                //                 },
                //                 update: {
                //                     itemmaster_id: cartItem.itemmaster_id,
                //                     quantity: cartItem.quantity,
                //                     name: cartItem.name,
                //                     product_price: cartItem.product_price
                //                 }
                //             }))
                //         }
                //     },
                //     include: {
                //         Cart_items: true,
                //         CartTable: true
                //     }
                // });

                // Cart exists, update the existing cart items or create new ones

                // From CGPT.
                // if the cart already exists (_table.Cart exists), we proceed to update the existing cart and its cart items

                // Updating Cart Body.

                // Updatin the cart body.
                const updated_cart = await database.cart.update({
                    where: {
                        cart_table_id: table.id,
                    },
                    data: {
                        customer_first_name: customer_first_name,
                        customer_last_name: customer_last_name,
                        customer_mobile: customer_mobile,
                        payment_status: payment_status,
                        payment_method: payment_method,
                        total_price: total_price
                    }
                })
                
                const updatedCartItems: any = [];
                for (const cartItem of Cart_items) {
                    const existingCartItem = _table.Cart.Cart_items.find(item => item.itemmaster_id === cartItem.itemmaster_id);
                    if (existingCartItem) {
                        // Cart item already exists, updating quantity.
                        const updatedCartItem = await database.cartItem.update({
                            where: { id: existingCartItem.id },
                            data: {
                                quantity: cartItem.quantity
                            },
                        });
                        updatedCartItems.push(updatedCartItem);
                    } else {
                        // Cart item doesn't exist, inserting a new one
                        const newCartItem = await database.cartItem.create({
                            data: {
                                cartId: { connect: { id: _table.Cart.id } },
                                tbl_itemmaster: { connect: { id: cartItem.itemmaster_id } },
                                quantity: cartItem.quantity,
                                name: cartItem.name,
                                product_price: cartItem.product_price
                            },
                        });
                        updatedCartItems.push(newCartItem);
                    }
                }
                await database.cart.update({
                    where: {
                        cart_table_id: table.id,
                    },
                    data: {
                        Cart_items: {
                            set: updatedCartItems.map((item: ICartItem) => ({ id: item.id }))
                        }
                    }
                })
                // After updating or creating the cart items, I'm update the cart itself.
                // const updatedCart = await database.cart.update({
                //     where: { id: _table.Cart.id },
                //     data: {
                //         customer_first_name: Cart.customer_first_name,
                //         customer_last_name: Cart.customer_last_name,
                //         customer_mobile: Cart.customer_mobile,
                //         payment_status: payment_status,
                //         payment_method: payment_method,
                //         total_price: total_price,
                //         Cart_items: {
                //             set: updatedCartItems.map(item => ({ id: item.id }))
                //         },
                //     },
                //     include: {
                //         Cart_items: true,
                //         CartTable: true,
                //     },
                // });
                // After updating or creating the cart items, updating the cart itself
                // await database.cart.update({
                //     where: {
                //         cart_table_id: Cart.cart_table_id
                //     },
                //     data: {
                //         customer_first_name: Cart.customer_first_name,
                //         customer_last_name: Cart.customer_last_name,
                //         customer_mobile: Cart.customer_mobile,
                //         payment_status: Cart.payment_status,
                //         payment_method: Cart.payment_method,
                //         Cart_items: {
                //             set: updatedCartItems.map(item => ({ id: item.id }))
                //         }
                //     }
                // })
                res.status(200).json({ message: "Cart Updated" })
            }
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }

    // static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     console.log("request body", req.body.table);
    //     const { error } = CartValidator.post_cart(req.body);
    //     if (error) {
    //         next(error);
    //     }
    //     const { table } = req.body;
    //     // Access the properties of the table object
    //     const { id, Cart: { Cart_items, total_price, payment_method, payment_status, customer_first_name, customer_last_name, customer_mobile } } = table as ITable;

    //     // If Cart is already in cart table. Update existing else create new cart.
    //     try {
    //         const _table = await database.cartTable.findUnique({
    //             where: {
    //                 id: table.id
    //             },
    //             include: {
    //                 Cart: {
    //                     include: {
    //                         Cart_items: true
    //                     }
    //                 }
    //             }
    //         });

    //         if (!_table) {
    //             next(CustomErrorHandler.notFound("Cart Table Not Found."));
    //         }

    //         console.log("Request Table", table);
    //         // Checking if cart exists or not.
    //         if (!_table?.Cart) {
    //             // Cart Does not exist.
    //             const newCart = await database.cart.create({
    //                 data: {
    //                     Cart_items: {
    //                         create: Cart_items.map(item => ({
    //                             itemmaster_id: item.itemmaster_id,
    //                             quantity: item.quantity,
    //                             name: item.name,
    //                             product_price: item.product_price
    //                         }))
    //                     },
    //                     total_price: total_price || 0,
    //                     payment_method: payment_method,
    //                     payment_status: payment_status,
    //                     customer_first_name: customer_first_name,
    //                     customer_last_name: customer_last_name,
    //                     customer_mobile: customer_mobile,
    //                     CartTable: {
    //                         connect: {
    //                             id: id
    //                         }
    //                     }
    //                 },
    //                 include: {
    //                     Cart_items: true,
    //                     CartTable: true
    //                 }
    //             });

    //             res.status(200).json(newCart);
    //         } else {
    //             // Cart exists, update the existing cart items or create new ones
    //             const updatedCartItems = [];
    //             for (const cartItem of Cart_items) {
    //                 const existingCartItem = _table.Cart.Cart_items.find((item) => item.itemmaster_id === cartItem.itemmaster_id);
    //                 if (existingCartItem) {
    //                     // Cart item already exists, update it
    //                     const updatedCartItem = await database.cartItem.update({
    //                         where: { id: existingCartItem.id },
    //                         data: { quantity: cartItem.quantity },
    //                     });
    //                     updatedCartItems.push(updatedCartItem);
    //                 } else {
    //                     // Cart item doesn't exist, create a new one
    //                     const newCartItem = await database.cartItem.create({
    //                         data: {
    //                             cartId: { connect: { id: _table.Cart.id } },
    //                             tbl_itemmaster: { connect: { id: cartItem.itemmaster_id } },
    //                             quantity: cartItem.quantity,
    //                         },
    //                     });
    //                     updatedCartItems.push(newCartItem);
    //                 }
    //             }

    //             // Update the cart with the new cart items
    //             const updatedCart = await database.cart.update({
    //                 where: { id: _table.Cart.id },
    //                 data: {
    //                     customer_first_name: customer_first_name,
    //                     customer_last_name: customer_last_name,
    //                     customer_mobile: customer_mobile,
    //                     payment_status: payment_status,
    //                     payment_method: payment_method,
    //                     total_price: total_price,
    //                     Cart_items: {
    //                         set: updatedCartItems.map(item => item.id),
    //                     },
    //                 },
    //                 include: {
    //                     Cart_items: true,
    //                     CartTable: true,
    //                 },
    //             });

    //             res.status(200).json({ updatedCart, message: "Cart Updated" });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         next(error);
    //     }
    // }

    static async empty(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = parseInt(req.params.id);
        if (!id) {
            return next(CustomErrorHandler.wrongCredentials("Table id not specified."));
        }

        try {
            const table = await database.cartTable.findUnique({
                where: {
                    id: id
                },
                include: {
                    Cart: {
                        include: {
                            Cart_items: true
                        }
                    }
                }
            })
            if (!table) {
                return next(CustomErrorHandler.notFound("Table not found"));
            }

            if (!table.Cart) {
                return next(CustomErrorHandler.notFound("Cart not found"));
            }

            // Deleting the associated CartItems
            await database.cartItem.deleteMany({
                where: {
                    cart_id: table.Cart.id
                },
            }).catch(err => next(err));

            // Deleting the Cart
            await database.cart.delete({
                where: {
                    id: table.Cart.id,
                },
            }).catch(err => next(err));

            res.status(200).json({ message: "Cart Deleted." });
        } catch (error) {
            return next(error);
        }
    }
}

export default CartController;