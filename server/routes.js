const router = require('express').Router();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController')
const isAuth = require('./middlewares/isAuth');

router.use('/auth', authController);
router.use('/products', productController);


module.exports = router;