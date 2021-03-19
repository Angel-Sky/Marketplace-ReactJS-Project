const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config')

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: ['Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: ['Password is required'],
        minlength: [4, 'Password should be at least 4 characters long']
    },
});

userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})



module.exports = mongoose.model('User', userSchema);