const express = require('express')
const router = express.Router()
const isAdminMiddleware = require('../middlewares/isAdmin')
const Product = require('../models/Product')
const multer = require('multer');
const fs = require('fs');
const Category = require('../models/Category');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/upload/images");
    },

    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1000 * 1000,
    },
});

router.use(isAdminMiddleware)

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ Date: -1 })
        const category = await Category.find({}).sort({ Date: -1 })
        res.render('admin/products/products', {
            data: products,
            category: category,
            del_suc: req.flash("del-suc"),
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/products/add', upload.single('image'), async (req, res) => {
    try {
        const { name, price, proText, category, des } = req.body
        const filter = await Product.findOne({ name: name })

        if (filter) {
            res.send("AAAAA")
        } else {
            const newProduct = new Product({
                name: name,
                price: price,
                proText: proText,
                des: des,
                category: category,
                image: req.file.filename
            })

            newProduct.save()
            res.redirect("/admin/products")
        }
    } catch (err) {
        console.log(err);
    }
})

router.delete('/product/delete/:id', async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id})
        fs.unlinkSync(`./public/upload/images/${data.image}`)
        await Product.deleteOne({ _id: req.params.id })
        req.flash("del-suc", "success")
        res.redirect('/admin/products')
    } catch (err) {
        console.log(err);
    }
})
module.exports = router