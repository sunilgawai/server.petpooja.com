import { Request, Response, NextFunction } from "express";
import { database } from "../services/database";
import { CustomErrorHandler } from "../services";

class ProductsController {
    static async getProducts(req: Request, res: Response, next: NextFunction) {
        let products;
        try {
            products = await database.tbl_itemmaster.findMany({
                where: {
                    Item_Discontinued: {
                        not: true
                    },
                    ItemRate_ID: {
                        Rate_IsEffective: {
                            not: false
                        }
                    }
                },
                include: {
                    ItemRate_ID: true,
                    Item_CategoryId: true
                }
                // Needs to apply filtering for Item price and if it is effective.
            })

            if (!products.length) {
                return next(CustomErrorHandler.notFound("Products not found."));
            }
        } catch (error) {
            return next(error);
        }

        res.status(200).json(products)
    }
}

export default ProductsController;;