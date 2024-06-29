import { Router } from "express";

import adminController from '../controllers/adminController'

const adminRouter = Router();


adminRouter.post("/login",adminController.login)
adminRouter.post("/getUserData",adminController.getUserData)
adminRouter.post("/AddUser",adminController.AddUser)
adminRouter.post("/deleteData",adminController.deleteData)
adminRouter.patch("/editData",adminController.editData)

export default adminRouter