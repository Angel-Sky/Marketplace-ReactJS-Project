import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserSells } from '../../../services/productService';

import './Sells.css';
import '../../ProductCard/DisabledProductCard/DisabledCard.css'
function ActiveSells({ history }) {
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

            {!loading ?
                (<>
                    <h1 className="heading">Your Active Sells</h1>
                    {products.filter(x => x.active === true).length > 0 ? (
                        <Row>
                            {products
                                .filter(x => x.active === true)
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