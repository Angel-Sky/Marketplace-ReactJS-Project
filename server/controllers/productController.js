const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');
const User = require('../models/User');

const productService = require('../services/productService');

router.get('/', async (req, res) => {
    try {
        let products = await productService.getAll()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:category', async (req, res) => {
    try {
        let products = await productService.findByCategory(req.params.category);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/specific/:id', async (req, res) => {
    try {
        let product = await productService.findById(req.params.id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/create', isAuth, async (req, res) => {
    let { title, price, description, city, category, image } = req.body;
    try {
        if (!image.includes('image')) throw { message: 'The uploaded file should be an image' };

        let compressedImg = await productService.uploadImage(image);
        let product = new Product({
            title, price, description, city, category,
            image: compressedImg,
            addedAt: new Date(),
            seller: req.user._id
        })

        await product.save()
        await productService.userCollectionUpdate(req.user._id, product);

        res.status(201).json({ productId: product._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

router.patch('/edit/:id', isAuth, async (req, res) => {
    try {
        await productService.edit(req.params.id, req.body);
        res.status(200).json({ message: 'Updated!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/sells/:id', async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('createdSells');
        res.status(200).json({ sells: user.createdSells });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/enable/:id', async (req, res) => {
    try {
        let product = await Product.updateOne({ _id: req.params.id }, {active: true});
        res.status(200).json({ msg: "Activated" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;