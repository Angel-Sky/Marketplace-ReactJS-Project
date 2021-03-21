import { CardDeck } from 'react-bootstrap';
import ProductCard from './ProductCard'

function TopProducts() {
    return (
        <div className="container">
            <CardDeck>
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </CardDeck>
        </div>
    )
}

export default TopProducts;