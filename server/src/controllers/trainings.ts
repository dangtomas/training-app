import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Training from '../models/Training';

async function getAllTrainings(req: Request, res: Response) {
    const from = req.query.from ? req.query.from + "T00:00:00.000Z" :
                                  "1000-01-01T00:00:00.000Z";
    const to = req.query.to ? req.query.to + "T23:59:59.999Z" :
                                "3000-12-31T23:59:59.999";
    const trainings = await Training.find({
        date: {
            $gte: new Date(from),
            $lte: new Date(to)
        }})
        .sort("date");
    res.status(StatusCodes.OK).send(trainings);
}

async function createTraining(req: Request, res: Response) {
    const training = await Training.create(req.body);
    res.status(StatusCodes.CREATED).json(training);
}

async function getTraining(req: Request, res: Response) {
    const { id: trainingId } = req.params;
    const training = await Training.findOne({ _id: trainingId });
    res.status(StatusCodes.OK).json({ training });
}

async function updateTraining(req: Request, res: Response) {
    if ((<any>req).user.isAdmin || req.body.attendance) {
        const { id: trainingId } = req.params;
        const training = await Training.findByIdAndUpdate(
            { _id: trainingId },
            req.body,
            { new: true }
        )
        return res.status(StatusCodes.OK).json({ training });
    }
    return res.status(StatusCodes.UNAUTHORIZED).send();
}

async function deleteTraining(req: Request, res: Response) {
    if ((<any>req).user.isAdmin) {
        const { id: trainingId } = req.params;
        await Training.findByIdAndDelete({ _id: trainingId });
        return res.status(StatusCodes.OK).send();
    }
    return res.status(StatusCodes.UNAUTHORIZED).send();
}


export {
    getAllTrainings,
    createTraining,
    getTraining,
    updateTraining,
    deleteTraining
}


