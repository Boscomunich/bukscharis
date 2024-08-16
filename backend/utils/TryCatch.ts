import {Request, Response, NextFunction} from 'express';

const tryCatch = (controller: any) =>{ 
return async(req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req,res,next)
    } catch (error) {
        next(error)
    }
};
}
module.exports = tryCatch 