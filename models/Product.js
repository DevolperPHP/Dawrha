const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
    },

    brand: {
        type: String,
    },

    proText: {
        type: String
    },

    price: {
        type: Number
    },

    des: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now()
    },
    
    category: {
        type: String
    },

    image: {
        type: String,
        default: "none.png",
    }
})

const Product = mongoose.model('Products', productSchema, 'Products')
module.exports = Product