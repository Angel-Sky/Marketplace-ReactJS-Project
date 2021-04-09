// import {Link} from 'react-router-dom'

// function Aside({conversations, chatId}) {
//     const [selected, setSelected] = useState({ seller: { _id: "", avatar: "", name: "" }, buyer: { _id: "", avatar: "", name: "" }, conversation: [] });
//     const [isSelected, setIsSelected] = useState(false);

//     useEffect(() => {
//         if (isSelected) {
//             setSelected(conversations.find(x => x._id == chatId))
//         }
//     }, [isSelected, chatId])

//     return (
//         <aside className="col-lg-4 col-md-4">
//             <h3>Conversations</h3>
//             {conversations.map(x =>
//                 <div className="chat-connections" key={x._id}>
//                     <Link onClick={() => setIsSelected(true)} to={`/messages/${x._id}`}>
//                         <img src={x.seller.avatar} /> {x.seller.name}
//                     </Link>
//                 </div>)}
//         </aside>
//     )
// }

// export default Aside;