const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function registerUser(userData) {
    let { name, lastName, gender, phoneNumber, email, password, repeatPassword } = userData;
    
    if (password !== repeatPassword) throw {message: "Passwords should match"}
    let checkUser = await User.findOne({ email });
    if (checkUser) throw { message: 'These email is already taken.' };

    let user = new User(userData);
    return await user.save();
}

async function loginUser({ email, password }) {
    let user = await User.findOne({ email });
    if (!user) throw { message: 'Invalid email or password' };

    let hasValidPass = await bcrypt.compare(password, user.password);
    if (!hasValidPass) throw { message: "Invalid email or password" }

    let token = jwt.sign({ _id: user._id, email: user.email, phoneNumber: user.phoneNumber }, SECRET);
    return token;
}

module.exports = {
    registerUser,
    loginUser
}