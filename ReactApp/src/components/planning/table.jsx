import { useEffect, useState } from "react";

import { EditPlanningModal } from "./editPlanningModal";
import { TickTableV2 } from "../ticktable/tableV2";
import { planningTableHeaders } from "../../constants/planningTableHeaders"
import { DEFAULT_PLANNING_QUERY } from "../../constants/pageSettings";
import planningService from "../../services/planning.service";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { EMPTY_AVATAR } from "../../resource";
import { dateToString, prettyNumber } from "../../utils";
import { convertUnifiedCodeToEmojiSymbol } from "../../utils";
import AddTransactionModal from "../transactions/createTransactionModal";

const PLANNING_FIELD_MAP = {
  'id': 'ID',
  'categoryName': 'category_name',
  'user': 'user_id',
  'startDate': 'start_date',
  'nextDue': 'next_due'
}
function planingToTableData(plannings, users, categories) {
  return plannings.map(planning => {
    const storeCategory = categories.find(c => c.name === planning.category_name)
    const planningUser = users.find(u => u.ID === planning.user_id)
    const categoryIcon = storeCategory ? storeCategory.icon : null
    let color = (storeCategory && storeCategory.type === "income") ? "success" : "danger"

    return {
      id: {
        val: planning.ID,
        component: <span>{planning.ID}</span>
      },
      user: {
        val: planningUser.ID,
        component: <div>
          <Row>
            <Col className='col-auto d-flex align-items-center'>
              <div style={{ height: '2.5rem', width: '2.5rem' }}>
                <img className='img-fluid circle-border'
                  src={planningUser.avatarUrl ? planningUser.avatarUrl : EMPTY_AVATAR}
                  style={{ aspectRatio: '1/1' }} alt='avatar' />
              </div>
            </Col>
            <Col>
              <Row className='my-0'>
                <span className='fw-bold'>{planningUser.name}</span>
              </Row>
              <Row className='my-0'>
                <span>@{planningUser.ID}</span>
              </Row>
            </Col>
          </Row>
        </div>
      },
      categoryName: {
        val: planning.category_name,
        component: <span className="fw-bold">
          {convertUnifiedCodeToEmojiSymbol(categoryIcon)
            + " " + planning.category_name}
        </span>
      },
      amount: {
        val: planning.amount,
        component: <span className={"text-" + color}>
          {prettyNumber(planning.amount)}
        </span>
      },
      nextDue: dateToString(new Date(planning.next_due)),
      countdown: {
        val: planning.countdown,
        component: <span>
          {planning.countdown == 0 ? 'Đã xong'
            : (planning.countdown == -1 ? 'Mãi mãi' : planning.countdown)}
        </span>
      }
    }
  })
}
export default function PlanningTable() {
  const users = useSelector((state) => state.users)
  const categories = useSelector((state) => state.categories)
  const [plannings, setPlannings] = useState([])
  const [query, setQuery] = useState(DEFAULT_PLANNING_QUERY)
  const [showEditPlanningModal, setShowEditPlanningModal] = useState(false)
  const [showResolvePlanningModal, setShowResolvePlanningModal] = useState(false)
  const [targetPlanning, setTargetPlanning] = useState(null)

  useEffect(() => {
    planningService.getPlanningByQuery(query).then(response => {
      setPlannings(response.data.results)
    })
  }, [query])

  const handleOnRowClick = row => {
    planningService.getById(row.id.val).then(response => {
      const planningData = response.data
      setTargetPlanning({
        ID: planningData.ID,
        amount: planningData.amount,
        categoryName: planningData.category_name,
        userId: planningData.user_id,
        isRepeat: planningData.is_repeat.toString(),
        startDate: planningData.start_date,
        repeat: {
          countdown: planningData.countdown,
          cycle: planningData.cycle_unit
        }
      })
      setShowEditPlanningModal(true)
    })
  }

  return <div>
    {targetPlanning !== null && <EditPlanningModal
      show={showEditPlanningModal}
      onHide={() => setShowEditPlanningModal(false)}
      planningData={targetPlanning}
      onResolve={() => {
        setShowEditPlanningModal(false)
        setShowResolvePlanningModal(true)
      }}
    />}
    {targetPlanning !== null && <AddTransactionModal
      show={showResolvePlanningModal}
      onHide={() => setShowResolvePlanningModal(false)}
      planningData={targetPlanning}
    />}
    <TickTableV2
      componentSize="md"
      headers={planningTableHeaders}
      data={planingToTableData(plannings, users, categories)}
      numPages={20}

      defaultSortField='startDate'
      onQuery={conditions => console.log(conditions)}
      onRowClick={handleOnRowClick}
    />
  </div>
}


