import { Request, Response, Router } from "express";
import validateInput from "../middlewares/auth.middleware";
import LoginDto from "../dtos/login.dto";

const router: Router = Router()

router.post("/auth/login", validateInput, )

router.get("/home", function (req: Request, res: Response) {
    res.json({ msg: "Redirect to this after login" })
})

export default router;