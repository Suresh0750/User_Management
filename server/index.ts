import express,{Express,Request,Response} from "express"
import dotenv from 'dotenv'
// import dbConnect from "./config/dbConnect";
import pool from './config/dbConnect'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from "./routes/userRoutes"
import { errorHandler } from "./middlewares/errorHandler"


dotenv.config()

//  dbConnect().then(()=>console.log(`Postgre sql connected succesfully`))

const app:Express = express();


app.use(cors())

app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(express.static("public"))

app.use("/user",userRouter)
// app.get("/",(req:Request,res:Response)=>{
//     res.send("developrs hollow")
// })
// app.get("/user",(req,res)=>{
//     console.log(`req res`)
// })


// * error Handler
app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})