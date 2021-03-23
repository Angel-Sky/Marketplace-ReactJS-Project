import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Aside({ params }) {
    return (
        <aside>
            <div id="priceLabel">
                <h4>Product Price </h4>
                <h1>{params.price} €</h1>
            </div>
            <Button variant="dark">Contact Seller</Button>{' '}
        </aside>
    )
}

export default Aside;