const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    date: {
        type: String,
    },

    cart: {
        type: Array,
        default: []
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    score: {
        type: Number,
        default: 0
    },

    history: {
        type: Array,
        default: []
    }
})

const User = mongoose.model('Users', userSchema, 'Users')
module.exports = User