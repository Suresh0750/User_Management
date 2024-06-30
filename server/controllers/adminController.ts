
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
    },
    AddUser : async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
        
            const username :string = req.body.userName
            const phone : string = req.body.mobileNo
            const email :string = req.body.userEmail
            const password : string= await bcrypt.hash(req.body.passWord,10)

            const userName = req.body
            
            const query = `INSERT INTO users(userName, email, phone, password) VALUES ($1,$2,$3,$4)`

            const insertUser= await pool.query(query,[username,email,phone,password])

            res.status(200).send({success:true,message:"User Added"})

        }catch(err){
            next(err)
        }
    },
    deleteData : async(req:Request,res:Response,next:NextFunction) :Promise<void>=>{
        try{
                const email = req.body.id
                const query = `DELETE FROM users WHERE email=$1`
    
                await pool.query(query,[email])
                res.status(200).send({success:true})
        }catch(err){
            next(err)
        }
    },
    editData : async(req:Request,res:Response,next: NextFunction) : Promise<void>=>{
        try{
            
            const data = req.body.data
            
            const UserId = req.body.id
            const query = `UPDATE users SET username= $1 , email = $2, phone = $3 WHERE id = $4`

            const {rows} = await pool.query(query,[data.userName,data.userEmail,data.mobileNo,UserId])
    
            res.status(200).send({success:true,messge:'user edit updated'})
        }catch(err){
            next(err)
        }
    }
}