import Transaction from "../components/exchanges/transaction"
import History from "../components/exchanges/history"
import Category from "../components/exchanges/category"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { history, category } from "../components/exchanges/sampleData";

export default function Exchanges() {
    const [ showedTransaction, setShowedTransaction ] = useState(false)
    const [ showedHistory, setShowedHistory ] = useState(history)

    const handleChange = (transaction) => {
        const filter = ({id, time, money, category }) => ({id, time, money, category: category.kind + ' ' + category.name})
        const _history = [filter(transaction), ...showedHistory]
        setShowedHistory(_history)
        setShowedTransaction(false)
    }

    return <div>
        <div className="mb-3">
            <Button variant="primary" onClick={() => setShowedTransaction(true)}>
                Tạo giao dịch
            </Button>

            <Transaction
                categoryList={category}
                show={showedTransaction}
                onHide={() => setShowedTransaction(false)}
                onClick={handleChange}
            ></Transaction>
        </div>        
        <Category data={category} />
        <History data={showedHistory}/>
    </div>
}