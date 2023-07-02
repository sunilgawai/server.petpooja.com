import { ICart } from "../typings";
import Joi from "joi";

class CartValidator {
    static post_cart = (req_body: object) => Joi.object({
        cart_table_id: Joi.number().required(),
        customer_first_name: Joi.string().min(0),
        customer_last_name: Joi.string().min(0),
        customer_mobile: Joi.string().min(0),
        payment_status: Joi.string(),
        payment_method: Joi.string(),
        cart_items: Joi.array().required(),
        total_price: Joi.number()
    }).validate(req_body);
}

export default CartValidator;