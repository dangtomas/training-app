import { Request, Response } from 'express';
import User from '../models/User';
import { StatusCodes } from 'http-status-codes';

async function getAllUsers(_: Request, res: Response) {
    const users = await User.find({}).sort("name");
    res.status(StatusCodes.OK).json(users);
}

async function createUser(req: Request, res: Response) {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json(user);
}

async function getUser(req: Request, res: Response) {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    res.status(StatusCodes.OK).json({ user });
}

async function updateUser(req: Request, res: Response) {
    const { id: userId } = req.params;
    const user = await User.findByIdAndUpdate(
        { _id: userId },
        req.body,
        { new: true }
    )
    if (req.body.password) {
        user?.save();
    }
    res.status(StatusCodes.OK).json({ user });
}

async function deleteUser(req: Request, res: Response) {
    const { id: userId } = req.params;
    await User.findByIdAndDelete({ _id: userId });
    res.status(StatusCodes.OK).send();
}

export {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}