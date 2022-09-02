require("dotenv").config()

if (
    typeof process.env.SERVICE_DOMAIN_WHITELIST === "undefined"
    || process.env.SERVICE_DOMAIN_WHITELIST.length === 0
) {
    console.log("Must specifies cors service domain list !")
    process.exit(0)
}
const SERVICE_DOMAIN_WHITELIST = process.env.SERVICE_DOMAIN_WHITELIST.split(",")

module.exports.SERVICE_DOMAIN_WHITELIST = SERVICE_DOMAIN_WHITELIST
module.exports.BAD_REQUEST_CODE = 400
module.exports.INTERNAL_SERVER_ERROR_CODE = 500
module.exports.PORT = 3002
