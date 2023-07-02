import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler, JwtService } from "../services";
import { IJwtPayload } from "../typings";

const auth = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }

    let token = authHeader.split(' ')[1];
    // Verify token.
    try {
        req.salesman = {
            salesman_id: 'ss',
            username: 'sss'
        }
        console.log(req.salesman)
        let { salesman_id, username } = <IJwtPayload>JwtService.verify(token, process.env.JWT_TOKEN_SECRET);
        // Need to attach above properties on Express.Request Interface for global accessibility.
        // if (!req.salesman) {
        //     req.salesman = undefined;
        // }

        req.salesman = {
            salesman_id,
            username
        }

        console.log(req.salesman)


        next();
    } catch (error) {
        return next(error);
    }
}

export default auth;