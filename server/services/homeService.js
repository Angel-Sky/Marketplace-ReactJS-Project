// const User = require('../models/User');


// async function refill(userId, refillAmount) {
//     let user = await User.findById(userId);
//     let newAmount = user.amount + Number(refillAmount);
//     await User.updateOne({ _id: userId }, { $set: { amount: newAmount } });
        
//     return;
// }

// module.exports = {
//     refill
// }