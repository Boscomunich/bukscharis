import { S3Client } from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
const multer = require('multer')
const multerS3 = require('multer-s3')

const  tryCatch = require ('../../utils/TryCatch')
const crypto = require ('crypto')

const prisma = new PrismaClient()

type Callback = (error: Error | null, destination: string) => void;

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
    location: string;
}

interface MulterRequest extends Request {
    files: MulterFile[];
}

//initializing s3 client
const s3 = new S3Client({
    region: 'us-east-1', 
    credentials: { 
        accessKeyId: process.env.ACCESS_KEY as string, 
        secretAccessKey: process.env.SECRET_KEY as string
    },
    endpoint: process.env.END_POINT
})

//initializing upload
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req: Request, file: MulterFile, cb: Callback) {
        cb(null, (file.originalname + Date.now().toString()))
        }
    })
})

const uploadProduct = tryCatch( async (req: MulterRequest, res: Response) => {
    console.log(req.files) 
    const { style, design, color, material, name, price, size, description } = req.body
    if (!style || !design || !color || !material || !name || !price || !description || !size) {
        return res.status(400).json('all fields are required')
    }
    const productId = crypto.randomBytes(16).toString('hex');
        console.log(req.files.length)
        const filePaths = req.files.map((file) => file.location)
        await prisma.product.create({
            data: {
                id: productId,
                style: style,
                design: design,
                color: color,
                material: material,
                price: Number(price),
                name: name,
                size: Number(size),
                description: description,
                image: filePaths
            }
    })
})

const updateProductDetails = tryCatch( async (req: Request, res: Response) => {
    const { style, design, color, material, name, price, productId } = req.body
    if (!style && !design && !color && !material && !name && !price) {
        return res.status(400).json('nothing to update')
    }
    const data: any = {};

    if (style !== undefined) {
        data.style = style;
    }

    if (design !== undefined) {
        data.design = design;
    }

    if (color !== undefined) {
        data.color = color;
    }

    if (material !== undefined) {
        data.material = material;
    }

    if (price !== undefined) {
        data.price = price;
    }

    if (name !== undefined) {
        data.name = name;
    }

    await prisma.product.update({
        where: {
        id: productId,
        },
        data
    });
})

const getAllProduct = tryCatch( async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({})
    res.status(200).json(products)
})


module.exports = { uploadProduct, updateProductDetails, getAllProduct, upload }