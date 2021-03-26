const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');

const productService = require('../services/productService');
const Product = require('../models/Product');

// router.get('/:category', (req, res) => {
//     let currentCategory = req.params.category;

//     if (currentCategory !== 'undefined' && currentCategory !== 'all') {
//         Product.find({ currentCategory })
//             .then(products => {
//                 res.status(200).json(products);
//             })
//             .catch(err => res.status(500).json(err))
//      } else {
//         Product.find()
//             .then(products => {
//                 res.status(200).json(products);
//             })
//             .catch(err => res.status(500).json(err))
//     }
// });

router.get('/:category/:id', (req, res) => {
    let currentCategory = req.params.category;
    let id = req.params.id;
    if (id !== 'undefined') {
        Product.findById(req.params.id)
            .then(product => {
                res.status(200).json(product);
            })
            .catch(err => console.log(err))
        return;
    }

    if (currentCategory !== 'undefined' && currentCategory !== 'all') {
        Product.find({ category: currentCategory })
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => res.status(500).json(err))
        return;
    } else {
        Product.find()
            .then(products => {
                res.status(200).json(products);
            })
            .catch(err => res.status(500).json(err))
    }

});

router.post('/', async (req, res) => {
    let { title, price, description, city, category, image, addedAt } = req.body;
    console.log(req.body)
    try {
        const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: 'pza5zln6',
        });

        let product = new Product({
            title, price, description, city, category,
            image: uploadResponse.url,
            addedAt: uploadResponse.created_at
        })
       
        await product.save()

        res.status(201).json({ movieId: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }

    // if (total <= 0) throw { message: 'Total should be a positive number' };

    // let productData = {
    //     merchant, total, vault, category, description, report: Boolean(report)
    // }
    // try {
    //     await productService.create(productData, req.user._id);
    //     res.redirect('/');
    // } catch (error) {
    //     res.render('create', { error });
    // }
});

// router.get('/:id/report', async (req, res) => {
//     let product = await productService.getSpecific(req.params.id, req.user._id);
//     res.render('report', { title: 'Report', product })
// });

// router.get('/:id/stop', async (req, res) => {
//     try {
//         await productService.deleteProduct(req.params.id, req.user._id);
//         res.redirect(`/`);
//     } catch (error) {
//         res.render('report', { error })
//     }
// });



module.exports = router;