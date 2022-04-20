import FormAdd from "../components/exchanges/transaction"
import HistoryTable from "../components/exchanges/history"
import Category from "../components/exchanges/category"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import { getRandomDate, getRandomItem, prettyDate } from "../utils";
import { genCategory, genUser, makeid } from "../components/exchanges/sampleData";
const init = {
    id: '',
    time: '',
    money: '',
    category: '',
    user: '',
    notes: '',
    attachments: []
}


export default function Exchanges() {
    const [history, setHistory] = useState(transaction)
    const [category, setCategory] = useState(categories)
    const [modalAdd, setModalAdd] = useState(false)

    const handleChange = (transaction) => {
        console.log(transaction)
        const _history = [transaction, ...history]
        setHistory(_history)
    }
    useEffect(() => {
        const _category = category
        setCategory(_category)
    })

    return <div>
        <div className="mb-3">
            <Button variant="primary" onClick={() => setModalAdd(true)}>
                Tạo giao dịch
            </Button>

            <FormAdd
                init={init}
                users={users}
                categories={categories}
                show={modalAdd}
                onHide={() => setModalAdd(false)}
                onClick={(transaction) => {
                    handleChange(transaction)
                    setModalAdd(false)
                }}
            ></FormAdd>
        </div>
        <Category data={category} />
        <HistoryTable DB={history} />
    </div>
}


const users = genUser()

const categories = genCategory()

const transaction = genTransaction(20)