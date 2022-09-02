import { Router } from "express";
import { staticController } from "../controllers/static.controller";
import { validateToken } from "../middlewares/validateToken.middleware";

const router: Router = Router()

router.use(validateToken)

router.get("/", staticController.getIndex)
router.get("/index.html", staticController.getIndex)
router.get("/success", staticController.getLoginSuccess)

export default router;