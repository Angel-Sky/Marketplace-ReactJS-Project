import { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { RiDeviceRecoverFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


function DisabledCard({ params, history }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/products/enable/${params._id}`)
            .then(res => res.json())
            .then(res => {
                console.log(history)
                setShow(false);
                // history.push('/your-sells')
                // history.push('/')
            })
    }

    return (
        <div className="disabled-card">
            <Card>
                <Card.Img variant="top" src={params.image} />
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>{params.price}€</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        {params.addedAt} -  {params.city}
                        <span id="enableIcon" onClick={handleShow}><RiDeviceRecoverFill /></span>
                    </small>
                </Card.Footer>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to make this item active?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    By clicking <strong>Make Active</strong>, this sell will change
                    it's status to <strong>Active</strong>,
                    which means that everyone on this Web site will see it.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Make Active
                        {/* <Link to={`/enable/${params._id}`} onClick={handleClose}>Make Active</Link> */}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DisabledCard;