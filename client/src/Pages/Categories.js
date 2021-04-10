import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown } from 'react-bootstrap';
import { getAll } from '../services/productData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';

function Categories({ match }) {
    let currentCategory = match.params.category;
    const [products, setProduct] = useState([])
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('oldest');

    useEffect(() => {
        setPage(1);
        setLoading(true);
        setQuery("")
        getAll(1, currentCategory)
            .then(res => {
                setProduct(res.products);
                setLoading(false);
                setPage(page => page + 1);
                setQuery("");
            })
            .catch(err => console.log(err));
    }, [currentCategory, setProduct])

    useEffect(() => {
        setPage(1);
        setLoading(true);
        getAll(2, currentCategory, query)
            .then(res => {
                if (query === "") {
                    setProduct(products => [...products, ...res.products]);
                } else {
                    setProduct(res.products)
                }
                setLoading(false);
                setPage(page => page + 1);
            })
            .catch(err => console.log(err));
    }, [query, currentCategory])

    const handleSearch = (e) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

      return (
        <>
            <div id="sider">
                <input className="col-lg-6" type="text" placeholder="Search..." name="search" value={query} onChange={handleSearch} />
            </div>
            <CategoriesNav />
            <div className="container">
                <Dropdown id="dropdown-sort">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Sort <BiSort />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSort('oldest') }}>Oldest <BiDownArrowAlt /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('newest') }}>Newest <BiUpArrowAlt /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('lowerPrice') }}>Price <BiSortDown /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('biggerPrice') }}>Price <BiSortUp /> </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {!loading ?
                    <InfiniteScroll
                        dataLength={products.length}
                        next={() => {
                            if (query === "") {
                                getAll(page, currentCategory)
                                    .then(res => {
                                        setProduct([...products, ...res.products]);
                                        setPage(page + 1)
                                    })
                            }
                        }}
                        hasMore={() => {
                            if (products.length > 0) {
                                return true
                            }
                            return false
                        }}
                        className="row">
                        {products
                            .sort((a, b) => {
                                if (sort === "oldest") {
                                    return a.addedAt.localeCompare(b.addedAt)
                                }
                                if (sort === "newest") {
                                    return b.addedAt.localeCompare(a.addedAt)
                                }
                                if (sort === "lowerPrice") {
                                    return b.price - a.price
                                }
                                if (sort === "biggerPrice") {
                                    return a.price - b.price
                                }
                            })
                            .map(x =>
                                <Col xs={12} md={6} lg={3} key={x._id.toString()}>
                                    <ProductCard params={x} />
                                </Col>
                            )}
                    </InfiniteScroll>
                    : <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                }
            </div>
        </>
    )
}

export default Categories;