import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useState } from "react"
import { Form, Modal, Button, Toast, InputGroup } from "react-bootstrap"
import { BrushFill } from "react-bootstrap-icons"

import { convertUnifiedCodeToEmojiSymbol } from "../../utils/convertUnifiedCodeToEmojiSymbol"

const defaultFormData = {
  type: "",
  name: "",
  icon: null
}

export default function CreateCategoryModal({ mode }) {
  const [showModal, setShowModal] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [formData, setFormData] = useState(defaultFormData)

  return <div>
    <Button onClick={() => setShowModal(true)}>Thêm danh mục</Button>

    <Modal show={showModal} onHide={() => {
      if (!showEmojiPicker) {
        setShowModal(false)
        setFormData(defaultFormData)
        return
      }
      setShowEmojiPicker(false)
    }} size="md">

      <Modal.Header className="bg-primary text-white">
        <h5 className="m-auto">
          {mode === 'add' ? 'Thêm danh mục' : `Chỉnh sửa danh mục`}
        </h5>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={e => {
          e.preventDefault()
          setShowEmojiPicker(false)
          setShowModal(false)
        }}>
          <Form.Group className="mb-2">
            <Form.Label>Loại danh mục</Form.Label>
            <Form.Select required value={formData.type} onChange={e => setFormData({
              ...formData,
              type: e.target.value
            })}>
              <option value={""}>Chọn...</option>
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Tên danh mục</Form.Label>
            <InputGroup className="outline-none">
              <Form.Control
                required type="text" placeholder="Tên danh mục"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <Button
                variant="outline-primary"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {formData.icon === null ? <BrushFill /> : convertUnifiedCodeToEmojiSymbol(formData.icon)}
              </Button>
            </InputGroup>

          </Form.Group>

          <Toast
            show={showEmojiPicker}
            style={{ marginTop: "-1px" }}
            onClose={() => setShowEmojiPicker(false)}
            className="position-absolute end-0"
          >
            <Picker
              data={data} previewPosition={"none"}
              onEmojiSelect={emoji => {
                setFormData({ ...formData, icon: emoji.unified })
                console.log(emoji.unified)
              }}
            />
          </Toast>

          <Button variant="primary" type="submit" className="float-end">
            Submit
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  </div>
}