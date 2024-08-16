import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
const  tryCatch = require ('../utils/TryCatch')
const crypto = require ('crypto')

const prisma = new PrismaClient()

const likePost = tryCatch( async (req: Request, res: Response) => {
    const { userId } = req.user
    const { productId } = req.body
    const profileId = getProfile(userId)
    const likeId = crypto.randomBytes(16).toString('hex');
    await prisma.like.create({
        data: {
            id: likeId,
            profileId: profileId,
            productId: productId
        }
    })
    await updateLikeCount(productId, 1)
    return res.status(200).json('liked')
})

const unlikePost = tryCatch( async (req: Request, res: Response) => {
    const { productId, likeId } = req.body
    await prisma.like.delete({
        where: {
            id: likeId,
        }
    })
    await updateLikeCount(productId, -1)
    return res.status(200).json('unliked')
})

const getProfile = tryCatch(async (userId: string) => {
    const profileId = await prisma.profile.findUniqueOrThrow({
        where: {
            userId: userId
        }
    })
    return profileId
})

const updateLikeCount = tryCatch(async (productId: string, amount: number) => {
    await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            likeCount: {
                increment: amount
            }
        }
    })
})

module.exports = { likePost, unlikePost }