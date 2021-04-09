const router = require('express').Router();
const ChatRoom = require('../models/ChatRoom')
const User = require('../models/User');
const messageService = require('../services/messageService')

router.post('/createChatRoom', async (req, res) => {
    const { message, receiver } = req.body;
    try {
        let chatRoom = await messageService.createChatRoom(req.user._id, receiver, message)
        res.status(200).json({ messageId: chatRoom._id })
        await User.updateOne({ _id: req.user._id }, { $push: { chatRooms: chatRoom._id } });
        await User.updateOne({ _id: receiver }, { $push: { chatRooms: chatRoom._id } });
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;