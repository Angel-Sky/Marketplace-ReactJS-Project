const Product = require('../models/Product');
const User = require('../models/User');

async function create(data, userId) {
    let product = new Product({ ...data, creator: userId })
    await product.save();
   
    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}

async function getAll(userId) {
    return await Product.find({ creator: userId }).lean();
}

async function getSpecific(id, userId) {
    let product = await Product.findById(id).lean();
    return product;
}

async function update(id, data) {
    return await Product.updateOne({ _id: id }, data);
}

async function deleteExpense(id, userId) {
    await Product.deleteOne({ _id: id });
    await User.updateOne({ _id: userId }, { $pull: { createdSells: id } });
    return;
}

module.exports = {
    create,
    getAll,
    getSpecific,
    update,
    deleteExpense,
}
