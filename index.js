
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const cookieParser = require('cookie-parser')
const viewController = require('./controller/viewController')

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
const loginRouter = require('./routes/auth')


// using Routes
app.use('/auth', loginRouter)



// views
app.get('/', viewController.login)
app.get('/home', viewController.home)
app.get('/sign-up', viewController.inscription)

app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})

