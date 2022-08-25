import { dbQuery } from "../database";
import { config } from "dotenv";
import bcrypt from "bcrypt"

config()

const SALT_ROUND = 10
const DEFAULT_USER_PASSWORD: string | undefined = process.env.DEFAULT_USER_PASSWORD;

async function setDefaultPasswordForAllNewUsers() {
    if (typeof DEFAULT_USER_PASSWORD === "undefined") {
        console.log("Must specify user default password in environment")
        process.exit(0)
    }

    const getAllNewUsersIdsQueryResult = await dbQuery(`SELECT ID FROM account WHERE password IS NULL`);
    const newUsersIds: { ID: string }[] = JSON.parse(JSON.stringify(getAllNewUsersIdsQueryResult[0]))

    await dbQuery("START TRANSACTION")
    try {
        for (let user of newUsersIds) {
            const hashPassword = bcrypt.hashSync(DEFAULT_USER_PASSWORD, SALT_ROUND)
            await dbQuery(`UPDATE account SET password = ? WHERE ID = ?`, [hashPassword, user.ID])
        }
        await dbQuery("COMMIT");
    } catch (err: any) {
        await dbQuery("ROLLBACK")
        console.log(err.message)
    }
    process.exit(0)
}

setDefaultPasswordForAllNewUsers()