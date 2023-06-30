// import CartController from "../controllers/CartController";
import {
    AuthController,
    CartController,
    CategoryController,
    ProductController,
    OrderController
} from "../controllers";
import { Router } from "express";

const clientRoutes = Router();

/**
 * GET Categories.
 * @auth true
 * @route {GET} /categories
 * @param none
 * @returns {ICategory[]} // Will return all categories.
*/
clientRoutes.get('/categories', CategoryController.getCategories);

/**
 * GET Categories.
 * @auth true
 * @route {GET} /categories
 * @param none
 * @returns {ICategory[]} // Will return all categories.
*/
clientRoutes.get('/products', ProductController.getProducts);



/**
 * GET Tables/Carts.
 * @auth true
 * @route {GET} /cart
 * @param none
 * @returns {ITable[]} // Table includes cart 
*/
clientRoutes.get('/cart', CartController.get);

/**
 * POST Carts.
 * @auth true
 * @route {POST} /cart
 * @param {ICart}
 * @returns {ITable[]} // Table includes cart 
*/
clientRoutes.post('/cart', CartController.store);


/**
 * POST Carts.
 * @auth true
 * @route {POST} /order
 * @param {IOrder}
 * @returns {Iorder} // Table includes cart 
*/
clientRoutes.post('/order', OrderController.store);

/**
 * POST Carts.
 * @auth true
 * @route {POST} /order
 * @param {id: number}
 * @returns {Order} // Table includes cart 
*/
clientRoutes.get('/order/:id', OrderController.get);





export default clientRoutes;