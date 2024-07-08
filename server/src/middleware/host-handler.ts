import {Request, Response, NextFunction} from "express";

function handleHost(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader!.split(" ")[1];

    if (token === "host") {
        return res.send();
    }

    next();
}

export default handleHost;