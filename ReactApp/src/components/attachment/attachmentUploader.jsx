import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { fileService } from '../../services/file.service';

export function AttachmentUploader() {
    // Initially, no file is selected
    const [selectedFiles, setSelectedFiles] = useState([])

    const onFileChange = event =>  {
        setSelectedFiles(event.target.files)
        console.log(event.target.files)
    }

    const onFileUpload = () => {
        const formData = new FormData()
        selectedFiles.forEach(file => formData.append(file.name, file, file.name))
        fileService.upload(formData)
    }

    return <div>
        <Form.Group>
            <Form.Control type="file" onChange={onFileChange} multiple />
            <Button onClick={onFileUpload}>
                Upload!
            </Button>
        </Form.Group>
        {selectedFiles.length !== 0
            ? selectedFiles.map(file => <div>
                <h4>File Details:</h4>

                <p>File Name: {file.name}</p>
                <p>File Type: {file.type}</p>
                <p>
                    Last Modified:{" "}
                    {file.lastModifiedDate.toDateString()}
                </p>
            </div>)
            : <div>
                Please select file
            </div>}
    </div>
}

