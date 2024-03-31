const User = require('../models/User')
const isLogginMiddleWare = async (req, res, next) => {
    try {
        const id = req.cookies.id
        const user = await User.findOne({ _id: id })
        if (user) {
            next();
        } else {
            res.redirect("/passport/sign-in")
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = isLogginMiddleWare