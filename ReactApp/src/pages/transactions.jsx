import CreateTransactionModal from "../components/transactions/CreateTransactionModal"
import { useState } from "react"
import { Button } from "react-bootstrap";
import TransactionTableV2 from "../components/transactions/transactionTableV2";

export default function Transactions() {
    const [modalAdd, setModalAdd] = useState(false)

    return <div>
        <div className="mb-3">
            <Button variant="primary" onClick={() => setModalAdd(true)}>
                Tạo giao dịch
            </Button>
            <CreateTransactionModal
                show={modalAdd}
                onHide={() => setModalAdd(false)}
            />
        </div>
        {/* <Category /> */}
        <TransactionTableV2 />
    </div>
}


