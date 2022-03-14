import React, {useEffect, useState} from 'react'
import { Card, Carousel, Row, Col, Ratio } from 'react-bootstrap'
import nhancu from '../../assets/nhancu.jpg'


export default function Category() {
    return <div>
        <Carousel>
            <Carousel.Item>
                <Row xs={1} md={4} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col key={idx}>
                        <Card
                            border="success"
                            key={idx}
                            text='black'
                            className="mb-2"
                        >   
                            <Ratio aspectRatio="16x9">
                                <embed type="image/svg+xml" src={nhancu} />
                            </Ratio>
                            <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    ))}
                    </Row>
            </Carousel.Item>
        </Carousel>
    </div>
}