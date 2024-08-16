const jwt = require('jsonwebtoken')
import {Request, Response, NextFunction} from 'express';

declare global {
    namespace Express {
        interface Request {
        user: {
            userId: string,
            name: string
        };
        }
    }
}

type payload = {
    userId: string,
    name: string
}


const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json('not authenticated')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload: payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        return res.status(401).json('not authenticated')
    }
}

module.exports = Auth