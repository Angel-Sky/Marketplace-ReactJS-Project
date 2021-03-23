import { Form, Button } from 'react-bootstrap'
import SimpleSider from '../../Siders/SimpleSider';
import '../auth.css';

function Register() {
    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign Up</h1>
                <Form className="col-lg-6">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Reepeat Password</Form.Label>
                        <Form.Control type="repeatPassword" placeholder="Repeat password" required />
                    </Form.Group>
                    <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                </Form>
            </div>
        </>
    )
}

export default Register;