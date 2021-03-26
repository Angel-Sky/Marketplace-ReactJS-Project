import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr'

import './Aside.css';

function Aside({ params }) {
    const [show, setShow] = useState(false);
    const product = params;
    console.log(params)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <aside>
            <div id="priceLabel" className="col-lg-12">
                <h4 id="product-price-heading">Product Price </h4>
                <span id="edit-icon">
                    <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                </span>
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