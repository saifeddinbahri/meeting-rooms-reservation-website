
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')

const app = express()
dotenv.config()

const port = process.env.PORT

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.json())

//connect to databse
connectDB()

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

