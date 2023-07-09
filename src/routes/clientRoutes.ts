import {
    CartController,
    CategoryController,
    ProductController,
    OrderController
} from "../controllers";
import { Router } from "express";
import { auth } from "../middlewares";

const clientRoutes = Router();

/**
 * GET Categories.
 * @auth true
 * @route {GET} /categories
 * @param none
 * @returns {ICategory[]} // Will return all categories.
*/
clientRoutes.get('/categories', auth, CategoryController.getCategories);

/**
 * GET Categories.
 * @auth true
 * @route {GET} /categories
 * @param none
 * @returns {ICategory[]} // Will return all categories.
*/
clientRoutes.get('/products', auth, ProductController.getProducts);



/**
 * GET Tables/Carts.
 * @auth true
 * @route {GET} /cart
 * @param none
 * @returns {ITable[]} // Table includes cart 
*/
clientRoutes.get('/cart', auth, CartController.get);

/**
 * POST Carts.
 * @auth true
 * @route {POST} /cart
 * @param {ITable}
 * @returns {ITable[]} // Tables includes carts
*/
clientRoutes.post('/cart', auth, CartController.update);


/**
 * POST Carts.
 * @auth true
 * @route {DELETE} /cart
 * @param {id:number}
 * @returns {ITable[]} // Table includes cart 
*/
clientRoutes.delete('/cart/:id', auth, CartController.empty);



/**
 * POST Carts.
 * @auth true
 * @route {POST} /order
 * @param {IOrder}
 * @returns {Iorder} // Table includes cart 
*/
clientRoutes.post('/order', auth, OrderController.store);

/**
 * POST Carts.
 * @auth true
 * @route {GET} /order
 * @param {null}
 * @returns {Iorder} 
*/
clientRoutes.get('/order', auth, OrderController.getAll);


/**
 * POST Carts.
 * @auth true
 * @route {GET} /order
 * @param {id: number}
 * @returns {Order} // Table includes cart 
*/
clientRoutes.get('/order/:id', auth, OrderController.getUniuqe);




export default clientRoutes;