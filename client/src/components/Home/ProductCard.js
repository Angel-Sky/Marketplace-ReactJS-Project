import { Card } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProductCard({ params }) {
    return (
        <Card>
            <Link to={`/product/${params.id}/details`}>
                <Card.Img variant="top" src={params.image} />
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>{params.price}$</Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer>
                <small className="text-muted">
                    {params.addedAt} -  {params.city}
                    <Link to="" id="heartIcon"><BsHeart /></Link>
                </small>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;