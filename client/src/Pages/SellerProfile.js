import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard'
import { getUserById } from '../services/userData';
import { Link } from 'react-router-dom'
import { Col, Row, Button, Spinner, Form, Modal } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import { RiMessage3Fill } from 'react-icons/ri';
import '../components/Profile/Profile.css';

function SellerProfile({ match, history }) {
    const [seller, setSeller] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMsg, setShowMdg] = useState(false);
    const handleClose = () => setShowMdg(false);
    const handleShow = () => setShowMdg(true);
    useEffect(() => {
        getUserById(match.params.id)
            .then(res => {
                setSeller(res.user)
                setLoading(false);
            }).catch(err => console.log(err))
    }, [setSeller])
    console.log(seller)
    return (
        <>
            <div id="profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={2} md={5} sm={12}>
                            <img id="avatar" src={seller.avatar} />
                        </Col>
                        <Col lg={2} md={3} sm={12}>
                            <p><BsFillPersonFill /> {seller.name}</p>
                            <p><MdEmail /> {seller.email}</p>
                            <p><MdPhoneAndroid /> {seller.phoneNumber}</p>
                            <p><FaSellsy /> {seller.totalSells} sells in total</p>
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
                        {!loading ?
                            (<>
                                <h1 className="heading">{seller.name}'s Active Sells</h1>
                                {seller.createdSells.filter(x => x.active === true).length > 0 ? (
                                    <Row>
                                        {seller.createdSells
                                            .filter(x => x.active === true)
                                            .map(x =>
                                                <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                                    <ProductCard params={x} />
                                                </Col>
                                            )
                                        }
                                    </Row>
                                ) : (
                                        <p className="nothing-to-show">Nothing to show</p>
                                    )
                                }
                            </>) :
                            <Spinner animation="border" />}

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