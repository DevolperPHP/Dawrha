const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/dawrha'

mongoose.set('strictQuery', false)
mongoose.connect(URI, (err) => {
    if(err) throw err
    console.log("Database connected")
})