const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/sign-in', userController.authenticate)
router.post('/sign-up', userController.inscription)
router.post('/logout', userController.logout)


module.exports = router