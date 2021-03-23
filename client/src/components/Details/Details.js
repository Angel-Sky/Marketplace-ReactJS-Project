import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import SimpleSider from '../Siders/SimpleSider';
import Breadcrumb from './Breadcrumb'
import ProductInfo from './ProductInfo/ProductInfo';
import Aside from './Aside/Aside';

import './ProductInfo/ProductInfo.css';
import './Aside/Aside.css';

function Details({ match }) {
    let productId = match.params.id;
    let [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`https://books-f6954.firebaseio.com/products/${productId}.json`)
            .then(res => res.json())
            .then(res => setProduct(res));
    }, [match])

    console.log(product);

    return (
        <>
            <SimpleSider />
            <div className="container">
                <Breadcrumb params={product} />
                <Row>
                    <Col lg={8} id="detailsProduct">
                        <ProductInfo params={product} />
                    </Col>
                    <Col lg={4}>
                        <Aside params={product} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Details;