
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const cookieParser = require('cookie-parser')
const viewController = require('./controller/viewController')
const adminViewController = require('./controller/adminViewController')
const roomController = require('./controller/roomController')
const app = express()
dotenv.config()

const port = process.env.PORT

app.use(express.static('public'));
app.use('/room-image', express.static('uploads'));
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())

//connect to databse
connectDB()



// importing routes
const loginRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')

// using Routes
app.use('/auth', loginRouter)
app.use('/admin',adminRouter)

// views
app.get('/', viewController.login)
app.get('/rooms', viewController.rooms)
app.get('/sign-up', viewController.inscription)
app.get('/book', viewController.book)
app.get('/my-reservations', viewController.reservations)
app.get('/calendar', viewController.calendar)

// Admin views
app.get('/add-room',adminViewController.addRoom)
app.get('/consult-rooms', roomController.consult, adminViewController.consultRoom)




app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})

