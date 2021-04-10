const ChatRoom = require('../models/ChatRoom')

async function createChatRoom(buyer, seller) {
    let chatRoom = new ChatRoom({ buyer, seller})
    console.log(chatRoom)
    return await chatRoom.save();
}

module.exports = {
    createChatRoom
}