import { useState, useEffect } from 'react';
import { getUserConversations } from '../services/messagesData';
import { Container, Row, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Aside from '../components/Messages/Aside'
import '../components/Messages/Aside.css'
import '../components/Messages/Article.css'
function Messages({ match }) {
    const [conversations, setConversations] = useState([])
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState({ seller: { _id: "", avatar: "", name: "" }, buyer: { _id: "", avatar: "", name: "" }, conversation: [] });
    const [text, setText] = useState("");
    const [isBuyer, setIsBuyer] = useState(false);

    useEffect(() => {
        getUserConversations()
            .then(res => {
                setConversations(res.chats);
                res.isBuyer == true ? setIsBuyer(true) : setIsBuyer(false);
            })
        if (isSelected) {
            setSelected(conversations.find(x => x._id == match.params.id))
        }
    }, [isSelected, match.params.id])

    console.log(selected)
    return (
        <Container>
            <Row>
                {isBuyer ? <>
                    <aside className="col-lg-4 col-md-4">
                        <h3>Conversations</h3>
                        {conversations.map(x =>
                            <div className="chat-connections" key={x._id}>
                                <Link onClick={() => setIsSelected(true)} to={`/messages/${x._id}`}>
                                    <img src={x.seller.avatar} /> {x.seller.name}
                                </Link>
                            </div>)
                        }
                    </aside>
                    <article className="col-lg-8 col-md-8">
                        {isSelected &&
                            <>
                                <div className="chat-selected-header col-lg-12">
                                    <img src={selected.seller.avatar} />
                                    {selected.seller.name}
                                </div>
                                <div className="chat-selected-body col-lg-12">
                                    {selected.conversation.map(x =>
                                        <div className={selected.buyer == selected.seller._id ? 'not-me' : "me"} key={x._id}>
                                            <span className="message">{x.message}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="chat-selected-footer col-lg-12">
                                    <Form>
                                        <Form.Group>
                                            <InputGroup>
                                                <Form.Control
                                                    as="textarea"
                                                    required
                                                    value={text}
                                                    onChange={(e) => setText(e.target.value)}>

                                                </Form.Control>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </>
                        }
                    </article>
                </>
                    : <>
                        <aside className="col-lg-4 col-md-4">
                            <h3>Conversations</h3>
                            {conversations.map(x =>
                                <div className="chat-connections" key={x._id}>
                                    <Link onClick={() => setIsSelected(true)} to={`/messages/${x._id}`}>
                                        <img src={x.buyer.avatar} /> {x.buyer.name}
                                    </Link>
                                </div>)}
                        </aside>

                        <article className="col-lg-8 col-md-8">
                            {isSelected &&
                                <>
                                    <div className="chat-selected-header col-lg-12">
                                        <img src={selected.buyer.avatar} />
                                        {selected.buyer.name}
                                    </div>
                                    <div className="chat-selected-body col-lg-12">
                                        {selected.conversation.map(x =>
                                            <div className={selected.seller !== selected.buyer._id ? 'not-me' : "me"} key={x._id}>
                                                <span className="message">{x.message}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="chat-selected-footer col-lg-12">
                                        <Form>
                                            <Form.Group>
                                                <InputGroup>
                                                    <Form.Control
                                                        as="textarea"
                                                        required
                                                        value={text}
                                                        onChange={(e) => setText(e.target.value)}>

                                                    </Form.Control>
                                                </InputGroup>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                </>
                            }
                        </article>
                    </>
                }
            </Row>
        </Container>
    )
}

export default Messages;