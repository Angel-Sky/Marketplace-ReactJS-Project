import { useEffect, useState } from 'react';
import SimpleSider from '../../Siders/SimpleSider'
import ProductCard from '../../ProductCard/ProductCard';
import DisabledCard from '../../ProductCard/DisabledProductCard/DisabledCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserSells } from '../../../services/productService';
import { BsFillPersonFill, BsFillGridFill, BsFillHeartFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'
import { MdEmail, MdPhoneAndroid } from 'react-icons/md'
import {FaSellsy} from 'react-icons/fa'
import './Profile.css';
// import '../../ProductCard/DisabledProductCard/DisabledCard.css'

function Profile({ history }) {
    const [products, setProducts] = useState([])
    const [user, setUser] = useState(null);

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserSells()
            .then(res => {
                setProducts(res.sells);
                setUser(res.user)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [setProducts, setLoading])
    console.log(user)
    return (
        <>
            {/* <SimpleSider /> */}
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
                        <p><FaSellsy/> 12 sells in total</p>
                    </Col>
                </Row>
                </div>
            </div>
            <div className="container">
                {!loading ?
                    (<>
                        <h1 className="heading">Your Active Sells</h1>
                        {products.filter(x => x.active === true).length > 0 ? (
                            <Row>
                                {products
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

                        <h1 className="heading">Archive</h1>
                        {products.filter(x => x.active === false).length > 0 ? (
                            <Row>
                                {products
                                    .filter(x => x.active === false)
                                    .map(x =>
                                        <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                            <DisabledCard params={x} history={history} />
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
            </div>
        </>
    )
}

export default Profile;