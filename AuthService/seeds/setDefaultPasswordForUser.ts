import { dbQuery } from "../database";
import { config } from "dotenv";
import bcrypt from "bcrypt"

const SALT_ROUND = 10

config()

const DEFAULT_USER_PASSWORD: string | undefined = process.env.DEFAULT_USER_PASSWORD;
if (typeof DEFAULT_USER_PASSWORD === "undefined") {
    console.log("Must specify user default password in environment")
    process.exit(0)
}


async function setDefaultPasswordForAllNewUsers() {
    const getAllNewUsersIdsQueryResult = await dbQuery(`SELECT ID FROM account WHERE password IS NULL`);
    const newUsersIds: { ID: string }[] = JSON.parse(JSON.stringify(getAllNewUsersIdsQueryResult[0]))

    await dbQuery("START TRANSACTION")
    try {
        for (let user of newUsersIds) {
            const hashPassword = bcrypt.hashSync('123456', SALT_ROUND)
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