import { Card } from 'react-bootstrap';

function ProductCard({ params }) {
    return (
        <Card>
            <Card.Img variant="top" src={params.image} />
            <Card.Body>
                <Card.Title>{params.title}</Card.Title>
                <Card.Text>
                    {params.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;