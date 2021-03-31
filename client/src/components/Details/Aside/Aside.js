import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md'
import { archiveSell } from '../../../services/productService'
import './Aside.css';

function Aside({ params, history }) {
    const [showMsg, setShowMdg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);

    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);

    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        archiveSell(params._id)
            .then(res => {
                setShowArchive(false);
                history.push('/your-sells')
            })
    }
    console.log(params)
    return (
        <aside>
            <div id="priceLabel" className="col-lg-12">
                <h4 id="product-price-heading">Product Price </h4>
                {params.isSeller &&
                    <>
                        <span id="edit-icon">
                            <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                        </span>
                        <span id="archive-icon" onClick={handleShowArchive}>
                            <MdArchive />
                        </span>
                    </>
                }
                <h1>{params.price} €</h1>
            </div>
            <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                <RiMessage3Fill />Contact Seller
            </Button>{' '}

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

            <Modal show={showArchive} onHide={handleCloseArchive}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to archive this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        By clicking <strong>Archive</strong>, this sell will change
                    it's status to <strong>Archived</strong>,
                    which means that no one but you will be able see it.
                    You may want to change the status to <strong>Actived</strong> if you have
                    sold the item or you don't want to sell it anymore.
                    </p>

                    Don't worry, you can unarchive it at any time from Profile - Sells!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseArchive}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Archive
                    </Button>
                </Modal.Footer>
            </Modal>
        </aside>
    )
}

export default Aside;