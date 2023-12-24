import {Express, Response} from "express";
import { Logger } from "winston";
import { verifyToken } from "../middleware/auth";
import { AuthenticatedRequest } from "index";

export const syncData = (app: Express, db: any, logger: Logger) => {
    app.get('/', verifyToken, (req: AuthenticatedRequest, res: Response) => {
        logger.info("Server is built from ReactJS and by Hiep");
        res.json({
            req: req.user,
            message: "Server is built from ReactJS and by Hiep"
        });
    });

    app.get('/hello', (req: AuthenticatedRequest, res: Response) => {
        res.json({
            req: req.user,
            hello_message: "Hello Message"
        });
    });
}