import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateToken } from "../middlewares/validateToken.middleware";

const router: Router = Router()

router.use(validateToken)

router.put("/password", UserController.changePassword)
router.put("/info", UserController.updateInfo)
router.put("/avatar", UserController.updateAvatarUrl)

export default router