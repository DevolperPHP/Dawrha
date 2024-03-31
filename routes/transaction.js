const express = require('express');
const router = express.Router();
const isLogginMiddleware = require('../middlewares/isUser');
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

router.use(isLogginMiddleware)

router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id })
        const user = req.user

        if(product.price > user.score){
            req.flash('buy-err', 'error')
            res.redirect('/')
        } else {
            await User.updateOne({ _id: user.id }, {
                $set: {
                    score: user.score - product.price
                },
    
                $push: {
                    history: {
                        name: product.name,
                        price: product.price,
                        Date: moment().locale("ar-kw").format("l"),
                        id: product.id,
                    }
                }
            })
            req.flash('buy-suc', 'success')
            res.redirect('/')
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router