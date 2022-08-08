import { Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import validateInput from "../middlewares/auth.middleware";

const router: Router = Router()

router.post("/auth/login", validateInput, AuthController.login)
router.get("/", AuthController.renderForm)

router.get("/home", function (req: Request, res: Response) {
    res.json({
        msg: "Redirect to this after login",
        queryParam: req.query.callbackUrl,
        token: res.getHeader("Authorization")
    })
})

export default router;