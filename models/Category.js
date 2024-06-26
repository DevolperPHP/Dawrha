const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const Category = mongoose.model('Category', categorySchema, 'Category')
module.exports = Category