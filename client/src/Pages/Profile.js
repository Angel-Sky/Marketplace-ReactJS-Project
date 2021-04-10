import { useEffect, useState } from 'react';
import ProfileSection from '../components/Profile/ProfileSection'
import Wishlist from '../components/Profile/Wishlist/Wishlist'
import ActiveSells from '../components/Profile/Sells/ActiveSells';
import ArchivedSells from '../components/Profile/Sells/ArchivedSells'
import SellerProfile from '../components/Profile/SellerProfile'
import { getUserById } from '../services/userData';
import { Col, Row, Button } from 'react-bootstrap';

import '../components/Profile/Profile.css';

function Profile({ match, history }) {
    const [active, setActive] = useState(true);
    const [archived, setArchived] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [user, setUser] = useState([]);

    // const [showMsg, setShowMdg] = useState(false);
    // const handleClose = () => setShowMdg(false);
    // const handleShow = () => setShowMdg(true);

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
        window.scrollTo(0, 0);
        getUserById(match.params.id)
            .then(res => setUser(res.user))
            .catch(err => console.log(err))
    }, [match.params.id])
   
    return (
        <>
            {user.isMe ? (
                <>
                <ProfileSection params={user} />
                <div className="container">
                    <Row>
                        <Col lg={2} sm={12} id="aside">
                            <Button variant="dark" id="active-sells" onClick={handleActive}>Active Sells</Button>{' '}
                            <Button variant="dark" id="archived-sells" onClick={handleArchived}>Archived</Button>{' '}
                            <Button variant="dark" id="wishlist" onClick={handleWish}>Wishlist</Button>{' '}
                        </Col>
                        <Col lg={10} sm={12}>
                            {active && <ActiveSells params={user}/>}
                            {archived && <ArchivedSells history={history} />}
                            {wishlist && <Wishlist />}
                        </Col>
                    </Row>
                </div>
                </>
            ) : ( 
                <SellerProfile params={user} history={history}/>
            )}

        </>
    )
}

export default Profile;