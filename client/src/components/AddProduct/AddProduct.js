import { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import SimpleSider from '../Siders/SimpleSider';
import style from './AddProduct.module.css';
import { createProduct } from '../../services/productService';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", price: "", description: "", city: "", category: "", image: "" };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();

        this.setState({ [e.target.name]: e.target.value });

        if (e.target.files) {
            this.setState({ image: e.target.files[0] })
        }
    };

    onSubmitHandler(e) {
        e.preventDefault();
        let { title, price, description, city, category, image } = this.state;
        let obj = { title, price, description, city, category, addedAt: new Date() }

        this.getBase64(image)
            .then((data) => {
                obj['image'] = data;
                createProduct(obj)
                    .then(res => {
                        this.props.history.push('/')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

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
                                <Form.Control type="text" placeholder="Enter title" name="title" required onChange={this.onChangeHandler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" step="0.01" placeholder="Price" name="price" required onChange={this.onChangeHandler} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridDescription.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" required onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" placeholder="Sofia" required onChange={this.onChangeHandler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" defaultValue="Choose..." name="category" required onChange={this.onChangeHandler}>
                                    <option>Choose...</option>
                                    <option>properties</option>
                                    <option>auto</option>
                                    <option>electronics</option>
                                    <option>clothes</option>
                                    <option>toys</option>
                                    <option>home</option>
                                    <option>garden</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridImage" >
                                <Form.Label>Image</Form.Label>
                                <Form.Control name="image" type="file" required onChange={this.onChangeHandler} />
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