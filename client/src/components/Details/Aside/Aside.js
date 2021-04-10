import { useState } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiMessage3Fill } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { MdArchive } from 'react-icons/md'
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { archiveSell } from '../../../services/productData';
import { createChatRoom } from '../../../services/messagesData'
import './Aside.css';


function Aside({ params, history }) {
    const [showMsg, setShowMdg] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [message, setMessage] = useState("");
    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);

    const handleCloseArchive = () => setShowArchive(false);
    const handleShowArchive = () => setShowArchive(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        archiveSell(params._id)
            .then(res => {
                setShowArchive(false);
                history.push(`/profile/${params.seller}`);
            })
            .catch(err => console.log(err))
    }

    const handleMsgChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const onMsgSent = (e) => {
        e.preventDefault();
        createChatRoom(params.sellerId, message)
            .then((res) => {
                history.push(`/messages/${res.messageId}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <aside>
            <div className="product-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    <h4 id="product-price-heading">Product Price </h4>
                    {params.isSeller &&
                        <>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit the selling</Tooltip>}>
                                <span id="edit-icon">
                                    <Link to={`/categories/${params.category}/${params._id}/edit`}><GrEdit /></Link>
                                </span>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Archive</Tooltip>}>
                                <span id="archive-icon" onClick={handleShowArchive}>
                                    <MdArchive />
                                </span>
                            </OverlayTrigger>

                        </>
                    }
                    {params.price && <h1 id="price-heading">{(params.price).toFixed(2)}€</h1>}
                </div>
                {params.isAuth ? (<>
                    {!params.isSeller &&
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleShow}>
                            <RiMessage3Fill />Contact Seller
                        </Button>
                    }
                    <Link to={`/profile/${params.sellerId}`}>
                        <Col lg={12}>
                            <img id="avatar" src={params.avatar} alt="user-avatar" />
                        </Col>
                        <Col lg={12}>
                            <p><BsFillPersonFill /> {params.name}</p>
                            <p><MdEmail /> {params.email}</p>
                            <p><MdPhoneAndroid /> {params.phoneNumber}</p>
                            <p><FaSellsy /> {params.createdSells} sells in total</p>
                        </Col>
                    </Link>
                </>) : (
                        <p id="guest-msg"><Link to="/auth/login">Sign In</Link> now to contact the seller!</p>
                    )}
            </div>
            <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" name="textarea" onChange={handleMsgChange} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onMsgSent}>Sent</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
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