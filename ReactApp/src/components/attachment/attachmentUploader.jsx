import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { fileService } from '../../services/file.service';
import { CloudArrowUpFill, X, XCircle } from "react-bootstrap-icons"
import { useRef } from 'react';
import Attachment from "./attachment"

export function AttachmentUploader({onFileChange}) {
    const [fileData, setFileData] = useState([])
    const uploadFileInputRef = useRef(null)
    
    useEffect(() => {
        onFileChange && onFileChange(fileData)
    }, [fileData])


    const onNewFiles = event => {
        const uploadedFiles = Object.values(event.target.files)
        console.log(uploadedFiles)

        // const formData = new FormData()
        // uploadedFiles.forEach(file => formData.append('file', file, file.name))
        // uploadedFiles.forEach(file => formData.append('file', file, file.name))
        for(let fileIdx in uploadedFiles){
            if(fileData.find(f => f.name === uploadedFiles[fileIdx].name) >= 0){
                alert("Duplicate file")
                return
            }
        }

        setFileData([...fileData, ...uploadedFiles])

        // fileService.uploadToTfService(formData).then(response => {
        //     const mockFileData = response.data.slice(0, uploadedFiles.length)

        //     const uploadFileData = mockFileData.map((value, index) => {
        //         return {
        //             id: value.id,
        //             path: process.env.REACT_APP_TFSERVICE_BASEURL + value.id,
        //             name: uploadedFiles[index].name
        //         }
        //     })

        //     let isAlerted = false
        //     for (let fileIdx in uploadFileData) {
        //         for (let dataIdx in fileMetadata) {
        //             if (
        //                 uploadFileData[fileIdx].name === fileMetadata[dataIdx].name
        //                 || uploadFileData[fileIdx].name === fileMetadata[dataIdx].name.slice(0, uploadFileData[fileIdx].name.length)
        //             ) {
        //                 // Must replace by Toastify
        //                 uploadFileData.splice(fileIdx, 1)
        //                 if(!isAlerted) {
        //                     alert("Duplicate file")
        //                     isAlerted = true
        //                 }
        //             }
        //         }
        //     }

        //     setFileMetadata([...fileMetadata, ...uploadFileData])
        // })
    }

    // Notice that we
    const removeFile = function (fileName) {
        const newData = [...fileData]
        newData.splice(newData.findIndex(file => file.name === fileName), 1)
        setFileData(newData)
    }

    return <Form.Group className={fileData.length === 0 ? "mb-2" : "mb-3"}>
        <Form.Label
            className='fw-bold hover'
            onClick={() => uploadFileInputRef.current.click()}
        >
            <span>Tệp đính kèm: </span>
            <CloudArrowUpFill className='ms-3' size={30} />
        </Form.Label>
        <Form.Control
            type="file"
            onChange={onNewFiles}
            multiple className='d-none'
            ref={uploadFileInputRef}
        />
        {fileData.length === 0 ? <div className='fst-italic text-muted'>
            No file selected.
        </div> : <div className='d-flex flex-wrap'>
            {fileData.map(file => <div key={file.name} className='d-flex align-items-center me-3'>
                <Attachment path={file.path} name={file.name} />
                <X className='hover m-0 hover-danger rounded-pill' onClick={() => removeFile(file.name)} size={18} />
            </div>)}
        </div>}
    </Form.Group>
}

