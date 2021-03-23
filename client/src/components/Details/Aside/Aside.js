import {  useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';

import './Aside.css';

function Aside({ params }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <aside>
            <div id="priceLabel" className="col-lg-12">
                <h4>Product Price </h4>
                <h1>{params.price} €</h1>
            </div>
            <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                <RiMessage3Fill />Contact Seller
            </Button>{' '}

            <Modal show={show} onHide={handleClose}>
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
        </aside>
    )
}

export default Aside;