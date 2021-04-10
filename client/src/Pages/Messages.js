import { useState, useEffect } from 'react';
import { getUserConversations, sendMessage } from '../services/messagesData';
import { Container, Row, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../components/Messages/Aside.css'
import '../components/Messages/Article.css'
function Messages({ match }) {
    let chatId = match.params.id;
    const [conversations, setConversations] = useState([])
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState({
        chats: {
            _id: 0,
            seller: {
                _id: "",
                avatar: "",
                name: ""
            },
            buyer: {
                _id: "",
                avatar: "",
                name: ""
            },
            conversation: []
        },
        isBuyer: null,
        myId: 0
    });
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);
    const [alertShow, setAlertShow] = useState(false);

    useEffect(() => {
        getUserConversations()
            .then(res => {
                setConversations(res);
            })
            .catch(err => console.log(err))
        if (isSelected) {
            setSelected(conversations.find(x => x.chats._id === chatId))
        }
    }, [isSelected, chatId, setSelected])

    function handleMsgSubmit(e) {
        e.preventDefault();
        sendMessage(chatId, message)
            .then((res) => {
                setAlert("Message sent!");
                setAlertShow(true);
                setMessage("");
                setSelected(selected, selected.chats.conversation.push({ message, senderId: res.sender }))
                setTimeout(() => {
                    setAlert(null);
                    setAlertShow(false);
                }, 1000);
            })
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <Row>
                <aside className="col-lg-4 col-md-4">
                    <h3>Conversations</h3>
                    {conversations.length >= 1 ?
                        <>
                            {conversations.map(x =>
                                <div className="chat-connections" key={x.chats._id}>
                                    <Link onClick={() => setIsSelected(true)} to={`/messages/${x.chats._id}`}>
                                        {x.isBuyer ?
                                            <><img src={x.chats.seller.avatar} alt="user-avatar" /> <span>{x.chats.seller.name}</span></>
                                            :
                                            <><img src={x.chats.buyer.avatar} alt="user-avatar" /> <span>{x.chats.buyer.name}</span></>
                                        }
                                    </Link>
                                </div>)
                            }
                        </>
                        :
                        <h5>No messages yet</h5>
                    }
                </aside>
                <article className="col-lg-8 col-md-8">
                    {isSelected &&
                        <>
                            <div className="chat-selected-header col-lg-12">
                                {selected.isBuyer ?
                                    <Link to={`/profile/${selected.chats.seller._id}`}>
                                        <img src={selected.chats.seller.avatar} alt="user-avatar" />
                                        <span>{selected.chats.seller.name}</span>
                                    </Link>
                                    :
                                    <Link to={`/profile/${selected.chats.buyer._id}`}>
                                        <img src={selected.chats.buyer.avatar} alt="user-avatar" />
                                        <span>{selected.chats.buyer.name}</span>
                                    </Link>
                                }
                            </div>
                            {alertShow &&
                                <Alert variant="success" onClose={() => setAlertShow(false)} dismissible>
                                    <p>
                                        {alert}
                                    </p>
                                </Alert>
                            }
                            <div className="chat-selected-body col-lg-12">
                                {selected.chats.conversation.map(x =>
                                    <div className={selected.myId === x.senderId ? 'me' : "not-me"} key={x._id}>
                                        <span className="message">{x.message}</span>
                                    </div>
                                )}
                            </div>
                            <div className="chat-selected-footer col-lg-12">
                                <Form onSubmit={handleMsgSubmit}>
                                    <Form.Group>
                                        <InputGroup>
                                            <Form.Control
                                                as="textarea"
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}>
                                            </Form.Control>
                                            <InputGroup.Append>
                                                <Button type="submit" variant="secondary">Sent</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </div>
                        </>
                    }
                </article>
            </Row>
        </Container>
    )
}

export default Messages;