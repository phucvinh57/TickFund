import { useState } from "react";
import { Button, Form, InputGroup, Modal, Toast, Dropdown, DropdownButton } from "react-bootstrap";
import { PlusCircle, BrushFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { CategoryItem } from "./categoryItem";
import { convertUnifiedCodeToEmojiSymbol } from "../../utils/convertUnifiedCodeToEmojiSymbol"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import categoriesService from "../../services/categories.service";
import { toast } from "react-toastify";
import { addCategory } from "../../redux/slice/categories";
import { ALL, EXPENSE, INCOME } from "../../constants/categoryTypes";

const defaultAddCategoryData = {
  name: "",
  icon: "1f642",
  type: INCOME
}

export function CategoryModal({ show, onHide }) {
  const categories = useSelector(state => state.categories)
  const [categoryFilter, setCategoryFilter] = useState(ALL)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [addCategoryData, setAddCategoryData] = useState(defaultAddCategoryData)
  const dispatch = useDispatch()

  return <Modal show={show} onHide={() => {
    if (!showEmojiPicker) {
      onHide()
      setAddCategoryData(defaultAddCategoryData)
      return
    }
    setShowEmojiPicker(false)
  }} size="lg">
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Thêm vai trò
      </h5>
    </Modal.Header>
    <Modal.Body>
      <div className="row">
        <Form className="col"
          onSubmit={e => {
            e.preventDefault()
            categoriesService.addNew(addCategoryData).then(response => {
              onHide()
              dispatch(addCategory(addCategoryData))
              setAddCategoryData(defaultAddCategoryData)
              toast.success("Thêm danh mục thành công")
            })
          }}
        >
          <InputGroup>
            <Form.Control
              type="text" required minLength={4}
              placeholder="Tên danh mục cần thêm"
              value={addCategoryData.name}
              onChange={e => setAddCategoryData({ ...addCategoryData, name: e.target.value })}
            />
            <DropdownButton
              variant="outline-secondary"
              title={addCategoryData.type === INCOME ? "Thu " : "Chi "}
              id="segmented-button-dropdown-1"
            >
              <Dropdown.Item
                onClick={() => setAddCategoryData({ ...addCategoryData, type: INCOME })}
              >
                Thu
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAddCategoryData({ ...addCategoryData, type: EXPENSE })}
              >
                Chi
              </Dropdown.Item>
            </DropdownButton>
            <Button
              variant="outline-secondary"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {addCategoryData.icon === null
                ? <BrushFill />
                : convertUnifiedCodeToEmojiSymbol(addCategoryData.icon)
              }
            </Button>

            <Button type="submit">
              <PlusCircle size={16} style={{ fontWeight: 600 }} />
            </Button>
          </InputGroup>
          <Toast
            show={showEmojiPicker}
            style={{ marginTop: "-1px" }}
            onClose={() => setShowEmojiPicker(false)}
            className="position-absolute end-0 zdrop"
          >
            <Picker
              data={data} previewPosition={"none"}
              onEmojiSelect={emoji => {
                setShowEmojiPicker(false)
                setAddCategoryData({ ...addCategoryData, icon: emoji.unified })
              }}
            />
          </Toast>
        </Form>
        <Form.Group className="col-auto">
          <Form.Select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value={ALL}>Tất cả</option>
            <option value={INCOME}>Thu</option>
            <option value={EXPENSE}>Chi</option>
          </Form.Select>
        </Form.Group>
      </div>

      <hr />
      {categories.reduce((filtered, category) => {
        if (category.type === categoryFilter || categoryFilter === ALL) {
          filtered.push(<CategoryItem
            key={category.name}
            icon={category.icon}
            name={category.name}
            type={category.type}
          />)
        }
        return filtered
      }, [])}
    </Modal.Body>
  </Modal>
}