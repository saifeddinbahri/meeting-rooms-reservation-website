const express = require('express')
const router = express.Router()

router.post('/sign-in', (req, res) => {
    console.log(req.body)
    if(req.body.password === 'saif')
    {
       return res.render('home')
    }else
    {
       return res.status(401).send('Unauthorized')
    }
})



module.exports = router