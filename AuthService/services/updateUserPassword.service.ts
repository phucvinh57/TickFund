import { hash } from "bcrypt"
import { SALT_ROUND } from "../constants"
import { dbQuery } from "../database"

export const updateUserPassword = async function (rawPassword: string, userId: string) {
    const newHashPass = await hash(rawPassword, SALT_ROUND)
    await dbQuery(`UPDATE account SET password = ? WHERE ID = ?`, [newHashPass, userId])
    return newHashPass
}