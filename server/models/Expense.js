// const mongoose = require('mongoose');

// const expenseSchema = new mongoose.Schema({
//     id: mongoose.Types.ObjectId,
//     merchant : {
//         type: String,
//         required: ['Merchant is required'],
//         minlength: [4, 'Merchant should be at least 4 characters long'],
//     },
//     total: {
//         type: Number,
//         required: true
//     },
//     category: {
//         type: String,
//         required: ['Category is required']
//     },
//     description: {
//         type: String,
//         required: ['Description is required'],
//         minlength: [3, 'Description should be at least 3 characters long'],
//         maxlength: [30, 'Description should be max 30 characters long']
//     },
//     report: {
//         type: Boolean,
//         default: false
//     },
//     creator: {
//         type: mongoose.Types.ObjectId,
//         ref: 'User'
//     }
// });


// module.exports = mongoose.model('Expense', expenseSchema);