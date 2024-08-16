import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
const  tryCatch = require ('../utils/TryCatch')
const crypto = require ('crypto')

const prisma = new PrismaClient()

const createOrder = tryCatch(async (req: Request, res: Response) => {
    const { userId } = req.user
    const { style, design, color, material, name, price } = req.body
    if (!style || !design || !color || !material || !name || !price) {
        return res.status(400).json('all fields are required')
    }
    const orderId = crypto.randomBytes(16).toString('hex');
    await prisma.order.create({
        data: {
                id: orderId,
                style: style,
                design: design,
                color: color,
                material: material,
                price: price,
                name: name,
                userId: userId
            }
    })
})

module.exports = { createOrder }