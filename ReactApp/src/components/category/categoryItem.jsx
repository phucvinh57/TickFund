import { Badge } from "react-bootstrap"
import { Trash } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { deleteCategory } from "../../redux/slice/categories"
import categoriesService from "../../services/categories.service"
import { convertUnifiedCodeToEmojiSymbol } from "../../utils"

export function CategoryItem({ icon, name, type }) {
    const dispatch = useDispatch()
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
            onClick={() => {
                categoriesService.remove(name).then(response => {
                    dispatch(deleteCategory(name))
                    toast.success("Xoá danh mục thành công")
                }).catch(err => toast.error("Xóa danh mục thất bại"))
            }}
        /></span>
    </Badge>
}