// const router = require('express').Router();
// const expenseService = require('../services/expenseService');
// const homeService = require('../services/homeService')
// const isAuth = require('../middlewares/isAuth');
// const User = require('../models/User');

// router.get('/', async (req, res) => {
//     try {
//         if (req.user) {
//             let expenses = await expenseService.getAll(req.user._id);
//             res.render('home', { title: 'Expence Tracker', expenses });
//         } else {
//             res.render('home', { title: 'Expence Tracker' });
//         }
//     } catch (error) {
//         res.render('home', { title: 'Expence Tracker', error })
//     }
// });

// router.post('/refill', isAuth, async (req, res) => {
//     try {
//         if (req.body.refill <= 0) throw { message: 'The amount should be a positive number' }

//         await homeService.refill(req.user._id, req.body.refill);
//         res.redirect('/');
//     } catch (error) {
//         res.render('home', { error })
//     }
// })

// router.get('/profile', isAuth, async (req, res) => {
//     try {
//         let usr = await User.findById(req.user._id);
//         let expenses = await expenseService.getAll(req.user._id);
//         let totalAmount = 0;
//         expenses.forEach(e => {
//             totalAmount += e.total;
//         })
//         let availableAmount = usr.amount ? usr.amount.toFixed(2) : '0.00';
//         totalAmount = totalAmount.toFixed(2);
//         console.log(usr.expenses);
        
//         res.render('profile', { title: 'Profile', totalAmount, totalMerches: usr.expenses.length, availableAmount })
//     } catch (error) {
//         res.render('profile', { error });
//     }
// });



// module.exports = router;