const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: ['Title is required'],
        minlength: [3, 'Title should be at least 3 characters long'],
        maxLenght: [50, "Title can't be more than 50 cahracters long"]
    },
    category: {
        type: String,
        required: ['Category is required'],
        validate: {
            validator: function (v) {
                return (v != 'Choose...');
            },
            message: 'Pleese choose a category'
        }
    },
    description: {
        type: String,
        required: ['Description is required'],
        minlength: [10, 'Description should be at least 10 characters long'],
        maxlength: [500, 'Description should be max 500 characters long']
    },
    price: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: ['City is required']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^https?:\/\//.test(v)
            },
            message: (props) => {
                return `The Image URL should start with http:// or https://`
            }
        }
    },
    addedAt: {
        type: Date,
        required: true,
    },
    // seller: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User'
    // },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    active: {
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('Product', productSchema);