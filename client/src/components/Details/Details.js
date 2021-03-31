import { useEffect, useState, useContext } from 'react';
import { Context } from '../../ContextStore';

import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../Siders/SimpleSider';
import Breadcrumb from './Breadcrumb'
import ProductInfo from './ProductInfo/ProductInfo';
import Aside from './Aside/Aside';
import { getSpecific } from '../../services/productService'

import './ProductInfo/ProductInfo.css';
import './Aside/Aside.css';

function Details({ match, history }) {
    let productId = match.params.id;
    // let category = match.params.category;
    let [product, setProduct] = useState([])
    let { userData, setUserData } = useContext(Context)
    let [loading, setLoading] = useState(true);
    let [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        getSpecific(productId)
            .then(res => setProduct(res), setLoading(false))
            .catch(err => console.log(err))
    }, [productId, setProduct, setLoading])
    console.log(product._doc)
    return (
        <>
            <SimpleSider />
            <div className="container">
                {!loading ? (
                    <>
                    <Breadcrumb params={product} />
                    <Row>
                        <Col lg={8} id="detailsProduct">
                            <ProductInfo params={product} />
                        </Col>
                        <Col lg={4}>
                            <Aside params={product} history={history} />
                        </Col>
                    </Row></>) : (<Spinner animation="border" />)}
            </div>
        </>
    )
}

export default Details;