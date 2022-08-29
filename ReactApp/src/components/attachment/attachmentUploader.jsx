import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { fileService } from '../../services/file.service';
import { CloudArrowUpFill, X, XCircle } from "react-bootstrap-icons"
import { useRef } from 'react';
import Attachment from "./attachment"

export function AttachmentUploader() {
    const [fileMetadata, setFileMetadata] = useState([])
    const uploadFileInputRef = useRef(null)

    const onFileChange = event => {
        const uploadedFiles = Object.values(event.target.files)


        const formData = new FormData()
        uploadedFiles.forEach(file => formData.append(file.name, file, file.name))

        fileService.upload(formData).then(response => {
            const mockFileData = response.data.slice(0, uploadedFiles.length)

            const fileData = mockFileData.map((value, index) => {
                return {
                    id: value.id,
                    path: process.env.REACT_APP_TFSERVICE_BASEURL + value.id,
                    name: uploadedFiles[index].name
                }
            })

            let isAlerted = false
            for (let fileIdx in fileData) {
                for (let dataIdx in fileMetadata) {
                    if (
                        fileData[fileIdx].name === fileMetadata[dataIdx].name
                        || fileData[fileIdx].name === fileMetadata[dataIdx].name.slice(0, fileData[fileIdx].name.length)
                    ) {
                        // Must replace by Toastify
                        fileData.splice(fileIdx, 1)
                        if(!isAlerted) {
                            alert("Duplicate file")
                            isAlerted = true
                        }
                    }
                }
            }
            setFileMetadata([...fileMetadata, ...fileData])
        })
    }

    // Notice that we
    const removeFile = function (fileId) {
        const newData = [...fileMetadata]
        newData.splice(newData.findIndex(file => file.id === fileId), 1)
        setFileMetadata(newData)
    }

    return <Form.Group className={fileMetadata.length === 0 ? "mb-2" : "mb-3"}>
        <Form.Label
            className='fw-bold hover'
            onClick={() => uploadFileInputRef.current.click()}
        >
            <span>Tệp đính kèm: </span>
            <CloudArrowUpFill className='ms-3' size={30} />
        </Form.Label>
        <Form.Control
            type="file"
            onChange={onFileChange}
            multiple className='d-none'
            ref={uploadFileInputRef}
        />
        {fileMetadata.length === 0 ? <div className='fst-italic text-muted'>
            No file selected.
        </div> : <div className='d-flex flex-wrap'>
            {fileMetadata.map(file => <div key={file.name} className='d-flex align-items-center me-3'>
                <Attachment path={file.path} name={file.name} />
                <X className='hover m-0 hover-danger rounded-pill' onClick={() => removeFile(file.id)} size={18} />
            </div>)}
        </div>}
    </Form.Group>
}

