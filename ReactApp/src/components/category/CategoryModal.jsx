import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, selectAllCategories } from "../../redux/category";
import "./category.scss"
import CategoryItem, { UNMODIFY, UNTRACKED } from "./CategoryItem";

const defaultFormData = {
  type: "",
  name: "",
  icon: null
}

const sample = [{
  name: 'Tiền nhà',
  type: 'Chi',
  icon: '1f3e0'
}, {
  name: 'Tiền điện',
  type: 'Chi',
  icon: '1f4a1'
}, {
  name: 'Tiền thiết bị',
  type: 'Chi',
  icon: '1fa9b'
}, {
  name: 'Tiền dự án',
  type: 'Thu',
  icon: '1f468-200d-1f4bb'
}, {
  name: 'Tiền nước',
  type: 'Chi',
  icon: '1f4a7'
}]

export default function CategoryModal({ show, onHide }) {

  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)

  useEffect(() => {
    dispatch(getCategory())
  }, [])
  

  return <Modal
    show={show}
    onHide={onHide}
    size="lg">

    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Danh mục
      </h5>
    </Modal.Header>

    <Modal.Body>

      <div id="products" className="row">
        {categories.map((el, _) =>
          <CategoryItem mode={UNMODIFY} category={el} key={_} />
        )}
        <CategoryItem mode={UNTRACKED} />
      </div>


    </Modal.Body>

  </Modal>
}