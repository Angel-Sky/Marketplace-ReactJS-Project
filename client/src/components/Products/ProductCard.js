import { Card, Col } from 'react-bootstrap';

function ProductCard({ params }) {
    return (
        <Card>
            <Card.Img variant="top" src={params.image} />
            <Card.Body>
                <Card.Title>{params.title}</Card.Title>
                {/* <Card.Text></Card.Text> */}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">{params.addedAt} -  {params.city}</small>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard;