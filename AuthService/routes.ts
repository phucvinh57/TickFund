import { Router } from "express";
import { AuthController } from "./controller";
import validateInput from "./middleware";

const router: Router = Router()

router.post("/auth/login", validateInput, AuthController.login)

export default router;