const router = require('express').Router();
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController')
const isAuth = require('./middlewares/isAuth');

// router.use('/', mainController);
router.use('/auth', authController);
router.use('/products', productController);


module.exports = router;