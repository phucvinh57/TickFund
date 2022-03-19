import { useEffect, useState } from "react"
import { Accordion, Button, ButtonGroup } from "react-bootstrap"
import TickTable from "../components/ticktable"
import { category } from "../components/exchanges/sampleData"
import { getRandomDate, getRandomItem, prettyDate } from "../utils"
import { db } from "../components/plannings/planningData"


export default function Plannings() {
    const [ view, setView ] = useState(0)
    const [ key, setKey ] = useState();

    const [ showedData, setShowedData ] = useState(null)
    
    const views = [
        (<Accordion defaultActiveKey="0" className="mb-3" activeKey={key} onSelect={(k) => setKey(k)}>
            <Accordion.Item eventKey="0" >
                <Accordion.Header>Đến hạn giải quyết</Accordion.Header>
                <Accordion.Body>
                    {JSON.stringify(db)}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Chưa đến hạn giải quyết</Accordion.Header>
                <Accordion.Body>
                    {JSON.stringify(db)}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Đã giải quyết xong</Accordion.Header>
                <Accordion.Body>
                    {JSON.stringify(db)}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>),
            (<Accordion defaultActiveKey="0" className="mb-3" activeKey={key} onSelect={(k) => setKey(k)} >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>)
    ]

    const handleView = (event) => {
        setView(event.target.value)
        setKey('0')
    }

    return <div>
        <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button variant="primary" value={0} onClick={handleView}>Dự trù thu</Button>
            <Button variant="primary" value={1} onClick={handleView}>Dự trù chi</Button>
            <Button variant="primary" value={2} onClick={handleView}>Yêu cầu giải ngân</Button>
            <Button variant="primary" value={3} onClick={handleView}>Yêu cầu đóng góp</Button>
        </ButtonGroup>

        <div>{views[view]}</div>

    </div>
}