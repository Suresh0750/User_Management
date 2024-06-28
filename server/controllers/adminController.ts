
import {Response,Request,NextFunction} from 'express'
import { signupValidator } from '../helpers/formValidation'
import bcrypt from 'bcryptjs'
import pool from '../config/dbConnect'
import jwt from 'jsonwebtoken'


const SecretKey :string | undefined = process.env.jwt_SecretKey 

type Row = {
    id : number,
    userName : string,
    email : string,
    phone : string
}

export default{

    login : async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
            console.log(req.body)
            const adEmail = process.env.adminEmail
            const adPass  = process.env.passWord
            const {adminEmail,passWord} = req.body
            console.log(adEmail,adminEmail)
            console.log(adPass,passWord)
            if(adEmail !=adminEmail || adPass!== passWord) throw new Error("Invalid Password or Email")

            const token = jwt.sign({adminEmail},String(SecretKey),{
                expiresIn : "1h"
            })
            res.status(200).send({success:true,token})

        }catch(err){
            next(err)
        }
    },
    getUserData : async(req:Request,res:Response,next:NextFunction): Promise<void>=>{
        try{

            console.log(`req reached getUserData controller`)

            const query = `SELECT id,username,email,phone FROM users`
            const dashboard :{rows : Row[]}  = await pool.query(query) || []

            res.status(200).send({success:true,dashboard:dashboard?.rows})

        }catch(err){
            next(err)
        }
    }
}