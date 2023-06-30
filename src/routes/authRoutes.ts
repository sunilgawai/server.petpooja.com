import { Router } from "express";
import { AuthController } from "../controllers";

const authRoutes = Router();

/**
 * POST register.
 * @route {POST} /register
 * @param {username: string, password: string}
 * @returns {jwt} // Table includes cart 
*/
authRoutes.post('/register', AuthController.register);

/**
 * POST login.
 * @route {POST} /login
 * @param {username: string, password: string}
 * @returns {jwt} // Table includes cart 
*/
authRoutes.post('/login', AuthController.login);


export default authRoutes;