const express = require('express');
const router = express.Router();
const {updateOrderStatus, deleteOrderStatus} = require("../controllers/adminChangeStatus");
const {auth, adminCheck} = require ("../middleware/auth")

router.put('/update-order-status', auth, updateOrderStatus)
router.delete('/delete-order-status/:id', auth,deleteOrderStatus)

module.exports = router 