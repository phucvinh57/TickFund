import { FileEarmark, FileEarmarkText, FileEarmarkWord, FilePdf, FileSpreadsheet, Image } from "react-bootstrap-icons";

export default function Attachment({ path, name }) {
    return <div
        className="px-3 py-2 m-1 border rounded-pill hover me-2 bg-light fw-bold text-nowrap"
        onClick={() => { window.parent.open(path) }}
    >
        <span className="text-danger">{getFileSymbol(name)}</span>
        <span className="ms-1">{name}</span>
    </div>
}

const getFileSymbol = (filename) => {
    const extractFilename = filename.split(".");
    const extension = extractFilename.length === 1 ? null : extractFilename.pop()
    if(["jpg", "jpeg", "png"].includes(extension)) {
        return <Image />
    }
    if(["xlsx", "csv", "xls"].includes(extension))
        return <FileSpreadsheet />
    if(extension === "pdf")
        return <FilePdf />
    if(["doc", "docx"].includes(extension))
        return <FileEarmarkWord />
    if(extension === "txt") 
        return <FileEarmarkText />
    return <FileEarmark />
} 