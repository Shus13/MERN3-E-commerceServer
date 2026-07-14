
import express, { Router } from 'express'
import UserController from '../controllers/userController.js'
import errorHandler from '../services/errorHandler.js'

const router:Router = express.Router()



router.route("/register").post(errorHandler(UserController.register))
router.route("/login").post(errorHandler(UserController.login))
router.route("/forget-password").post(errorHandler(UserController.handleForgetPassword))
router.route("/verify-otp").post(errorHandler(UserController.verifyOtp))
router.route("/reset-password").post(errorHandler(UserController.resetPassword))

export default router