import { Badge } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"
import { convertUnifiedCodeToEmojiSymbol } from "../../utils"

export function CategoryItem({ icon, name, type }) {
    return <Badge
        bg={type === "income" ? "success" : "secondary"}
        className="m-1 p-2"
        style={{ fontSize: 15 }}
        pill
    >
        <span className="me-2">{name}</span>
        <span className="me-2">{convertUnifiedCodeToEmojiSymbol(icon)}</span>
        <span><Trash
            className="hover fw-bold"
            style={{ fontWeight: 600 }}
        /></span>
    </Badge>
}