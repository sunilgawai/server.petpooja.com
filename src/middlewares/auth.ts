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
        let { salesman_id, username } = <IJwtPayload>JwtService.verify(token, process.env.JWT_TOKEN_SECRET);
        // Need to attach above properties on Express.Request Interface for global accessibility.
        
        next();
    } catch (error) {
        return next(error);
    }
}

export default auth;