import { useEffect, useState } from 'react';
import SearchSider from '../components/Siders/SearchSider'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col } from 'react-bootstrap';
import { getAll } from '../services/productData';

import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';

function Categories({ match }) {
    let currentCategory = match.params.category;
    const [products, setProduct] = useState([])

    useEffect(() => {
        getAll(currentCategory)
            .then(res => setProduct(res));
    }, [currentCategory])

    return (
        <>
            <SearchSider />
            <CategoriesNav />
            <div className="container">
                <div className="row">
                    {products
                        .filter(x => x.active == true)
                        .map(x =>
                            <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                <ProductCard params={x} />
                            </Col>
                        )}
                </div>
            </div>
        </>
    )
}

export default Categories;