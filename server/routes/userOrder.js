const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth')
const {saveUserOrderProduct, emptyCart, checkoutReview, getUserOrder, customerOrders} = require('../controllers/userOrder');

// Save user order product details
router.post("/save-order-product", auth ,saveUserOrderProduct)
router.delete("/empty-cart", auth ,emptyCart)
router.get("/checkout-review", auth , checkoutReview)

// User order

router.get("/user-orders", auth, getUserOrder)
router.get("/customer-orders", auth, customerOrders)

module.exports = router;