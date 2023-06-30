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
                data: { username: salesman.username, jwt_token },
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

        // Check if User exists or not
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
        // Database Whitelisting.
        let jwt_token = JwtService.sign({ salesman_id: salesman.salesman_id, username: salesman.username })

        res.status(200).json({
            data: { username: salesman.username, jwt_token },
            message: "Login successful."
        })
    }

    public async logout(req: Request, res: Response, next: NextFunction) {
        // Validate Request.
        // const { error } = Validate.logoutRequest(req.body);
        // if (error) {
        //     return next(error);
        // }

        // try {
        //     // Check if Token exists in database or not.
        //     await RefreshToken.findOneAndDelete({ refresh_token: req.body.refresh_token });
        // } catch (error) {
        //     return next(new Error("Something went wrong in database!"));
        // }

        res.status(200).json({ message: "You are logged out from www.foodies.com" });
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        // Validate Request.
        // const { error } = Validate.refreshRequest(req.body);
        // if (error) {
        //     return next(error);
        // }
        // // Check if Token exists in database or not.
        // let result, user, access_token, refresh_token;
        // try {
        //     result = await RefreshToken.findOne({ refresh_token: req.body.refresh_token });
        //     if (!result?.refresh_token) {
        //         return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token."));
        //     }
        //     // verify token.
        //     let user_id;
        //     try {
        //         // Get user data from refresh token.
        //         interface IJwtPayload {
        //             _id: string,
        //             email: string,
        //             role: string
        //         }
        //         const { _id } = await <IJwtPayload>JwtService.verify(result.refresh_token, REFRESH_TOKEN_SECRET!);
        //         user_id = _id;
        //     } catch (error) {
        //         return next(error);
        //     }

        //     // Check if user is in our database.
        //     user = await User.findOne({ _id: user_id });
        //     if (!user) {
        //         return next(CustomErrorHandler.unAuthorized("No User Found."))
        //     }

        //     // Get user data from refresh token.
        //     // Create JWT & Access Tokens.
        //     // Database Whitelisting.

        //     try {
        //         // Access Token;
        //         access_token = JwtService.sign({
        //             _id: user._id,
        //             role: user.role,
        //             email: user.email
        //         });

        //         // Refresh Token saving & whitelisting.
        //         refresh_token = JwtService.sign({
        //             _id: user._id,
        //             role: user.role,
        //             email: user.email
        //         }, '1w', REFRESH_TOKEN_SECRET);

        //         await RefreshToken.create({ refresh_token });
        //     } catch (error) {
        //         return next(error);
        //     }

        // } catch (error) {
        //     return next(error);
        // }

        // Return Response.
        // res.status(200).json({ user, access_token, refresh_token });

    }
}

export default new AuthController();