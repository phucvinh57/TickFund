import { Router } from "express";
import { AuthController } from "./controllers/auth.controller";
import { MockTFServiceController } from "./controllers/mockTfService.controller";
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

// Use only for testing
router.get(
    "/mock-service", 
    checkRequiredRequestQueries(["code", "appCallbackUrl"]),
    MockTFServiceController.getAuthentication
)

export default router;