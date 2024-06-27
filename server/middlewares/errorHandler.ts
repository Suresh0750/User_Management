import { Request,Response,NextFunction } from "express";

export const errorHandler = (error:any,req :Request,res:Response,next:NextFunction)=>{
    console.log('errorHandler',error.message)
    let errorMessage = error.message || "An unexpected error";
    res.status(404).send(errorMessage)
}