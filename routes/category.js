const express = require('express')
const router = express.Router()
const isAdminMiddleware = require('../middlewares/isAdmin')
const Category = require('../models/Category')

router.use(isAdminMiddleware)

router.get('/category', async (req, res) => {
    try {
        const category = await Category.find({}).sort({ Date: -1 })
        res.render('admin/category/category',{
            category: category,
            err: req.flash('error'),
            suc: req.flash('success'),
            edit_suc: req.flash('edit-suc'),
            edit_err: req.flash('edit-err'),
        })
    } catch (err) {
        console.log(err);
    }
})

router.post('/category/add', async (req, res) => {
    try {
        const name = req.body.name
        const filter = await Category.findOne({ name: name })

        if(filter){
            req.flash('error', 'category')
        } else {
            const newCategory = new Category({
                name: name
            })
    
            newCategory.save()
        }
        res.redirect('/admin/category')
    } catch (err) {
        console.log(err);
    }
})

router.get('/category/delete/:id', async (req, res) => {
    try {
        const category = await Category.find({}).sort({ Date: -1 })
        const data = await Category.findOne({ _id: req.params.id })
        res.render('admin/category/delete',{
            category: category,
            data: data,
        })
    } catch (err) {
        console.log(err);
    }
})

router.delete('/category/delete/:id', async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id })
        req.flash('success', 'delete')
        res.redirect('/admin/category')
    } catch (err) {
        console.log(err);
    }
})

router.get('/category/edit/:id', async (req, res) => {
    try {
        const category = await Category.find({}).sort({ Date: -1 })
        const data = await Category.findOne({ _id: req.params.id })
        res.render('admin/category/edit',{
            category: category,
            data: data,
        })
    } catch (err) {
        console.log(err);
    }
})

router.put('/category/edit/:id', async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id })
        const filter = await Category.findOne({ name: req.body.name })

        if (filter){
            req.flash('edit-err', 'error')
            res.redirect('/admin/category')
        } else {
            await Category.updateOne({ _id: req.params.id}, {
                $set: {
                    name: req.body.name
                }
            })
            req.flash('edit-suc', 'success')
            res.redirect('/admin/category')
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router