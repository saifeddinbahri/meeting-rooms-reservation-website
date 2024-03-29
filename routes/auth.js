const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/sign-in', userController.authenticate)
router.post('/sign-up', userController.inscription)



module.exports = router