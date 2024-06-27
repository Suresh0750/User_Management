
import { Request,Response,NextFunction } from 'express'
import { signupValidator } from '../helpers/formValidation'
import bcrypt from 'bcryptjs'


export default {

    signupPost : async(req:Request,res:Response,next:NextFunction) : Promise<void>=>{
        try{
           
            const validate = signupValidator(req.body)
            
            console.log("validate",validate)
            if(!validate) throw new Error("Invalid Data")

            
            console.log(req.body,'req body')
            // res.send('developer')
            res.status(200).send('back end working')
        }catch(error:any){
            next(error)
        }

    }

}