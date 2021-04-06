const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

const productService = require('../services/productService');

router.get('/', async (req, res) => {
    const { page, search } = req.query;
    try {
        let products;
        if (search !== '' && search !== undefined) {
            products = await Product.find();
            products = products.filter(x => x.active == true)
            products = products.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.city.toLowerCase().includes(search.toLowerCase()))
            res.status(200).json({ products: products, pages: products.pages });
        } else {
            products = await Product.paginate({}, { page: parseInt(page) || 1, limit: 5 });
            products.docs = products.docs.filter(x => x.active == true)
            res.status(200).json({ products: products.docs, pages: products.pages });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:category', async (req, res) => {
    const { page } = req.query;
    try {
        let products = await Product.paginate({ category: req.params.category }, { page: parseInt(page) || 1, limit: 10 });
        res.status(200).json({ products: products.docs, pages: products.pages });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/specific/:id', async (req, res) => {
    try {
        let product = await (await Product.findById(req.params.id)).toJSON()
        let seller = await (await User.findById(product.seller)).toJSON()
        product.addedAt = moment(product.addedAt).format('d MMM YYYY (dddd) HH:mm')
        let jsonRes = {
            ...product,
            name: seller.name,
            phoneNumber: seller.phoneNumber,
            email: seller.email,
            createdSells: seller.createdSells.length,
            avatar: seller.avatar,
            sellerId: seller._id,
            isAuth: false
        }
        if (req.user) {
            let user = await User.findById(req.user._id)
            jsonRes.isSeller = Boolean(req.user._id == product.seller);
            jsonRes.isWished = user.wishedProducts.includes(req.params.id)
            jsonRes.isAuth = true
        }
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/create', async (req, res) => {
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

router.get('/sells/active/:id', async (req, res) => {
    try {
        let userId = '';
        if (req.params.id) {
            userId = req.params.id
        } else {
            userId = req.user_id
        }
        let user = await (await User.findById(userId).populate('createdSells')).toJSON();
        res.status(200).json({ sells: user.createdSells.filter(x => x.active), user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/sells/archived', async (req, res) => {
    try {
        let user = await (await User.findById(req.user._id).populate('createdSells')).toJSON();
        res.status(200).json({ sells: user.createdSells.filter(x => x.active == false), user });
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
    try {
        let user = await (await User.findById(req.user._id).populate('wishedProducts')).toJSON();

        res.status(200).json({ wishlist: user.wishedProducts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


module.exports = router;