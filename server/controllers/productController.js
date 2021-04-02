const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

const productService = require('../services/productService');

router.get('/', async (req, res) => {
    try {
        let products = await productService.getAll()
        products = products.map(x => ({ ...x, addedAt: moment(x.addedAt).format('d MMM YYYY (dddd) HH:mm') }))
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
        product.addedAt = moment(product.addedAt).format('d MMM YYYY (dddd) HH:mm')
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
        let errors = [];
        if (title.length < 3 || title.length > 50) errors.push('Title should be at least 3 characters long and max 50 characters long; ');
        if (isNaN(Number(price))) errors.push('Price should be a number; ');
        if (description.length < 10 || description.length > 1000) errors.push('Description should be at least 10 characters long and max 1000 characters long; ');
        if (/^[A-Za-z]+$/.test(city) == false) errors.push('City should contains only english letters; ')
        if (!image.includes('image')) errors.push('The uploaded file should be an image; ');
        if (!category) errors.push('Category is required; ');

        if (errors.length >= 1) throw { message: [errors] };

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
        res.status(404).json({ error: err.message })
    }
});

router.patch('/edit/:id', isAuth, async (req, res) => {
    //TODO: Rewrite this 
    let { title, price, description, city, category, image } = req.body;
    try {
        let user = await productService.findUserById(req.user._id);
        let product = await productService.findById(req.params.id);
        let errors = [];
        if (user._id.toString() !== product.seller.toString()) {
            errors.push('You have no permission to perform this action! ')
        }

        if (title.length < 3 || title.length > 50) errors.push('Title should be at least 3 characters long and max 50 characters long; ');
        if (isNaN(Number(price))) errors.push('Price should be a number; ');
        if (description.length < 10 || description.length > 1000) errors.push('Description should be at least 10 characters long and max 1000 characters long; ');
        if (/^[A-Za-z]+$/.test(city) == false) errors.push('City should contains only english letters; ')
        if (req.body.image) {
            if (!req.body.image.includes('image')) errors.push('The uploaded file should be an image; ');
        }
        if (!category || category == "Choose...") errors.push('Category is required; ');

        if (errors.length >= 1) throw { message: [errors] };

        if (req.body.image) {
            let compressedImg = await productService.uploadImage(req.body.image);
            await productService.edit(req.params.id, { title, price, description, city, category, image: compressedImg });
        } else {
            await productService.edit(req.params.id, { title, price, description, city, category });
        }
        res.status(201).json({ message: 'Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

router.get('/sells/:id', async (req, res) => {
    try {
        let user = await (await User.findById(req.user._id).populate('createdSells')).toJSON();
        res.status(200).json({ sells: user.createdSells, user });
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
            await Product.updateOne({ _id: req.params.id }, { $push: { likes: user } });

            res.status(200).json({ msg: "wished" });
        } else {
            await User.updateOne({ _id: req.user._id }, { $pull: { wishedProducts: req.params.id } })
            await Product.updateOne({ _id: req.params.id }, { $pull: { likes: req.user._id } });

            res.status(200).json({ msg: "unwished" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/wishlist/:id', async (req, res) => {
    console.log(req.user._id)
    try {
        let user = await (await User.findById(req.user._id).populate('wishedProducts')).toJSON();
        console.log(user)
        res.status(200).json({ wishlist: user.wishedProducts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


module.exports = router;