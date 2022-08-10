import { config } from "dotenv";
config()

if (typeof process.env.JWT_SECRET_KEY === "undefined") {
    console.log("Must provide jwt private key")
    process.exit(0)
}

// HTTP response code
export const BAD_REQUEST = 400
export const ACCESS_DENIED = 403
export const INTERNAL_SERVER_ERROR = 500

// JWT Secret key
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;