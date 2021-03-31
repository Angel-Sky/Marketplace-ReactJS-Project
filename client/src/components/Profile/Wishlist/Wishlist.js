import { useEffect, useState } from 'react';
import SimpleSider from '../../Siders/SimpleSider'
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserWishlist } from '../../../services/productService';

import './Wishlist.css';
import '../../ProductCard/DisabledProductCard/DisabledCard.css'
function Wishlist() {
    const [products, setProduct] = useState([])
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserWishlist()
            .then(res => {
                setProduct(res.wishlist);
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
                        <h1 className="heading">Wishlist</h1>
                        <Row>
                            {products
                                .map(x =>
                                    <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                        <ProductCard params={x}/>
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

export default Wishlist;