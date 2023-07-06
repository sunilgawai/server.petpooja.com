import { ICart } from "../typings";
import Joi from "joi";

class CartValidator {
    static post_cart = (req_body: object) => Joi.object({
        table: Joi.object({
            id: Joi.number().required(),
            cart_table_id: Joi.number().required(),
            cart_table_name: Joi.string().required(),
            Cart: Joi.object({
                Cart_items: Joi.array().required(),
                total_price: Joi.number().required(),
                payment_status: Joi.string(),
                payment_method: Joi.string()
            })
        })
    }).validate(req_body);
}

export default CartValidator;