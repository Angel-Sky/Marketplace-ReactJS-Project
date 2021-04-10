import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { io } from "socket.io-client";

function SubmitForm({ chatId }) {
    const socket = io();
    const [text, setText] = useState("");

    function handleMsgSubmit(e) {
        e.preventDefault();
        // console.log(text)
        socket.emit('chat message', text);
    }

    return (
        <div className="chat-selected-footer col-lg-12">
            <Form onSubmit={handleMsgSubmit}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}>
                        </Form.Control>
                        <InputGroup.Append>
                            <Button type="submit" variant="secondary">Sent</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default SubmitForm;