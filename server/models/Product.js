const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: ['Title is required'],
        minlength: [4, 'Title should be at least 4 characters long'],
    },
    category: {
        type: String,
        required: ['Category is required']
    },
    description: {
        type: String,
        required: ['Description is required'],
        minlength: [3, 'Description should be at least 3 characters long'],
        maxlength: [30, 'Description should be max 500 characters long']
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});


module.exports = mongoose.model('Product', productSchema);