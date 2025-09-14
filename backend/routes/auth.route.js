const express = require("express")
const {userRegister,loginUser} = require('../controller/authController')
const router = express.Router();


router.post('/register',userRegister)
router.post('/login',loginUser)

module.exports = router;