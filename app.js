const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const flash = require('express-flash');
const db = require('./config/database')
const passport = require('./routes/passport')
const home = require('./routes/home')
const category = require('./routes/category')
const getUserInfoMiddleware = require('./middlewares/getUserInfo')
const products = require('./routes/products')
const score = require('./routes/score')
const transaction = require('./routes/transaction')
const history = require('./routes/history')

let port = 3000

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

app.use(getUserInfoMiddleware)
app.use('/passport', passport)
app.use('/', home)
app.use('/admin', category)
app.use('/admin', products)
app.use('/score', score)
app.use('/buy', transaction)
app.use('/history', history)


app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running on port ${port}`)
})