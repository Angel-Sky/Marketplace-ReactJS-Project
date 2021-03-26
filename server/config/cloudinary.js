require('dotenv').config();
const config = require('./config')
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };