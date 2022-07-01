import FormAdd from "../components/transactions/modal"
import HistoryTable from "../components/transactions/history"
import Category from "../components/transactions/category"
import { useState } from "react"
import { Button } from "react-bootstrap";


export default function Transactions() {
    const [modalAdd, setModalAdd] = useState(false)

    return <div>
        <div className="mb-3">
            <Button variant="primary" onClick={() => setModalAdd(true)}>
                Tạo giao dịch
            </Button>

            <FormAdd
                show={modalAdd}
                onHide={() => setModalAdd(false)}
            ></FormAdd>
        </div>
        <Category />
        <HistoryTable />
    </div>
}


