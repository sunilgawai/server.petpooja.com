import { Request, Response, NextFunction } from "express";
import { database } from "../services/database";
import { CustomErrorHandler } from "../services";

class CategoryController {
    static async getCategories(req: Request, res: Response, next: NextFunction) {
        let categories = await database.tbl_categorymaster.findMany({
            where: {
                Category_Discontinued: {
                    not: true
                }
            }
        })

        if (!categories.length) {
            return next(CustomErrorHandler.notFound("Categories not found."));
        }

        res.status(200).json(categories)
    }
}

export default CategoryController;;