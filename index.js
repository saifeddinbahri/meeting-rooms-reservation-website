
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const cookieParser = require('cookie-parser')

const app = express()
dotenv.config()

const port = process.env.PORT

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())

//connect to databse
connectDB()

// middleware
const authGuard = require('./middleware/auth')
app.use(authGuard)

// importing routes
const loginRouter = require('./routes/signIn')
const homeRouter = require('./routes/home')

// using Routes
app.use('/auth', loginRouter)
app.use('/',homeRouter)

app.get('/', (req, res) => {
    res.render('login')
})

app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})

