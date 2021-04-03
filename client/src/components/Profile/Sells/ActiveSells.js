import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserActiveSells } from '../../../services/userData';

import './Sells.css';
function ActiveSells({ params, history }) {
    const [products, setProduct] = useState([])
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        if (params._id) {
            getUserActiveSells(params._id)
                .then(res => {
                    setProduct(res.sells);
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
    }, [params._id])

    return (
        <>
            {!loading ?
                (<>
                    <h1 className="heading">Active Sells</h1>
                    {products ? (
                        <Row>
                            {products
                                .map(x =>
                                    <Col xs={12} md={6} lg={4} key={x._id.toString()}>
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
        </>
    )
}

export default ActiveSells;