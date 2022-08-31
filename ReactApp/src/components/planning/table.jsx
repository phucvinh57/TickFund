import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import PlanningModal from "./modal";
import TickTableV2 from "../ticktable/tableV2";
import { planningTableV2Headers } from "../../constants/planningTableV2Headers"

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

        <TickTableV2
            // tableName={"Table Version 2"}
            componentSize="md"
            headers={planningTableV2Headers}
            data={data}
            numPages={20}

            defaultSortField='startDate'
            onQuery={conditions => console.log(conditions)}
            onRowClick={handleRowClick}
        />
    </div>
}


