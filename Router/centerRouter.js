const router =  require('express').Router();
const centerController = require('../controller/centerController')
const auth = require('../middleware/auth')
const multer = require('multer')
var storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
const upload = multer({storage:storage})

router.post('/addCenter',centerController.addCenter)
router.post('/viewCenter',centerController.viewCenter)
router.post('/slotBooking',centerController.slotBooking)
router.post('/slotBooking',centerController.slotBooking)
router.post('/slotBooking',centerController.slotBooking)
router.post('/slotBooking',centerController.slotBooking)
router.post('/slotBooking',centerController.slotBooking)
router.post('/slotBooking',centerController.slotBooking)
router.post('/slotBooking',centerController.slotBooking)


module.exports =router