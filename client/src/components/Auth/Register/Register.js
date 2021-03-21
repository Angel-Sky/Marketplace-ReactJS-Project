import { Form, Button } from 'react-bootstrap'
import '../auth.css';

function Register() {
    return (
        <div className="container auth-form">
            <h1 className="auth-heading">Sign Up</h1>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Reepeat Password</Form.Label>
                    <Form.Control type="repeatPassword" placeholder="Repeat password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default Register;