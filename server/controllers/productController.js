const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');

const productService = require('../services/productService');
const Product = require('../models/Product');

// router.get('/:category/:id', (req, res) => {
//     let currentCategory = req.params.category;
//     let id = req.params.id;
//     if (id !== 'undefined') {
//         Product.findById(req.params.id)
//             .then(product => {
//                 res.status(200).json(product);
//             })
//             .catch(err => console.log(err))
//         return;
//     }

//     if (currentCategory !== 'undefined' && currentCategory !== 'all') {
//         Product.find({ category: currentCategory })
//             .then(products => {
//                 res.status(200).json(products);
//             })
//             .catch(err => res.status(500).json(err))
//         return;
//     } else {
//         Product.find()
//             .then(products => {
//                 res.status(200).json(products);
//             })
//             .catch(err => res.status(500).json(err))
//     }

// });

router.get('/', (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => res.status(500).json(err))
})

router.get('/:category', (req, res) => {
    let currentCategory = req.params.category;

    Product.find({ category: currentCategory })
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => res.status(500).json(err))
});

router.get('/specific/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => console.log(err))
});

router.post('/', async (req, res) => {
    let { title, price, description, city, category, image } = req.body;
    console.log(req.body)
    try {
        if (!image.includes('image')) throw { message: 'The uploaded file should be an image' };
        const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: 'pza5zln6',
        }, {quality: "auto"});
        let imageUrl = uploadResponse.url;
        let index = (imageUrl.indexOf('upload/')) + 6;
        let product = new Product({
            title, price, description, city, category,
            image: imageUrl.substring(0, index) + "/c_fit,q_auto,f_auto,w_800" + imageUrl.substring(index),
            addedAt: uploadResponse.created_at
        })

        await product.save()

        res.status(201).json({ movieId: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;