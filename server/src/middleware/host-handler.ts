import {Request, Response, NextFunction} from "express";
import { StatusCodes } from "http-status-codes";

function handleHost(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader!.split(" ")[1];

    if (token === "host") {
        return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
}

export default handleHost;