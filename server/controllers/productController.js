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
        let product = await (await Product.findById(req.params.id)).toJSON()
        let seller = await (await User.findById(product.seller)).toJSON()
        let user = await User.findById(req.user._id)
        
        res.status(200).json({
            ...product,
            name: seller.name,
            phone: seller.phoneNumber,
            email: seller.email,
            isSeller: Boolean(req.user._id == product.seller),
            isWished: user.wishedProducts.includes(req.params.id)
        });
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
        let user = await productService.findUserById(req.user._id);
        let product = await productService.findById(req.params.id);
        if (user._id.toString() !== product.seller.toString()) {
            throw { message: 'You have no permission to perform this action' };
        }

        await productService.edit(req.params.id, req.body);
        res.status(200).json({ message: 'Updated!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/sells/:id', async (req, res) => {
    try {
        let user = await (await User.findById(req.user._id).populate('createdSells')).toJSON();
        res.status(200).json({ sells: user.createdSells });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/enable/:id', async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params.id }, { active: true });
        res.status(200).json({ msg: "Activated" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/archive/:id', async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params.id }, { active: false });
        res.status(200).json({ msg: "Archived" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


router.get('/wish/:id', async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        
        if (!user.wishedProducts.includes(req.params.id)) {
            await User.updateOne({ _id: req.user._id }, { $push: { wishedProducts: req.params.id } })
            await Product.updateOne({ _id: req.params.id }, { $push: { likes: user }});

            res.status(200).json({ msg: "wished" });
        } else {
            await User.updateOne({ _id: req.user._id }, { $pull: { wishedProducts: req.params.id } })
            await Product.updateOne({ _id: req.params.id }, { $pull: { likes: req.user._id }});

            res.status(200).json({ msg: "unwished" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// router.get('/unwish/:id', async (req, res) => {
//     try {
//         let user = await User.findById(req.user._id);
        
//         if (user.wishedProducts.includes(req.params.id)) {
           
//         }
//         res.status(200).json({ msg: "wished" });
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });

module.exports = router;