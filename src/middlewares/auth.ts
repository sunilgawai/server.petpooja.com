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
        const { salesman_id, username } = <IJwtPayload>JwtService.verify(token);

        console.log(req.salesman)

        next();
    } catch (error) {
        return next(error);
    }
}

export default auth;