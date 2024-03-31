const express = require('express')
const router = express.Router()
const User = require('../models/User')
const isLogginMiddleWare = require('../middlewares/isUser')

router.get('/gain/82946269', isLogginMiddleWare, async (req, res) => {
    try {
        const user = req.user
        await User.updateOne({ _id: user.id }, {
            $set: {
                score: user.score + 5
            }
        })
        res.redirect('/score/added')
    } catch (err) {
        console.log(err);
    }
})

router.get('/added', isLogginMiddleWare, async (req, res) => {
    try {
        res.render('score/page', {
            user: req.user
        })
    } catch (err) {
        console.log(err);
    }
})
module.exports = router