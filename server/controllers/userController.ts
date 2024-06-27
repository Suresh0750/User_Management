
import { Request,Response,NextFunction } from 'express'
import { signupValidator } from '../helpers/formValidation'
import bcrypt from 'bcryptjs'
import pool from '../config/dbConnect'


export default {

    signupPost : async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
        try{
           
            const validate = signupValidator(req.body)
            
            console.log(validate)
            if(!validate) throw new Error("Invalid Data")
            
            const {userName,userEmail,passWord,mobileNo} = req.body
            
            // * for check or identify error came from database or not
            try{
            const encryptedPassword = await bcrypt.hash(passWord,10)
            
            const query = `INSERT INTO users(userName, email, phone, password) VALUES ($1,$2,$3,$4)`;

            let storedata = await pool.query(query ,[userName,userEmail,mobileNo, encryptedPassword])
            console.log(`storedate`,storedata)

            }catch(error:any){
                next(error)
            }
           
            res.status(200).send('back end working')
        }catch(error:any){
            next(error)
        }

    }

}