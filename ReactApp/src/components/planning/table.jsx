import { useMemo, useState } from "react";

import PlanningModal from "./modal";
import { TickTableV2 } from "../ticktable/tableV2";
import { planningTableHeaders } from "../../constants/planningTableHeaders"
import randLogData from "./sampleData";

const initPlanningData = randLogData()

export default function PlanningTable() {
  const [showEditModal, setShowEditModal] = useState(false)
  const [targetPlan, setTargetPlan] = useState(null)

  const data = useMemo(() => {
    return initPlanningData.map(planning => {
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
  }, [])

  const handleRowClick = row => {
    let planning = initPlanningData.find(val => val.id === row.id.val)
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
      componentSize="md"
      headers={planningTableHeaders}
      data={data}
      numPages={20}

      defaultSortField='startDate'
      onQuery={conditions => console.log(conditions)}
      onRowClick={handleRowClick}
    />
  </div>
}


