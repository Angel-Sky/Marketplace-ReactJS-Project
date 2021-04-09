const ChatRoom = require('../models/ChatRoom')

async function createChatRoom(buyer, seller, message) {
    let chatRoom = new ChatRoom({ buyer, seller, conversation: {buyer, message}})
    console.log(chatRoom)
    return await chatRoom.save();
}

module.exports = {
    createChatRoom
}