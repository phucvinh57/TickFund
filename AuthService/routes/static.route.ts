import { Router } from "express";
import { staticController } from "../controllers/static.controller";

const router: Router = Router()

router.get("/index.html", staticController.getIndex)
router.get("/", staticController.getIndex)
router.get("/success", staticController.getLoginSuccess)

export default router;