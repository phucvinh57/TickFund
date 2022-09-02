import { Request, Response } from "express"
import { ACCESS_DENIED, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants"
import { LoginDto, ChangePasswordDto } from "../dtos"
import { updateUserPassword, validateUser } from "../services"

export const UserController = {
    changePassword: async function (req: Request, res: Response) {
        const userEmail: string = res.locals["userEmail"]
        const { oldPass, newPass, confirmedNewPass } = req.body

        let changePasswordDto: ChangePasswordDto
        try {
            changePasswordDto = new ChangePasswordDto(oldPass, newPass, confirmedNewPass)
        }
        catch (err: any) {
            return res.status(BAD_REQUEST).json({ msg: err.message })
        }

        const userId = await validateUser(new LoginDto(userEmail, changePasswordDto.oldPass))
        if (userId === null)
            return res.status(ACCESS_DENIED).json({ msg: "Password incorrect !" })

        try {
            await updateUserPassword(changePasswordDto.newPass, userId)
            res.json({ msg: "Update password successfuly !" })
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).json({ msg: "Internal server error !" })
        }
    },
    updateAvatarUrl: async function (req: Request, res: Response) {
        
    },
    updateInfo: async function (req: Request, res: Response) {

    }
}