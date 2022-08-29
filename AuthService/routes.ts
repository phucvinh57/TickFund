import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "./controllers/auth.controller";
import { checkRequiredRequestQueries } from "./middlewares/checkRequiredRequestQueries.middleware";

const router: Router = Router()

router.post(
    "/auth/login",
    checkRequiredRequestQueries(["appCallbackUrl", "serviceCallbackUrl"]),
    AuthController.login
)

router.get(
    "/auth/check",
    checkRequiredRequestQueries(["code"]),
    AuthController.checkCode
)


export default router;