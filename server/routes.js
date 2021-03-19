const router = require('express').Router();
const mainController = require('./controllers/mainController');
const authController = require('./controllers/authController');
const expenseController = require('./controllers/expenseController')
const isAuth = require('./middlewares/isAuth');

// router.use('/', mainController);
router.use('/auth', authController);
// router.use('/expense', isAuth, expenseController);


module.exports = router;