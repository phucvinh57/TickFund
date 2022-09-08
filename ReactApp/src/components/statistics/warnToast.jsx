import { Toast } from "react-bootstrap"
import { genOutRangeDataSet } from "../../utils/chartutils"
import { dateToString } from "../../utils"


export default function WarnToast({filter, plannings, show, setShow}){

    if(filter == null 
        || plannings == null 
        || genOutRangeDataSet(filter, plannings).length == 0){
            return <></>
        }

    return <div className="row m-0 p-0 mt-2">
        <Toast
            show={show}
            onClose={() => setShow(false)}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto text-danger">Warning</strong>
            </Toast.Header>
            <Toast.Body className="dark">{ `Có một số dự trù chưa được giải quyết trước ${dateToString(filter.start)}`}</Toast.Body>
        </Toast>
    </div>
}