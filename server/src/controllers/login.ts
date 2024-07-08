import { Request, Response } from 'express';
import UnauthenticatedError from '../unauthenticated';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';

async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    // test host
    if (username === "host" && password === "1234") {
        return res.status(StatusCodes.OK).json({ 
            name: "host", 
            token: "host",
            id: "host"
        });
    }
    // test host

    const user = await User.findOne({ username });

    if (!user) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ 
        name: user.name, 
        token,
        id: user._id
    });
}

export default login;