
import {Router} from "express"

import userController from '../controllers/userController'
import { upload } from "../service/multer"


const userRouter = Router()

userRouter.post("/signup",userController.signupPost)
userRouter.post("/login",userController.login)
userRouter.post("/fetchUserData",userController.fetchUserData)
userRouter.post("/uploadImage",upload.single('image'),userController.uploadImage)

export default userRouter
