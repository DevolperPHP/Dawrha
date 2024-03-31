const express = require('express');
const router = express.Router();
const isAdminMiddleWare = require('../middlewares/isAdmin')
const isLogginMiddleware = require('../middlewares/isUser')
const Category = require('../models/Category')
const Product = require('../models/Product')

router.get('/', async (req, res) => {
    try {
        const category = await Category.find({})
        const products = await Product.find({})
        res.render("user/home", {
            user: req.user,
            category: category,
            products: products,
            suc: req.flash('buy-suc'),
            err: req.flash('buy-err')
        })
    } catch (err) {
        console.log(err);
    }
})

router.get('/product/buy/:id', isLogginMiddleware, async (req, res) => {
    try {
        const category = await Category.find({})
        const products = await Product.find({})
        const product = await Product.findOne({ _id: req.params.id })
        res.render('user/buy-product', {
            user: req.user,
            category: category,
            products: products,
            product: product,
        })
    } catch (err) {
        console.log(err);
    }
})



module.exports = router