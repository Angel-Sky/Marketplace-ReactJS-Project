import { useEffect, useState } from 'react';
import SearchSider from '../../Siders/SearchSider'
import CategoriesNav from "./CategoriesNav";
import ProductCard from "../ProductCard/ProductCard";
import { Col } from 'react-bootstrap';
import { getAll } from '../../../services/productService';

import './Categories.css';
import '../ProductCard/ProductCard.css';

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
                    {products.map(x => 
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