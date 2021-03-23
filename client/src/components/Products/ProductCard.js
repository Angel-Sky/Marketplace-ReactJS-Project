import { Card } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProductCard({ params }) {
    return (
        <Card>
            <Card.Img variant="top" src={params.image} />
            <Card.Body>
                <Link to={`/product/${params.id}/details`}>
                    <Card.Title>{params.title}</Card.Title>
                </Link>
                {/* <Card.Text></Card.Text> */}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    {params.addedAt} -  {params.city} 
                    <Link to=""><BsHeart /></Link>
                </small>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;