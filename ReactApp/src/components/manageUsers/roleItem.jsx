import { Accordion, Row, Col, FormCheck, Button, FormLabel } from "react-bootstrap";
import { convertResourceActionMappingToLabel } from "../../utils/convertResourceActionMappingToLabel";

export function RoleItem({ config, setPolicy, updatePolicy }) {

  return <Accordion.Item eventKey={config.ID}>
    <Accordion.Header><h5>{config.name}</h5></Accordion.Header>
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