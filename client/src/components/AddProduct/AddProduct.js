import { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import SimpleSider from '../Siders/SimpleSider';
import style from './AddProduct.module.css';

class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log(e.target.city.value)
    };

    render() {
        return (
            <>
                <SimpleSider />
                <div className='container'>
                    <h1 className={style.heading}>Add a Product</h1>
                    <Form onSubmit={this.onSubmitHandler}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" name="title" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" step="0.01" placeholder="Price" name="price" required />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDescription.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" required />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" placeholder="Sofia" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." name="category" required>
                                    <option>Choose...</option>
                                    <option>Properties</option>
                                    <option>Auto</option>
                                    <option>Electronic</option>
                                    <option>Clothes</option>
                                    <option>Toys</option>
                                    <option>Home</option>
                                    <option>Garden</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridImage" >
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" required />
                            </Form.Group>
                        </Form.Row>

                        <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                    </Form>
                </div>
            </>
        )
    }
}

export default AddProduct;