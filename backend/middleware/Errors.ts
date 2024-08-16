import {Request, Response, NextFunction} from 'express';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error)
}
module.exports = errorHandler