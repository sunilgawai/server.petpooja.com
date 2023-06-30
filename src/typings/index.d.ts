

declare module "express" {
    interface Request {
        salesman: {
            username: string;
            salesman_id: string;
        }
    }
}