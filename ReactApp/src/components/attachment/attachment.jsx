import { FileEarmark, Image } from "react-bootstrap-icons";

export default function Attachment({ path, name }) {
    return <span
        className="px-3 py-2 border rounded-pill hover me-2 bg-light fw-bold"
        onClick={() => { window.parent.open(path) }}
    >
        <span className="text-danger">{getFileSymbol(name)}</span>
        <span className="ms-1">{name}</span>
    </span>
}

const getFileSymbol = (filename) => {
    const extractFilename = filename.split(".");
    const extension = extractFilename.length === 1 ? null : extractFilename.pop()
    if(extension === "jpg" || extension === "png") {
        return <Image />
    }
    return <FileEarmark />
} 