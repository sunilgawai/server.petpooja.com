import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_TOKEN_SECRET } from "../../config";

class JwtService {
    static sign(payload: JwtPayload, expiresIn = '1d', jwt_secret: string = JWT_TOKEN_SECRET!) {
        return jwt.sign(payload, jwt_secret, { expiresIn: expiresIn });
    }

    static verify(token: string, secret: string = JWT_TOKEN_SECRET!) {
        return jwt.verify(token, secret)
    }

    
}

export default JwtService;