import { CardDeck } from 'react-bootstrap';
import ProductCard from './ProductCard'

function TopProducts({ params }) {
    return (
        <div className="container">
            <CardDeck>
                {params.map(x => <ProductCard key={x._id} params={x} />)}
            </CardDeck>
        </div>
    )
}

export default TopProducts;