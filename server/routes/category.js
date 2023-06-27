const express = require('express');
const router = express.Router();

// CONTROLLERS

const { createCategory, allCategory ,readCategoryById, updateCategory,  removeCategory} = require('../controllers/category');

// MIDDLEWARE

const {auth, adminCheck} = require('../middleware/auth');

router.post('/category', auth, adminCheck ,createCategory);
router.get('/category', allCategory);
router.get('/category/:id',auth, adminCheck , readCategoryById);
router.put('/category/:id',auth, adminCheck , updateCategory);
router.delete('/category/:id',auth, adminCheck , removeCategory);


module.exports = router;