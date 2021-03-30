const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');

router.get('/', (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => res.status(500).json(err))
})

router.get('/:category', (req, res) => {
    console.log(req.user)
    let currentCategory = req.params.category;

    Product.find({ category: currentCategory })
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => res.status(500).json(err))
});

router.get('/specific/:id', (req, res) => {
    console.log(req.user)
    Product.findById(req.params.id)
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => console.log(err))
});

router.post('/create', async (req, res) => {
    let { title, price, description, city, category, image } = req.body;
    console.log(req.user)
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
            addedAt: uploadResponse.created_at,
            seller: req.user._id
        })

        await product.save()

        res.status(201).json({ movieId: product._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.patch('/edit/:id', isAuth, async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params._id }, req.body);
        res.status(200).json({ message: 'Updated!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }   
})

module.exports = router;