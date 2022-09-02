import { Router } from "express";
import { PersonalController } from "../controllers/personal.controller";
import { validateToken } from "../middlewares/validateToken.middleware";

const router: Router = Router()

router.use(validateToken)

router.put("/password", PersonalController.changePassword)
router.put("/info", PersonalController.updateInfo)
router.put("/avatar", PersonalController.updateAvatarUrl)

export default router