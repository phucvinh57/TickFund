export const getExpertiseName = (expertise) => {
    switch(expertise) {
        case "IT":
            return "IT"
        case "ME":
            return "Cơ khí"
        case "DEE":
            return "Điện"
        default:
            throw new Error("Wrong expertise")
    }
}