import { Form, Button } from 'react-bootstrap';
import SimpleSider from '../../Siders/SimpleSider';
import '../auth.css';

function Login() {
    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign In</h1>
                <Form className="col-lg-6">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button className="col-lg-12 btnAuth" variant="dark" type="submit">Sign in</Button>
                </Form>
            </div>
        </>
    )
}

export default Login;