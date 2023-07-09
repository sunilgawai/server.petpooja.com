import Joi from "joi";
import { CustomErrorHandler, JwtService } from "../../services";
import { NextFunction, Request, Response } from "express";
import { database } from "../../services/database";
import bcrypt from "bcrypt";


class AuthController {
    // Registering the user.
    public async register(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        const AuthValidation = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            repeat_password: Joi.ref('password')
        })

        const { error } = AuthValidation.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            let salesman = await database.salesman.findFirst({
                where: {
                    username: username
                }
            })

            if (salesman) {
                return next(CustomErrorHandler.alreadyExists("Username already exists."));
            }
        } catch (error) {
            return next(error); 
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        let salesman;
        try {
            salesman = await database.salesman.create({
                data: {
                    username: username,
                    password: hashedPassword
                }
            })

            if (!salesman) {
                return next(CustomErrorHandler.serverError());
            }

            let jwt_token = JwtService.sign({ salesman_id: salesman.salesman_id, username: salesman.username })
            res.status(200).json({
                // data: { username: salesman.username, jwt_token },
                message: "Registration succesfull."
            })
        } catch (error) {
            return next(error);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        const AuthValidation = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })

        const { error } = AuthValidation.validate(req.body);

        if (error) {
            return next(error);
        }

        // Check if User exists or not.
        // Compare the password.
        let salesman;
        try {
            salesman = await database.salesman.findUnique({
                where: {
                    username: username
                }
            })
            if (!salesman) {
                return next(CustomErrorHandler.notFound("Username not found. Please enter a valid username or register first."));
            }

            let equal = await bcrypt.compare(password, salesman.password);
            if (!equal) {
                return next(CustomErrorHandler.wrongCredentials("password not matched, please enter a valid password"));
            }
        } catch (error) {
            return next(error);
        }

        // Create JWT & Access Tokens.
        let jwt_token = JwtService.sign({ salesman_id: salesman.salesman_id, username: salesman.username })
        res.cookie("jwt_token", jwt_token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        });
        res.status(200).json({
            data: { username: salesman.username, jwt_token },
            message: "Login successful."
        })
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ message: "You are logged out from www.foodies.com" });
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        res.json({ message: "Hello World." });
    }
}

export default new AuthController();