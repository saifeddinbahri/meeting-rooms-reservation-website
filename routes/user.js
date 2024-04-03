
const express = require('express')
const router = express.Router()
const roomController = require('../controller/roomController')
const roomSchema = require('../models/Room')

router.post('/book-room/:id', roomController.findRoom, async (req, res) => {
    const { id } = req.params 
    const uid = req.uid
    const { fullname, phone, date, startTime, endTime } = req.body
    try{
      await roomSchema.findByIdAndUpdate(id, { $push: { reservedBy: { 
          user: uid,
          fullname, 
          phone, 
          date: new Date(date).toISOString().slice(0, 10),
          start: parseInt(startTime),
          end: parseInt (endTime)
      } } }, 
      { new: true })
      res.json({redirectTo:'/my-reservations'})
    } catch(e) {
        res.send('failed to add reservation')
    }
})

module.exports = router