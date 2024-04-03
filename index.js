
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

// middleware
const authMiddleware = require('./middleware/auth')

// importing routes
const loginRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

// using Routes
app.use('/auth', loginRouter)
app.use('/admin',adminRouter)
app.use('/user', authMiddleware, userRouter)

// views
app.get('/', viewController.login)
app.get('/rooms', authMiddleware, roomController.consult, viewController.rooms)
app.get('/sign-up', viewController.inscription)
app.get('/book/:id', authMiddleware, viewController.book)
app.get('/my-reservations', authMiddleware, roomController.findReservations, viewController.reservations)
app.get('/calendar/:id', authMiddleware, viewController.calendar)

// Admin views
app.get('/add-room',adminViewController.addRoom)
app.get('/consult-rooms', roomController.consult, adminViewController.consultRoom)
app.get('/modify-room/:id', roomController.findRoom, adminViewController.modifyRoom)




app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})

