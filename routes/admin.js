const express = require('express')
const router = express.Router()
const multer  = require('multer')
const crypto = require('crypto');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) return cb(err)
    
          cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
      }
  });

const upload = multer({ storage: storage })
const roomController = require('../controller/roomController')

router.post('/add-room', upload.single('image'), roomController.addRoom)
router.put('/update-room/:id', upload.single('image'), roomController.updateRoom)
router.delete('/delete-room/:id', roomController.deleteRoom)

module.exports = router