const {addBlanner, getBlanners, delBlanner} = require('../controllers/Blanner');
const express = require('express')
const router = express.Router();
const {auth} = require('../middleware/auth')


router.post('/add-blanner', auth ,addBlanner)
router.get('/get-blanner', getBlanners)
router.delete('/del-blanner/:cloudinary_id', auth, delBlanner)


module.exports = router;