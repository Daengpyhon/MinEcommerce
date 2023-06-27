const express = require("express");
const router = express.Router();
const {auth, adminCheck} = require('../middleware/auth')
const {
 
  login,
  register,
  currentUser,
  
} = require("../controllers/auth");


router.post("/register", register);

router.post("/login", login)

router.post("/current-user", auth,currentUser)

router.post("/current-admin", auth, adminCheck , currentUser);

module.exports = router;


