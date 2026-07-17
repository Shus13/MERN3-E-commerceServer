


import express, {Router} from 'express'
import userMiddleware from '../middleware/userMiddleware.js'
import orderController from '../controllers/orderController.js'
import errorHandler from '../services/errorHandler.js'

const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn, errorHandler(orderController.createOrder))

export default router