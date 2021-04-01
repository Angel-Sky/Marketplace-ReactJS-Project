import { useEffect, useState } from 'react';
import { Col, Row, Spinner, Tab, Nav, Button } from 'react-bootstrap';
import { getUserSells } from '../../../services/productService';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import Wishlist from '../Wishlist/Wishlist'
import ActiveSells from '../Sells/ActiveSells';
import ArchivedSells from '../Sells/ArchivedSells'
import './Profile.css';
import { Link } from 'react-router-dom';
// import '../../ProductCard/DisabledProductCard/DisabledCard.css'

function Profile({ history }) {
    const [active, setActive] = useState(true);
    const [archived, setArchived] = useState(false);
    const [wishlist, setWishlist] = useState(false);

    const handleActive = () => {
        setActive(true)
        setArchived(false);
        setWishlist(false);
    }

    const handleArchived = () => {
        setActive(false);
        setArchived(true);
        setWishlist(false);
    }

    const handleWish = () => {
        setActive(false);
        setArchived(false);
        setWishlist(true);
    }

    return (
        <>
            <div id="profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={2} md={5} sm={12}>
                            <img id="avatar" src="https://images.unsplash.com/photo-1562087926-662f8573327b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" />
                        </Col>
                        <Col lg={5} md={3} sm={12}>
                            <p><BsFillPersonFill /> Ivan Ivanov</p>
                            <p><MdEmail /> ivan@abv.bg</p>
                            <p><MdPhoneAndroid /> +3598849123</p>
                            <p><FaSellsy /> 12 sells in total</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="container">
                <Row>
                    <Col sm={3} id="aside">
                        <Button variant="dark" id="active-sells" onClick={handleActive}>Active Sells</Button>{' '}
                        <Button variant="dark" id="archived-sells" onClick={handleArchived}>Archived</Button>{' '}
                        <Button variant="dark" id="wishlist" onClick={handleWish}>Wishlist</Button>{' '}
                    </Col>
                    <Col lg={9}>
                        {active && <ActiveSells />}
                        {archived && <ArchivedSells history={history}/>}
                        {wishlist && <Wishlist />}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Profile;