const express = require('express');

const router = express.Router();
const {listUsers, readUsers, updateUsers, removeUsers, changeStatus, changeRole, userCart, getUserCart, addToLike, getLike, removeLike, changeProfile, getProfile, userProfile} = require("../controllers/user")

// MIDDLEWARE
const {auth, adminCheck} = require('../middleware/auth')

router.get('/users',auth, adminCheck, listUsers)

router.get('/users/:id', readUsers)

router.put('/users/:id', updateUsers)

router.delete('/users/:id', removeUsers)

router.post('/change-status', auth, adminCheck,changeStatus)
router.post('/change-role', auth, adminCheck,changeRole)

// User order product cart
router.post('/user/cart', auth, userCart)
router.get('/user/cart', auth, getUserCart)

// Change Profile

router.put('/change-profile', auth, changeProfile);
router.get('/profile-data', auth, getProfile);
router.get('/user-profile', auth, userProfile);

// user like product 
router.post("/user/like", auth, addToLike)
router.get("/user/like", auth, getLike) 
router.put("/user/like/:productId", auth, removeLike)

module.exports = router;