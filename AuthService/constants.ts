import { config } from "dotenv";
import path from "path"

config()

if (typeof process.env.JWT_SECRET_KEY === "undefined" || process.env.JWT_SECRET_KEY.length === 0) {
    console.log("Must provide jwt private key")
    process.exit(0)
}
if (typeof process.env.SALT_ROUND === "undefined" || process.env.SALT_ROUND.length === 0) {
    console.log("Must specify salt round in environment")
    process.exit(0)
}
if (typeof process.env.TICKFUND_APP_DOMAIN === "undefined" || process.env.TICKFUND_APP_DOMAIN.length === 0) {
    console.log("Must specify TickFund application's domain in environment")
    process.exit(0)
}
if (typeof process.env.FILE_SERVICE_DOMAIN === "undefined" || process.env.FILE_SERVICE_DOMAIN.length === 0) {
    console.log("Must specify file service's domain in environment")
    process.exit(0)
}

// HTTP response code
export const BAD_REQUEST = 400
export const ACCESS_DENIED = 403
export const INTERNAL_SERVER_ERROR = 500

// Password salt round
export const SALT_ROUND = parseInt(process.env.SALT_ROUND)

// JWT Secret key
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const ROOT_PATH = path.resolve(__dirname)
export const TICKFUND_APP_DOMAIN = process.env.TICKFUND_APP_DOMAIN
export const FILE_SERVICE_DOMAIN = process.env.FILE_SERVICE_DOMAIN