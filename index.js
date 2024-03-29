
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
const cookieParser = require('cookie-parser')
const viewController = require('./controller/viewController')

const app = express()
dotenv.config()

const port = process.env.PORT

// exemples
let meetingRooms = [
    { id: 1, name: 'Room 1', capacity: 10 },
    { id: 2, name: 'Room 2', capacity: 8 }
];

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())




// Create a Meeting Room (POST)
app.post('/meeting-rooms', (req, res) => {
    const { name, capacity } = req.body;

    if (!name || !capacity) {
        return res.status(400).json({ error: 'Name and capacity are required' });
    }

    const id = meetingRooms.length + 1;
    const newRoom = { id, name, capacity };
    meetingRooms.push(newRoom);

    res.status(201).json(newRoom);
});

// Read All Meeting Rooms (GET)
app.get('/meeting-rooms', (req, res) => {
    res.json(meetingRooms);
});

// Read a Single Meeting Room by ID (GET)
app.get('/meeting-rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const room = meetingRooms.find(room => room.id === id);

    if (!room) {
        return res.status(404).json({ error: 'Meeting room not found' });
    }

    res.json(room);
});

// Update a Meeting Room (PUT)
app.put('/meeting-rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, capacity } = req.body;

    const room = meetingRooms.find(room => room.id === id);

    if (!room) {
        return res.status(404).json({ error: 'Meeting room not found' });
    }

    room.name = name || room.name;
    room.capacity = capacity || room.capacity;

    res.json(room);
});

// Delete a Meeting Room (DELETE)
app.delete('/meeting-rooms/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const initialLength = meetingRooms.length;
    meetingRooms = meetingRooms.filter(room => room.id !== id);

    if (initialLength === meetingRooms.length) {
        return res.status(404).json({ error: 'Meeting room not found' });
    }

    res.status(204).end();
});

//connect to database
connectDB()



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

