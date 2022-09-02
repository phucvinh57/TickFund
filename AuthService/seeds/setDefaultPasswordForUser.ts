import { dbQuery } from "../database";
import { config } from "dotenv";
import { updateUserPassword } from "../services";

config()

const DEFAULT_USER_PASSWORD: string | undefined = process.env.DEFAULT_USER_PASSWORD;

async function setDefaultPasswordForAllNewUsers() {
    if (typeof DEFAULT_USER_PASSWORD === "undefined") {
        console.log("Must specify user default password in environment")
        process.exit(0)
    }

    const getAllNewUsersIdsQueryResult = await dbQuery(`SELECT ID FROM account WHERE password IS NULL`);
    const newUsersIds: { ID: string }[] = JSON.parse(JSON.stringify(getAllNewUsersIdsQueryResult[0]))

    if(newUsersIds.length === 0) {
        console.log("No users need to generate default password !")
    }
    await dbQuery("START TRANSACTION")
    try {
        for (let user of newUsersIds) {
            const hashPass = await updateUserPassword(DEFAULT_USER_PASSWORD, user.ID)
            console.log(`${user.ID}'s hashed password: ${hashPass}`)
        }
        await dbQuery("COMMIT");
    } catch (err: any) {
        await dbQuery("ROLLBACK")
        console.log(err.message)
    }
    process.exit(0)
}

setDefaultPasswordForAllNewUsers()