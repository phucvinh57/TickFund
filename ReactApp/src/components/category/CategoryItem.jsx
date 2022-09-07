import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useState } from "react"
import { Form, Toast } from "react-bootstrap"
import { BrushFill, Check, PlusCircle, Trash } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { postCategory } from "../../redux/category"
import { convertUnifiedCodeToEmojiSymbol } from "../../utils/convertUnifiedCodeToEmojiSymbol"
import "./category.scss"

export const UNTRACKED = 0
export const UNMODIFY = 1
export const MODIFY = 2

const init = {
  type: "",
  name: "",
  icon: null
}

export default function CategoryItem({ data, mode = UNTRACKED }) {
  const dispatch = useDispatch()

  const [modeItem, setModeItem] = useState(mode) 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [formData, setFormData] = useState(data == null ? init : data)

  return (
    modeItem === UNMODIFY ?
      <div className=" col-xs-3 col-lg-4">
        <div className="tf-thumbnail">
          <div className="tf-icon">
            {data.icon === null ? <BrushFill /> : convertUnifiedCodeToEmojiSymbol(data.icon)}
          </div>
          <div className="tf-caption">
            <p >
              {data.name}
            </p>
            <p >
              {data.type}
            </p>
          </div>
          <button><Trash size={18} /></button>
        </div>
      </div> :
      modeItem === MODIFY ?
        <div className=" col-xs-3 col-lg-4">
          <form className="tf-thumbnail">
            <a 
              className="tf-icon"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {formData.icon === null ? <BrushFill /> : convertUnifiedCodeToEmojiSymbol(formData.icon)}
            </a>
            <div className="tf-caption">
              <div className="form-group">
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required />
                <label for="input" className="control-label" >Tên danh mục</label><i className="bar"></i>
              </div>
              <p>
                <a
                  className={formData.type === 'Thu' ? 'text-black-50' : 'text-success'}
                  onClick={() => setFormData({ ...formData, type: 'Thu' })}
                >Thu</a>
                &nbsp;
                <a className={formData.type === 'Chi' ? 'text-black-50' : 'text-danger'}
                  onClick={() => setFormData({ ...formData, type: 'Chi' })}
                >Chi</a>
              </p>
            </div>
            <button onClick={e => {
              e.preventDefault()
              dispatch(postCategory(formData))
              setModeItem(UNTRACKED)
            }}><Check size={18} /></button>
          </form>

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
        </div> :
        modeItem === UNTRACKED ?
          <div className=" col-xs-3 col-lg-4" onClick={() => setModeItem(MODIFY)}>
            <div className="tf-thumbnail new">
              <PlusCircle size={25} />
            </div>
          </div> : <></>
  )
}