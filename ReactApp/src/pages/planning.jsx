import { useState } from "react";
import { Button } from "react-bootstrap";
import { PiggyBank } from "react-bootstrap-icons";
import PlanningModal from "../components/planning/modal";
import PlanningTable from "../components/planning/table";

export default function Planning() {
  const [showModal, setShowModal] = useState(false)

  return <div>
    <div className="d-flex justify-content-between align-items-center">
      <h4>Danh sách dự trù</h4>
      <Button className="d-flex align-items-center text-white"
        onClick={() => setShowModal(true)}
      >
        Thêm dự trù
        <PiggyBank size={18} className='ms-2' />
      </Button>
    </div>
    <PlanningModal
      show={showModal}
      onHide={() => setShowModal(false)}
      mode='add'
    />
    <PlanningTable />
  </div>
}