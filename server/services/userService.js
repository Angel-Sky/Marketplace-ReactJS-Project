const User = require('../models/User');


async function edit(userId, userData) {
    return await User.updateOne({ _id: userId }, { $set: { ...userData } });
}

module.exports = {
    edit,
    // userCollectionUpdate,
    // findUserById
}