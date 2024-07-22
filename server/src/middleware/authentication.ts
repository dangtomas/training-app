import { Request, Response, NextFunction } from "express";
require("dotenv").config({ path: '../.env' });
import User from "../models/User";
import UnauthenticatedError from "../unauthenticated";
import jwt from "jsonwebtoken";

async function authenticate(req: Request, _: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("Invalid access token.");
    }
    const token = authHeader.split(" ")[1];

    //test host
    if (token === "host") {
        return next();
    }
    //test host

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findOne({_id: (<{userId: string}>decoded).userId });
        if (!user) {
            throw new Error();
        }
        //we know exactly what is in decoded, therefore using any
        (<any>req).user = { 
            userId: user._id, 
            name: user.name,
            isAdmin: user.isAdmin
        };
        next();
    } catch (err) {
        throw new UnauthenticatedError("Invalid authentication.");
    }
}

export default authenticate;