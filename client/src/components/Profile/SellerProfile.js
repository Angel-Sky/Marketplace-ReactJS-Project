import { useState } from 'react';
import { Link } from 'react-router-dom'
import ActiveSells from './Sells/ActiveSells'
import { Col, Row, Button, Spinner, Form, Modal } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri';

function SellerProfile({ params }) {
    const [showMsg, setShowMdg] = useState(false);
    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);

    return (
        <>
            <div id="profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={2} md={5} sm={12}>
                            <img id="avatar" src={params.avatar} />
                        </Col>
                        <Col lg={2} md={3} sm={12}>
                            <p><BsFillPersonFill /> {params.name}</p>
                            <p><MdEmail /> {params.email}</p>
                            <p><MdPhoneAndroid /> {params.phoneNumber}</p>
                            <p><FaSellsy /> {params.totalSells} sells in total</p>
                        </Col>
                        <Col lg={3} md={4} sm={12}>
                            <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                                <RiMessage3Fill />Contact Seller
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="container">
                <Row>
                    <Col lg={12}>
                        <ActiveSells params={params} />
                    </Col>
                </Row>
            </div>
            <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Link to="/"><Button variant="dark">Sent</Button></Link>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default SellerProfile;