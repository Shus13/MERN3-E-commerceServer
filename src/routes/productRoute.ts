

import express, {Router} from 'express'
import productController from '../controllers/productController.js'
import userMiddleware, { Role } from '../middleware/userMiddleware.js'
const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), productController.createProduct).get(productController.getAllProduct)
router.route("/:id").post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), productController.deleteProduct).get(productController.getSingleProduct)

export default router