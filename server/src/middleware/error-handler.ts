import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

function errorHandler(err: { statusCode: any; message: any; }, req: Request, res: Response, next: NextFunction) {
    const customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }
    return res.status(customError.statusCode).send(customError);
}

export default errorHandler;