
import { Request,Response,NextFunction } from 'express'
import { signupValidator } from '../helpers/formValidation'
import bcrypt from 'bcryptjs'
import pool from '../config/dbConnect'
import jwt from 'jsonwebtoken'


type DecodeJwt ={
    userEmail : string,
    iat : number,
    exp : number
}


const SecretKey :string | undefined = process.env.jwt_SecretKey 

console.log(SecretKey)

export default {

    signupPost : async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
        try{
           
            const validate = signupValidator(req.body)
            
            if(!validate) throw new Error("Invalid Data")
            
            const {userName,userEmail,passWord,mobileNo} = req.body
            
            // * for check or identify error came from database or not
            try{
            const encryptedPassword = await bcrypt.hash(passWord,10)
            
            const query = `INSERT INTO users(userName, email, phone, password) VALUES ($1,$2,$3,$4)`;

            let storedata = await pool.query(query ,[userName,userEmail,mobileNo, encryptedPassword])

            }catch(error:any){
                next(error)
            }
           
            res.status(200).send({success:true,message:'register success'})
        }catch(error:any){
            next(error)
        }

    },

    login : async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
            try{
                console.log(`req enter login page`)
                // console.log(req.body)
                const {userEmail,passWord} = req.body

                const query = `SELECT email, passWord FROM users WHERE email=$1`

                const userDetail = await pool.query(query,[userEmail])

                // console.log(userDetail,'userDetail')
                // console.log(userDetail.rows)
                if(!userDetail.rows.length) throw new Error('Invalid Email or Password')
                const row = userDetail.rows[0] || []
                // console.log(row)
                let passWordCheck:boolean = await bcrypt.compare(passWord,row.password) 

                // console.log(`passwordCheck`,passWordCheck)
                if(!passWordCheck) throw new Error('Invalid Email or Password')
             
                const token = jwt.sign({userEmail:userEmail},String(SecretKey),{
                    expiresIn :"1h"
                });
                // console.log(token,'token')

                res.status(200).send({ success: true, message: "Login successful", token })
            }catch(err){
                next(err)
            }
    },

    fetchUserData : async(req :Request,res:Response,next :NextFunction) : Promise<void>=>{

        try{
            
        const token = req.body. jwt

        
        const {userEmail} = jwt.verify(token,String(SecretKey)) as DecodeJwt
        
        const query = `SELECT username,email,phone,image FROM users WHERE email=$1`
        
        const userDetails = await pool.query(query,[userEmail])
        const row = userDetails.rows[0]

        res.status(200).send({success:true,message:'Datafetch',row})
        // console.log(userDetails)

        }catch(err){
            // console.log(err)
            next(err)
        }
    },

    uploadImage : async(req :Request,res: Response,next : NextFunction) : Promise<void>=>{
        try{
          
            const {filename} :any = req.file
            
            const token = req.body.userJWT

            const {userEmail} = jwt.verify(token,String(SecretKey)) as DecodeJwt

            const query = 'UPDATE users SET image=$1 WHERE email=$2'

            await pool.query(query,[filename,userEmail])

            res.status(200).send({success:true,message:'Image succesfully uploaded'})
        }catch(err){
            next(err)
        }
    },
    verifyUser : async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
        try{
            console.log(`req reached to verifyUser`)
        }catch(err){
            next(err)
        }
    }
    

}