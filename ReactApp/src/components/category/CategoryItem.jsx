import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { useState } from "react"
import { Toast } from "react-bootstrap"
import { BrushFill, Check, PlusCircle, Trash } from "react-bootstrap-icons"
import { useDispatch } from "react-redux"
import { postCategory } from "../../redux/category"
import { convertUnifiedCodeToEmojiSymbol } from "../../utils/convertUnifiedCodeToEmojiSymbol"
import "./category.scss"

export const UNTRACKED = 0
export const UNMODIFY = 1
export const MODIFY = 2

const init = {
  type: 'expense',
  name: "",
  icon: null
}

export default function CategoryItem({ category = init, mode = UNTRACKED }) {
  const dispatch = useDispatch()

  const [modeItem, setModeItem] = useState(mode) 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [formData, setFormData] = useState(category)

  return (
    modeItem === UNMODIFY ?
      <div className=" col-xs-3 col-lg-4">
        <div className="tf-thumbnail">
          <div className="tf-icon">
            {formData.icon === null ? <BrushFill /> : convertUnifiedCodeToEmojiSymbol(category.icon)}
          </div>
          <div className="tf-caption">
            <p >
              {formData.name}
            </p>
            <p >
              {formData.type==='expense' ? 'Thu' : 'Chi'} 
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
                <label htmlFor="input" className="control-label" >Tên danh mục</label><i className="bar"></i>
              </div>
              <p>
                <a
                  className={formData.type === 'income' ? 'text-black-50' : 'text-success'}
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                >Thu</a>
                &nbsp;
                <a className={formData.type === 'expense' ? 'text-black-50' : 'text-danger'}
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                >Chi</a>
              </p>
            </div>
            <button onClick={e => {
              category = formData
              dispatch(postCategory(formData))
              setModeItem(UNTRACKED)
              e.preventDefault()
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