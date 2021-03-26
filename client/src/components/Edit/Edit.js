import { useState, useEffect } from 'react';
import { Col, Form, Button, Spinner } from 'react-bootstrap';
import SimpleSider from '../Siders/SimpleSider';
import { getSpecific, editProduct } from '../../services/productService';

function Edit({match, history}) {
    // console.log(props)
    const [product, setProduct] = useState({});
    const productId = match.params.id;
    useEffect(() => {
        getSpecific(productId)
            .then(res => setProduct(res));
    }, [])

    const onChangeHandler = (e) => {
        e.preventDefault();
        setProduct({ [e.target.name]: e.target.value });
        if (e.target.files) {
            setProduct({ image: e.target.files[0] })
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let { title, price, description, city, category, image } = this.state;
        let obj = { title, price, description, city, category }
        setProduct({
            loading: true,
        })
        getBase64(image)
            .then((data) => {
                obj['image'] = data;
                editProduct(obj)
                    .then(res => {
                        history.push('/')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    console.log(product)
    console.log(setProduct)
    return (
        <>
            <SimpleSider />
            <div className='container'>
                <h1 className="heading">Edit {product.title}</h1>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" value={product.title} onChange={onChangeHandler} required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" value={product.price} onChange={onChangeHandler} required />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={product.description}  onChange={onChangeHandler} required />
                        {/* {product.description}
                            </Form.Control> */}
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" placeholder="Sofia" value={product.city} onChange={onChangeHandler} required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={product.category} name="category" onChange={onChangeHandler} required >
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
                            <Form.Control name="image" type="file" onChange={onChangeHandler} required />
                        </Form.Group>
                    </Form.Row>
                    {/* {this.state.loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                    } */}
                </Form>
            </div>
        </>
    )
}

export default Edit;