const express = require('express');
const router = express.Router();
const isLogginMiddleware = require('../middlewares/isUser');
const Product = require('../models/Product');

router.use(isLogginMiddleware)

router.get('/', async (req, res,) => {
    try {
        const user = req.user
        const products = user.history
        const productsIds = products.map(product => product.id)
        const dates = products.map(product => product.Date)
        const data = await Product.find({_id: {$in: productsIds}})
        res.render('user/history', {
            user: req.user,
            data: data,
            dates: dates,
        })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router