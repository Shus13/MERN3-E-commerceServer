
import express, {Router} from "express";
import categoryController from "../controllers/categoryController.js";
import userMiddleware, { Role } from "../middleware/userMiddleware.js";
import errorHandler from "../services/errorHandler.js";
const router:Router = express.Router()



router.route("/")
.get(categoryController.getCategories).post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), errorHandler(categoryController.addCategory))
router.route("/:id")
.patch(userMiddleware.accessTo(Role.Admin), errorHandler(categoryController.updateCategory))
.delete(userMiddleware.accessTo(Role.Admin), errorHandler(categoryController.deleteCategory))


export default router