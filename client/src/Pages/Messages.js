import { useState, useEffect } from 'react';
import { getUserConversations } from '../services/messagesData';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import '../components/Messages/Aside.css'
import '../components/Messages/Article.css'
function Messages({ match }) {
    const [conversations, setConversations] = useState([])
    const [isSelected, setIsSelected] = useState(false);
    const [selected, setSelected] = useState({ seller: { avatar: "", name: "" } });
    useEffect(() => {
        getUserConversations()
            .then(res => {
                setConversations(res);
            })
        if (isSelected) {
            setSelected(conversations.find(x => x._id == match.params.id))
        }
    }, [isSelected, match.params.id])
    // console.log("match params: ", match.params.id)
    // console.log('conv: ', conversations)
    // console.log('finded: ', conversations.find(x => x._id == match.params.id))
    console.log(selected)
    return (
        <Container>
            <Row>
                <aside className="col-lg-4 col-md-4">
                    <h3>Conversations</h3>
                    {conversations.map(x =>
                        <div className="chat-connections" key={x._id}>
                            <Link onClick={() => setIsSelected(true)} to={`/messages/${x._id}`}>
                                <img src={x.seller.avatar} /> {x.seller.name}
                            </Link>
                        </div>)}
                </aside>
                <article className="col-lg-8 col-md-8">
                    {isSelected &&
                        <div className="chat-selected-header">
                            <img src={selected.seller.avatar} />
                            {selected.seller.name}
                        </div>}
                        <div className="chat-selected-body">
                            {selected.conversation.map(x => 
                               <div className={selected.buyer == selected.seller._id ? 'not-me' : "me"} key={x._id}>
                                    <span className="message">{x.message}</span>
                                </div>
                            )}
                        </div>
                </article>
            </Row>
        </Container>
    )
}

export default Messages;