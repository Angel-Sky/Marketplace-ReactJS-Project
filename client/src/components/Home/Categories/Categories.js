import { useEffect, useState } from 'react';
import SearchSider from '../../Siders/SearchSider'
import CategoriesNav from "./CategoriesNav";
import ProductCard from "../ProductCard/ProductCard";
import { Col } from 'react-bootstrap';

import './Categories.css';
import '../ProductCard/ProductCard.css';

function Categories({ match }) {
    let currentCategory = match.params.category;
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`https://books-f6954.firebaseio.com/products.json`)
            .then(res => res.json())
            .then(res => setProduct(res));
    }, [match])

    let products;
    (currentCategory && currentCategory !== 'all') ?
        products = Object.values(product).filter(x => x.category === currentCategory) :
        products = Object.values(product);
    
    return (
        <>
            <SearchSider />
            <CategoriesNav />
            <div className="container">
                <div className="row">
                    {products.map(x => <Col xs={12} md={6} lg={3}><ProductCard key={x.id} params={x} /> </Col>)}
                </div>
            </div>
        </>
    )
}

export default Categories;