import { Card } from 'react-bootstrap';
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function ProductCard({ params }) {
    return (
        <Card>
            <Link to={`/categories/${params.category}/${params._id}/details`}>
                <Card.Img variant="top" src={params.image} />
                <Card.Body>
                    <Card.Title>{params.title}</Card.Title>
                    <Card.Text>{(params.price).toFixed(2)}€</Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer>
                <small className="text-muted">
                    {params.addedAt} -  <strong>{params.city}</strong>
                    {/* <Link to="" id="heartIcon"><BsHeart /></Link> */}
                </small>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;