import { Request, Response, NextFunction } from "express";
import { ICart, IQueryParams, ITable } from "../typings";
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
        const { id, cart_table_id, cart_table_name, Cart: { Cart_items, total_price, payment_method, payment_status } } = table as ITable;

        // If Cart is already in cart table. Update existing else create new cart. 
        try {
            const _table = await database.cartTable.findUnique({
                where: {
                    id: table.id
                },
                include: {
                    Cart: true
                }
            })

            if (!_table) {
                return next(CustomErrorHandler.notFound("Cart Table Not Found."));
            }
            console.log("Request Table", table)
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
            // const { Cart } = table as ITable;
            // if cart exists.
            // if (table.Cart) {
            // Updating the cart.
            // const updatedCart = await database.cart.update({
            //     where: {
            //         cart_table_id: _table.Cart?.id
            //     },
            //     data: {
            //         ...Cart,
            //         Cart_items: {
            //             upsert: Cart.Cart_items.map((item) => ({
            //                 where: { id: item.id || undefined },
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

            // const updatedCart = await database.cart.update({
            //     where: {
            //         cart_table_id: table.id
            //     },
            //     data: {
            //         Cart_items: {
            //             create: Cart.Cart_items.map(item => ({
            //                 upsert: {
            //                     where: {
            //                         id: item.id
            //                     },
            //                     create: {
            //                         itemmaster_id: item.itemmaster_id,
            //                         quantity: item.quantity,
            //                         name: item.name,
            //                         product_price: item.product_price,
            //                         CartTable: {
            //                             connect: {
            //                                 id: Cart.cart_table_id // Provide the actual cart table ID
            //                             }
            //                         }
            //                     },
            //                     update: {
            //                         quantity: {
            //                             increament: 1
            //                         }
            //                     }
            //                 }
            //             }))
            //         },
            //         total_price: 195,
            //         payment_method: undefined,
            //         payment_status: undefined
            //     },
            //     include: {
            //         Cart_items: true,
            //         CartTable: true
            //     }
            // });

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
            // res.status(200).json(updatedCart)
            // }

        } catch (error) {
            return next(error);
        }
        // res.status(200).json({ success: req.body })
    }

    // static async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     // Validate request body.
    //     const { error } = CartValidator.post_cart(req.body);
    //     if (error) {
    //         return next(error);
    //     }
    //     console.log(req.body);
    //     const { cart_items, total_price, cart_table_id } = req.body as ICart;
    //     // User will get all carts in format of Tables > Cart > CartItems.
    //     // When Storing Cart. Creating a new Cart with the new CartItems and link them to the Table.

    //     try {
    //         let cart_table = await database.cartTable.findUnique({
    //             where: {
    //                 id: cart_table_id
    //             },
    //             include: {
    //                 Cart: true
    //             }
    //         })

    //         if (!cart_table) {
    //             return next(CustomErrorHandler.notFound("Cart Table Not Found."));
    //         }

    //         console.log('Request...body', req.body)
    //         if (cart_table?.Cart) {
    //             // Update the CartTable.
    //             await database.cartTable.update({
    //                 where: {
    //                     id: cart_table_id
    //                 },
    //                 data: {
    //                     Cart: {
    //                         update: {
    //                             total_price: total_price,
    //                             Cart_items: {
    //                                 create: cart_items.map(item => ({
    //                                     itemmaster_id: item.itemmaster_id,
    //                                     quantity: item.quantity,
    //                                     name: item.name
    //                                 }))
    //                             }
    //                         }
    //                     }
    //                 },
    //                 include: {
    //                     Cart: {
    //                         include: {
    //                             Cart_items: true
    //                         }
    //                     }
    //                 }
    //             }).then(resuls => {
    //                 res.status(200).json(resuls);
    //             })
    //         } else {
    //             await database.cartTable.update({
    //                 where: {
    //                     id: cart_table_id
    //                 },
    //                 data: {
    //                     Cart: {
    //                         create: {
    //                             total_price,
    //                             Cart_items: {
    //                                 create: cart_items.map(item => ({
    //                                     itemmaster_id: item.itemmaster_id,
    //                                     quantity: item.quantity,
    //                                     name: item.name
    //                                 }))
    //                             }
    //                         }
    //                     }
    //                 },
    //                 include: {
    //                     Cart: {
    //                         include: {
    //                             Cart_items: true
    //                         }
    //                     }
    //                 }
    //             }).then(results => {
    //                 res.status(200).json(results);
    //             }).catch(err => {
    //                 console.log(err)
    //                 return next(err);
    //             })
    //         }
    //     }

    //     catch (error) {
    //         console.log(error)
    //         return next(error);
    //     }
    // }

    // static async empty(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     const id = req.params.id;

    //     if (!id) {
    //         return next(CustomErrorHandler.wrongCredentials("Table id not specified."));
    //     }

    //     const table_id = parseInt(id);

    //     // Deleting the cart_item items.
    //     try {
    //         let table = await database.cartTable.findUnique({
    //             where: {
    //                 id: table_id
    //             }
    //         })

    //         if (!table) {
    //             return next(CustomErrorHandler.notFound("Cart Table Not Found."));
    //         }

    //         const cartItems = await database.cartItem.deleteMany({
    //             where: {
    //                 cartId: {
    //                     cart_table_id: {
    //                         equals: table_id
    //                     }
    //                 }
    //             }
    //         })

    //         if (!cartItems) {
    //             return next(CustomErrorHandler.notFound("Cart Items Not Found."));
    //         }
    //     } catch (error) {
    //         return next(error);
    //     }

    //     // Deleting cart_item from cart_item table.
    //     try {
    //         const cart_item = await database.cartTable.update({
    //             where: {
    //                 id: table_id
    //             },
    //             data: {
    //                 Cart: {
    //                     delete: true
    //                 }
    //             }
    //         })

    //         if (!cart_item) {
    //             return next(CustomErrorHandler.notFound("Cart Not Found."));
    //         }

    //         res.status(200).json(cart_item);
    //     } catch (error) {
    //         return next(error);
    //     }
    // }

    // static async handleQty(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     // Check query params.
    //     console.log(req.query);
    //     const { table_id, item_id, query } = req.query as unknown as IQueryParams;

    //     if (query !== "increase" && query !== "decrease") {
    //         return next(CustomErrorHandler.wrongCredentials("Wrong query."));
    //     }

    //     // Check if requested for increase/decrease.
    //     // try {
    //     //     if (query !== "increase" && query !== "decrease") {
    //     //         return next(CustomErrorHandler.wrongCredentials("Wrong query."));
    //     //     }

    //     //     const table = await database.cartTable.findUnique({
    //     //         where: {
    //     //             id: table_id
    //     //         },
    //     //         include: {
    //     //             Cart: {
    //     //                 include: {
    //     //                     Cart_items: true
    //     //                 }
    //     //             }
    //     //         }
    //     //     });

    //     //     if (!table) {
    //     //         return next(CustomErrorHandler.notFound("Table not found."));
    //     //     }

    //     //     if (!table.Cart) {
    //     //         return next(CustomErrorHandler.notFound("Cart not found."));
    //     //     }

    //     //     const cartItem = table.Cart.Cart_items.find(item => item.id === item_id);

    //     //     if (!cartItem) {
    //     //         return next(CustomErrorHandler.notFound("Cart item not found."));
    //     //     }

    //     //     let newQuantity: number;

    //     //     if (query === "increase") {
    //     //         newQuantity = cartItem.quantity + 1;
    //     //     } else if (query === "decrease") {
    //     //         newQuantity = Math.max(cartItem.quantity - 1, 0);
    //     //     }

    //     //     await database.cartItem.update({
    //     //         where: {
    //     //             id: item_id
    //     //         },
    //     //         data: {
    //     //             quantity: newQuantity
    //     //         }
    //     //     });

    //     //     res.status(200).json({ message: "Quantity has been updated.", newQuantity });

    //     // } catch (error) {
    //     //     return next(error);
    //     // }


    //     res.status(200).json({ message: "Quantity has been increased." });
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