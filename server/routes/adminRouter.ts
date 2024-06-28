import { Router } from "express";

import adminController from '../controllers/adminController'

const adminRouter = Router();


adminRouter.post("/login",adminController.login)
adminRouter.post("/getUserData",adminController.getUserData)


export default adminRouter