

import express, {Router} from 'express'
import productController from '../controllers/productController.js'
import userMiddleware, { Role } from '../middleware/userMiddleware.js'
import {multer, storage} from '../middleware/multerMiddleware.js'
const upload = multer({storage : storage})
const router:Router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), upload.single("productImage"), productController.createProduct).get(productController.getAllProduct)
router.route("/:id").post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), productController.deleteProduct).get(productController.getSingleProduct).delete(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), productController.deleteProduct)

export default router