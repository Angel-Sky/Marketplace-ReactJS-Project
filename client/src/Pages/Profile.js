import { useEffect, useState } from 'react';
import Wishlist from '../components/Profile/Wishlist/Wishlist'
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import ArchivedSells from '../components/Profile/Sells/ArchivedSells'
import { getUser } from '../services/userData';
import { Col, Row, Button } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import { FaSellsy } from 'react-icons/fa'
import '../components/Profile/Profile.css';

function Profile({ history }) {
    const [active, setActive] = useState(true);
    const [archived, setArchived] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [user, setUser] = useState([]);

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

    useEffect(() => {
        getUser()
            .then(res => setUser(res.user))
    }, [setUser])

    return (
        <>
            <div id="profile-head">
                <div className="container">
                    <Row className="profile-row">
                        <Col lg={2} md={5} sm={12}>
                            <img id="avatar" src="https://images.unsplash.com/photo-1562087926-662f8573327b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80" />
                        </Col>
                        <Col lg={5} md={3} sm={12}>
                            <p><BsFillPersonFill /> {user.name}</p>
                            <p><MdEmail /> {user.email}</p>
                            <p><MdPhoneAndroid /> {user.phoneNumber}</p>
                            <p><FaSellsy /> {user.createdSells} sells in total</p>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="container">
                <Row>
                    <Col lg={2} sm={12} id="aside">
                        <Button variant="dark" id="active-sells" onClick={handleActive}>Active Sells</Button>{' '}
                        <Button variant="dark" id="archived-sells" onClick={handleArchived}>Archived</Button>{' '}
                        <Button variant="dark" id="wishlist" onClick={handleWish}>Wishlist</Button>{' '}
                    </Col>
                    <Col lg={10} sm={12}>
                        {active && <ActiveSells />}
                        {archived && <ArchivedSells history={history} />}
                        {wishlist && <Wishlist />}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Profile;