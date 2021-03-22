import { useEffect, useState } from 'react';
import CategoriesNav from "./CategoriesNav";
import TopProducts from '../Products/TopProducts';
import ProductCard from "../Products/ProductCard";

function Categories({ match }) {
    let currentCategory = match.params.category;
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`https://books-f6954.firebaseio.com/products.json`)
            .then(res => res.json())
            .then(res => setProduct(res));
    }, [match])
    let products = Object.values(product).filter(x => x.category == currentCategory);
    
    return (
        <>
            <CategoriesNav />
            {/* {products.map(x => <ProductCard key={x._id} params={x} />)} */}
            <TopProducts params={products}/>

        </>
    )
}

export default Categories;