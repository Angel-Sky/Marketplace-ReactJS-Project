import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
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
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setPage(1);
        getAll(1, currentCategory)
            .then(res => {
                setProduct(res.products)
                setPage(page => page + 1)
                setQuery("")
            });
    }, [currentCategory])

    useEffect(() => {
        setPage(1);
        getAll(1, currentCategory, query)
            .then(res => {
                setProduct(res.products)
                setPage(page => page + 1)
            });
    }, [query])

    const handleSearch = (e) => {
        e.preventDefault()
        setTimeout(() => {
            setQuery(e.target.value)
        }, 800);
    }

    return (
        <>
            <div id="sider">

                <input className="col-lg-6" type="text" placeholder="Search..." name="search" onChange={handleSearch}></input>
            </div>
            {/* <SearchSider /> */}
            <CategoriesNav />
            <div className="container">
                <InfiniteScroll
                    dataLength={products.length}
                    next={() => {
                        getAll(page, currentCategory)
                            .then(res => {
                                setProduct([...products, ...res.products]);
                                setPage(page + 1)
                            });
                    }}
                    hasMore={() => {
                        if (products.length > 0) {
                            return true
                        }
                        return false
                    }}
                    className="row">
                    {products
                        .filter(x => x.active == true)
                        .map(x =>
                            <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                <ProductCard params={x} />
                            </Col>
                        )}
                </InfiniteScroll>
            </div>
        </>
    )
}

export default Categories;