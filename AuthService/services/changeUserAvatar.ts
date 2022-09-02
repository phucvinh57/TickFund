import { dbQuery } from "../database"
// import axios from "axios"

export const changeUserAvatar = async function(avatarUrl: string, userId: string) {
    const rawQueryResult = await dbQuery(
        `SELECT avatarURL FROM account WHERE ID = ?`,
        [userId]
    );
    const queryResult: { avatarURL: string }[] = JSON.parse(JSON.stringify(rawQueryResult[0]))
    const oldAvatarUrl = queryResult[0]
    // Delete file 
    console.log(oldAvatarUrl)
    // Update avatarUrl
    return dbQuery(`UPDATE account SET avatarURL = ? WHERE ID = ?`, [avatarUrl, userId])
}