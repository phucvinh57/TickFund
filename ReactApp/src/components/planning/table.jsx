import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TickTable from "../ticktable";
import { headers } from './sampleData.js'

import PlanningModal from "./modal";

export default function PlanningTable() {
    const planningData = useSelector(state => state.planning)
    const [showEditModal, setShowEditModal] = useState(false)
    const [targetPlan, setTargetPlan] = useState(null)

    const data = useMemo(() => {
        return planningData.map(planning => {
            let color = planning.category.type === "Thu" ? "success" : "danger"
            return {
                id: {
                    val: planning.id,
                    component: <u className="text-secondary">#{planning.id}</u>
                },
                categoryName: {
                    val: planning.category.name,
                    component: <span className="fw-bold">{planning.category.name}</span>


                },
                categoryType: planning.category.type,
                amount: {
                    val: planning.amount,
                    component: <span className={"text-" + color}>
                        {(planning.category.type === "Thu" ? "+ " : "- ") + planning.amount} VND
                    </span>
                },
                startDate: planning.startDate
            }
        })
    }, [planningData])

    const handleRowClick = row => {
        
        let planning = planningData.find(val => val.id === row.id.val)
        setTargetPlan(planning)
        console.log(planning)
        setShowEditModal(true)
    }

    return <div>
        {targetPlan !== null && <PlanningModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            mode='edit'
            initData={targetPlan}
        />}
        <TickTable
            headers={headers}
            data={data}
            onSearch={query => console.log(query)}
            onSort={sortOption => console.log(sortOption)}
            onFilter={filter => console.log(filter)}
            onRowClick={handleRowClick}
            numPages={10}
            onPageChange={number => console.log(number)}
        />
    </div>
}


