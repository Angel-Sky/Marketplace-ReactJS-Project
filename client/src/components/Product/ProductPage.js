import { useEffect, useState } from 'react';

function ProductPage({ match }) {
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
        </>
    )
}

export default ProductPage;