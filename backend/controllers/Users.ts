import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
const  tryCatch = require ('../utils/TryCatch')
const crypto = require ('crypto')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { encryptPassWord, createJWT, createShortJWT } = require('../utils/UserUtils')

const prisma = new PrismaClient()

// register user to the database
const registerUser = tryCatch( async (req: Request, res: Response) => {
    const {name, email, phoneNo, password} = req.body
    if (!name || !email || !phoneNo || !password) {
        return res.status(400).json('all fields are required')
    }
    const userExist = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (userExist) {
        return res.status(400).json('user with this email exist')
    }
    const encryptedPassWord = await encryptPassWord(password)
    const userId = crypto.randomBytes(16).toString('hex');
    await prisma.user.create({
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

//create user location and profile table
const createUserProfile = tryCatch( async (req: Request, res: Response) => {
    const locationId = crypto.randomBytes(16).toString('hex');
    const profileId = crypto.randomBytes(16).toString('hex');
    const {state, LGA, zone, street, userId, gender, height, build, complexion, age, ethnicity, email} = req.body
    if (!state || !LGA || !zone || !street || !userId || !gender || !height || !build || !complexion || !age || !ethnicity) {
        return res.status(400).json('all fields are required')
    }
    //create the user location
    await prisma.location.create({
        data: {
            id: locationId,
            state: state,
            LGA: LGA,
            zone: zone,
            street: street,
            userId: userId
        }
    })
    //create the user profile
    await prisma.profile.create({
        data: {
            id: profileId,
            gender: gender,
            height: height,
            build: build,
            complexion: complexion,
            age: age,
            ethnicity: ethnicity,
            userId: userId
        }
    })
    const token = createShortJWT(userId, email)
    return res.status(200).json(token)
})

//log user in
const logIn = tryCatch( async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!password || !email) {
        return res.status(400).json('all fields required')
    }
    const user = await prisma.user.findUnique({
        where: {email: email}
    })
    if (!user) {
        return res.status(400).json('wrong email or password')
    }
    if (!user?.verified) {
        return res.status(400).json('account not verified')
    }
    const isMatch = await bcrypt.compare(password, user?.password)
    if (isMatch) {
        const token = createJWT(user.id, user.email)
        return res.status(200).json({email: user.email, id: user.id, token: token})
    }
    res.status(400).json('wrong email or password')
})

const sendPasswordLink = tryCatch(async (req: Request, res: Response) => {
    const {email} = req.body
        const user = await prisma.user.findFirst({
                where: {
                    email:email
                }
            })
            if(!user){
            return res.status(400).json('user not found')
        }
    const token = await createShortJWT(user.id, user.email)
    .then(() => {
        res.status(200).json('check your email for reset link');
    }).catch
    ((err: Error)=> {
        res.status(500).json('Error sending email, retry');
    });
})

const resetPassword = tryCatch (async (req: Request, res: Response) => {
    const {password} = req.body
    const {token} = req.params
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const email = payload.name
        const updatedpassword = await bcrypt.hash(password, 10)
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: updatedpassword
            }
        });
        res.status(200).json('your password has been updated')
    } catch (error) {
        return res.status(401).json('not authenticated')
    }
})

module.exports = { registerUser, createUserProfile, logIn }