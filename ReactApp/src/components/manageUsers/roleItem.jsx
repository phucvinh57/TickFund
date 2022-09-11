import { Accordion, Row, Col, FormCheck, Button, FormLabel } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { roleService } from "../../services/role.service";
import { convertResourceActionMappingToLabel } from "../../utils/convertResourceActionMappingToLabel";

export function RoleItem({ config, setPolicy, updatePolicy, openRoleNameModal }) {

  return <Accordion.Item eventKey={config.ID}>
    <div className="d-flex align-items-center">
      <Accordion.Header style={{ flexGrow: 1 }}>
        <h5>{config.name}</h5>
      </Accordion.Header>
      <Pencil size={20} className="hover ms-3 me-4"
        onClick={e => {
          e.stopPropagation()
          openRoleNameModal()
        }}
      />
      <Trash 
        size={20} className="hover me-3"
        onClick={() => {
          roleService.deleteRoleById(config.ID).then(response => {
            toast.success("Xóa vai trò thành công")
          }).catch(err => {
            toast.error("Không thể xóa vai trò đang được sử dụng bởi thành viên")
          })
        }}
      />
    </div>


    <Accordion.Body>
      {config.resources.map(resource => {
        return <div key={resource.key} className='py-1'>
          <Row>
            <Col>
              <h6>Quyền với {resource.name}</h6>
            </Col>
          </Row>
          {
            resource.actions.map(action => {
              return <Row key={action.key} className='py-1'>
                <Col>
                  <FormLabel><span>{convertResourceActionMappingToLabel(resource.name, action.name)}</span></FormLabel>
                </Col>
                <Col xs='auto d-flex align-items-center'>
                  <FormCheck checked={action.permit} onChange={() => {
                    setPolicy(config.ID, resource.ID, action.ID, !action.permit)
                  }} />
                </Col>
              </Row>
            })
          }
        </div>
      })}
      <div className="d-flex justify-content-end">
        <Button onClick={() => { updatePolicy(config.ID) }}>
          Lưu thay đổi
        </Button>
      </div>
    </Accordion.Body>
  </Accordion.Item>
} 