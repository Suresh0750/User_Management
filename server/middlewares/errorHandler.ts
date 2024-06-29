import { Request,Response,NextFunction } from "express";

export const errorHandler = (error:any,req :Request,res:Response,next:NextFunction)=>{
    
    let errorMessage = error.message || "An unexpected error";
    console.log(errorMessage,'checking error message')
    res.status(404).send(errorMessage)
}
