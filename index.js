
const express = require('express')
const loginRouter = require('./routes/signIn')
const app = express()
const port = 5500

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.json())

// using Routes
app.use('/auth', loginRouter)

app.get('/', (req, res) => {
    res.render('login')
})

app.listen(port, () => {
    console.log(`Listenning on port ${port}`)
})

