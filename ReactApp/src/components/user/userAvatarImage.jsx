import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { setAvatarUrl } from '../../redux/slice/user';
import { fileService } from '../../services/file.service';
import { personalService } from '../../services/personal.service';

const RoundImg = styled.img`
    width: 220px;
    height: 220px;
    border-radius: 50%;
    margin-right: 10px;
`;

export function UserAvatarImage() {
    const avatarUrl = useSelector(state => state.user.avatarUrl)
    const dispatch = useDispatch()
    const inputFileRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        if (!selectedImage) {
            setImagePreview(null)
            inputFileRef.current.value = ""
            return
        }

        const previewImageURL = URL.createObjectURL(selectedImage)
        setImagePreview(previewImageURL)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(previewImageURL)
    }, [selectedImage])

    const handleFileChange = event => setSelectedImage(event.target.files[0])

    const uploadAvatarImage = () => {
        const formData = new FormData()
        formData.append("avatar", selectedImage, selectedImage.name)
        fileService.uploadToPublic(formData).then(response => {
            const imagePath = response.data.path
            personalService.updateAvatar(imagePath).then(response => {
                console.log(response.data)
                setSelectedImage(null)
                dispatch(setAvatarUrl(imagePath))
            })
        })
    }
    const resetUploadState = () => setSelectedImage(null)
    return <div className="d-flex flex-column align-items-center">
        <RoundImg src={imagePreview ? imagePreview : avatarUrl} alt="Avatar" />
        <Form
            onSubmit={e => {
                e.preventDefault()
                uploadAvatarImage()
            }}
            className="mt-2"
        >
            {!imagePreview ?
                <Button onClick={() => inputFileRef.current.click()}>Đổi ảnh đại diện</Button>
                : <ButtonGroup>
                    <Button variant='outline-danger' onClick={() => resetUploadState()}>Đặt lại</Button>
                    <Button type='submit'>Lưu ảnh</Button>
                </ButtonGroup>}

            <Form.Control type='file' className='d-none' ref={inputFileRef} onChange={handleFileChange} />
        </Form>
    </div>
}