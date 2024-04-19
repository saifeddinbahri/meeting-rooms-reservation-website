
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
const checkRole = require('./middleware/role')

// importing routes
const loginRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

// using Routes
app.use('/auth', loginRouter)
app.use('/admin', authMiddleware, adminRouter)
app.use('/user', authMiddleware, userRouter)

//manage reservation route
app.post('/delete-reservation', authMiddleware, roomController.deleteReservation)
app.post('/update-reservation/:room-:reservation', authMiddleware, roomController.updateReservation)
app.post('/update-admin-reservation/:room-:reservation', authMiddleware, roomController.adminUpdateReservation)
app.post('/admin-delete-reservation', authMiddleware, roomController.adminDeleteReservation)
// views
app.get('/', viewController.login)
app.get('/rooms', authMiddleware, roomController.consult, viewController.rooms)
app.get('/sign-up', viewController.inscription)
app.get('/book/:id', authMiddleware, viewController.book)
app.get('/my-reservations', authMiddleware, roomController.findReservations, viewController.reservations)
app.get('/calendar/:id', authMiddleware, roomController.findRoom, viewController.calendar)
app.get('/modify-reservation/:room-:reservation', authMiddleware, roomController.findReservation, viewController.modifyReservation)

// Admin views
app.get('/add-room', authMiddleware, checkRole, adminViewController.addRoom)
app.get('/consult-rooms', authMiddleware, checkRole, roomController.consult, adminViewController.consultRoom)
app.get('/modify-room/:id', authMiddleware, checkRole, roomController.findRoom, adminViewController.modifyRoom)
app.get('/all-reservations/:roomId', authMiddleware, checkRole, roomController.findAllReservations, adminViewController.reservations)
app.get('/admin-update-reservation/:room-:reservation', authMiddleware, checkRole, roomController.findReservation, adminViewController.modifyReservation)



app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})

