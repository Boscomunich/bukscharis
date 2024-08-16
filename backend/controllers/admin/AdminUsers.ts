import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
const  tryCatch = require ('../../utils/TryCatch')
const crypto = require ('crypto')
const bcrypt = require('bcryptjs');
const { encryptPassWord, createJWT } = require('../../utils/UserUtils')

const prisma = new PrismaClient()

// register user to the database
const registerAdmin = tryCatch( async (req: Request, res: Response) => {
    const {name, email, phoneNo, password} = req.body
    if (!name || !email || !phoneNo || !password) {
        return res.status(400).json('all fields are required')
    }
    const userExist = await prisma.admin.findFirst({
        where: {
            email: email
        }
    })
    if (userExist) {
        return res.status(400).json('user with this email exist')
    }
    const encryptedPassWord = await encryptPassWord(password)
    const userId = crypto.randomBytes(16).toString('hex');
    await prisma.admin.create({
        data: {
            id: userId,
            email: email,
            name: name,
            phoneNo: phoneNo,
            password: encryptedPassWord
        }
    })
    return res.status(200).json({email: email, id: userId})
})

//log user in
const logInAdmin = tryCatch( async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!password || !email) {
        return res.status(400).json('all fields required')
    }
    const user = await prisma.admin.findUnique({
        where: {email: email}
    })
    if (!user) {
        return res.status(400).json('wrong email or password')
    }
    if (!user?.active) {
        const token = createJWT(user.id, user.email)
        return res.status(200).json({name: user.name, email: user.email, id: user.id, token: token, active: user.active})
    }
    const isMatch = await bcrypt.compare(password, user?.password)
    if (isMatch) {
        const token = createJWT(user.id, user.email)
        return res.status(200).json({name: user.name, email: user.email, id: user.id, token: token, active: user.active})
    }
    res.status(400).json('wrong email or password')
})

module.exports = { registerAdmin, logInAdmin }