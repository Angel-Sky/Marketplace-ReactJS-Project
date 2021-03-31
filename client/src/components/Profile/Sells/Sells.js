import { useEffect, useState } from 'react';
import SimpleSider from '../../Siders/SimpleSider'
import ProductCard from '../../ProductCard/ProductCard';
import DisabledCard from '../../ProductCard/DisabledProductCard/DisabledCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserSells } from '../../../services/productService';

import './Sells.css';
import '../../ProductCard/DisabledProductCard/DisabledCard.css'
function Sells() {
    const [products, setProduct] = useState([])
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserSells()
            .then(res => {
                setProduct(res.sells);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [setProduct, setLoading])

    return (
        <>
            <SimpleSider />
            <div className="container">
                {!loading ? 
                (<>
                <h1 className="heading">Your Active Sells</h1>
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
                <h1 className="heading">Archive</h1>
                <Row>
                    {products
                        .filter(x => x.active === false)
                        .map(x =>
                            <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                <DisabledCard params={x} />
                            </Col>
                        )
                    }
                </Row>
                </>) :
                <Spinner animation="border" />}
            </div>
        </>
    )
}

export default Sells;