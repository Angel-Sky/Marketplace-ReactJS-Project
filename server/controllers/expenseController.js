// const { Router } = require('express');
// const router = Router();
// const expenseService = require('../services/expenseService');

// router.get('/create', (req, res) => {
//     res.render('create', { title: 'Create' });
// });

// router.post('/create', async (req, res) => {
//     let { merchant, total, vault, category, description, report } = req.body;
//     if (total <= 0) throw { message: 'Total should be a positive number' };

//     let expenseData = {
//         merchant, total, vault, category, description, report: Boolean(report)
//     }
//     try {
//         await expenseService.create(expenseData, req.user._id);
//         res.redirect('/');
//     } catch (error) {
//         res.render('create', { error });
//     }
// });

// router.get('/:id/report', async (req, res) => {
//     let expense = await expenseService.getSpecific(req.params.id, req.user._id);
//     res.render('report', { title: 'Report', expense })
// });

// router.get('/:id/stop', async (req, res) => {
//     try {
//         await expenseService.deleteExpense(req.params.id, req.user._id);
//         res.redirect(`/`);
//     } catch (error) {
//         res.render('report', { error })
//     }
// });



// module.exports = router;