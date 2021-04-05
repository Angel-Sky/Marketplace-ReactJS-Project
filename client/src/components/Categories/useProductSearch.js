import { useEffect, useState } from 'react';
import { getAll } from '../../services/productData'
export default function useProductSearch(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setProducts([])
    }, [query, pageNumber])

    useEffect(() => {
        setLoading(true)

        getAll(pageNumber, query).then(res => {
            setProducts(prevBooks => {
                return [...prevBooks, ...res.products]
            })
            setHasMore(res.products.length > 0)
            setLoading(false)
        })
    }, [query, pageNumber])

    return { loading, products, hasMore }
}