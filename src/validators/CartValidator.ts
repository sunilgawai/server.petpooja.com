import { ICart } from "../typings";
import Joi from "joi";

class CartValidator {
    static post_cart = (req_body: object) => Joi.object({
        cart_table_name: Joi.string().required(),
        customer_id: Joi.number().required(),
        payment_method: Joi.string().required(),
        payment_status: Joi.boolean().required(),
        cart_items: Joi.array<ICart>().required()
    }).validate(req_body);
}

export default CartValidator;