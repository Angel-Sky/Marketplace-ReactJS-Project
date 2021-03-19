// const Expense = require('../models/Expense');
// const User = require('../models/User');

// async function create(data, userId) {
//     let expense = new Expense({ ...data, creator: userId })
//     await expense.save();
   
//     return await User.updateOne({ _id: userId }, { $push: { expenses: expense } });
// }

// async function getAll(userId) {
//     return await Expense.find({ creator: userId }).lean();
// }

// async function getSpecific(id, userId) {
//     let expense = await Expense.findById(id).lean();
//     return expense;
// }

// async function update(id, data) {
//     return await Expense.updateOne({ _id: id }, data);
// }

// async function deleteExpense(id, userId) {
//     await Expense.deleteOne({ _id: id });
//     await User.updateOne({ _id: userId }, { $pull: { expenses: id } });
//     return;
// }

// module.exports = {
//     create,
//     getAll,
//     getSpecific,
//     update,
//     deleteExpense,
// }
