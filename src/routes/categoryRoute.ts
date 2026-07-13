
import express, {Router} from "express";
import categoryController from "../controllers/categoryController.js";
import userMiddleware, { Role } from "../middleware/userMiddleware.js";
const router:Router = express.Router()



router.route("/").get(categoryController.getCategories).post(userMiddleware.isUserLoggedIn, userMiddleware.accessTo(Role.Admin), categoryController.addCategory)
router.route("/:id").patch(userMiddleware.accessTo(Role.Admin), categoryController.updateCategory).delete(userMiddleware.accessTo(Role.Admin), categoryController.deleteCategory)


export default router