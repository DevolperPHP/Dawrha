const User = require('../models/User')
const isAdminMiddleWare = async (req, res, next) => {
    try {
        const id = req.cookies.id
        const user = await User.findOne({ _id: id })
        if(user){
            if (user.isAdmin == true) {
                next();
            } else {
                res.redirect("/")
            }
        } else {
            res.redirect('/passport/sign-in')
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = isAdminMiddleWare