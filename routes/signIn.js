const express = require('express')
const router = express.Router()

router.post('/sign-in', (req, res) => {
    console.log(req.body)
    if(req.body.password === 'saif')
    {
       return res.redirect('/auth/home')
    }else
    {
       return res.status(401).send('Unauthorized')
    }
})

router.get('/home', (req, res) => {
    console.log("hello")
    res.send('welcome home')
})


module.exports = router