import axios from "axios";
import { dbQuery } from "../database"
// import axios from "axios"

export const changePersonalAvatar = async function(avatarUrl: string, userId: string) {
    const rawQueryResult = await dbQuery(
        `SELECT avatarURL FROM account WHERE ID = ?`,
        [userId]
    );
    const queryResult: { avatarURL: string }[] = JSON.parse(JSON.stringify(rawQueryResult[0]))
    const oldAvatarUrl = queryResult[0].avatarURL

    // Delete file 
    await axios.delete(oldAvatarUrl)
    
    // Update avatarUrl
    return dbQuery(`UPDATE account SET avatarURL = ? WHERE ID = ?`, [avatarUrl, userId])
}