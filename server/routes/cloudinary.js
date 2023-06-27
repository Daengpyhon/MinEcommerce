const express = require('express');
const router = express.Router();

// Controllers
const {createImages, removeImages, paymentImages, changeProfile} = require('../controllers/cloudinary');

const {auth, adminCheck} = require("../middleware/auth");

router.post("/images", auth, adminCheck,createImages)
router.post("/removeimages", auth, adminCheck, removeImages)

// Change Profile
router.post("/profile", auth,changeProfile);

// Payments checkout images
router.post("/payment-images", paymentImages)
router.post("/payment-images-remove", removeImages)

module.exports = router