import { ICart } from "../typings";
import Joi from "joi";

class CartValidator {
    static post_cart = (req_body: object) => Joi.object({
        cart_table_id: Joi.number().required(),
        customer_first_name: Joi.string().required(),
        customer_last_name: Joi.string().required(),
        customer_mobile: Joi.string().required(),
        payment_status: Joi.string(),
        payment_method: Joi.string(),
        cart_items: Joi.array<ICart>().required()
    }).validate(req_body);
}

export default CartValidator;