const User = require('../models/User')
const isLogginMiddleWare = async (req, res, next) => {
    try {
        const id = req.cookies.id
        const user = await User.findOne({ _id: id })
        if (user) {
            req.user = user;
        }
        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = isLogginMiddleWare